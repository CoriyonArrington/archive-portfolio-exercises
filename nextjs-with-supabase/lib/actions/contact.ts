// lib/actions/contact.ts
"use server";

import { z } from "zod";
// Import the Supabase JS client specifically for creating the service role client
import { createClient as createServiceClient } from '@supabase/supabase-js';
// Assuming schema is still in lib/schemas/contact.ts
import { contactFormSchema, type ContactActionResult } from "@/lib/schemas/contact";
// We don't need the standard server client for this specific action if only using service role
// import { createClient } from '@/utils/supabase/server';

export async function submitContactForm(formData: FormData): Promise<ContactActionResult | null> {
    console.log("Server Action: submitContactForm received FormData");

    // 1. Extract data from FormData
    const rawFormData = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        honeypot: formData.get('honeypot'), // Will be string or null
    };
    console.log("Server Action: Raw form data:", rawFormData);

    // 2. Validate honeypot server-side (extra check)
    if (rawFormData.honeypot) {
        console.log("Server Action: Honeypot filled, returning success early.");
        // Still return "success" to not alert the bot
        return { status: 'success', message: 'Your message has been received.' };
    }

    // 3. Validate data with Zod - *** Make sure this is present ***
    const validatedFields = contactFormSchema.safeParse({
        name: rawFormData.name,
        email: rawFormData.email,
        message: rawFormData.message,
        honeypot: rawFormData.honeypot === '' ? undefined : rawFormData.honeypot,
    });

    // Check for validation success AFTER parsing
    if (!validatedFields.success) {
        console.error("Server Action: Validation failed", validatedFields.error.flatten().fieldErrors);
        return {
            status: 'error',
            message: "Validation failed. Please check the form.",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    // --- SERVICE ROLE CLIENT WORKAROUND ---
    // REASON: Persistent RLS errors (42501) with standard client for 'anon' role,
    // even on newly created tables with correct grants/policies. Issue escalated
    // to Supabase Support. Using Service Role Key bypasses RLS for functionality.
    try {
        console.log("Server Action: Attempting insert using SERVICE ROLE client...");

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        // Ensure environment variables are set server-side
        if (!supabaseUrl || !supabaseServiceRoleKey) {
            console.error("Server Action: Missing Supabase URL or Service Role Key in server environment.");
            return { status: 'error', message: 'Server configuration error.' };
        }

        // Create the service role client *inside* the action
        const supabaseAdmin = createServiceClient(supabaseUrl, supabaseServiceRoleKey);

        // Insert into the designated table (using 'public_messages' as example)
        const { data, error } = await supabaseAdmin
            .from('public_messages') // <<< Ensure this is the table you want data in
            .insert([
                {
                    // Use the validated data
                    name: validatedFields.data.name,
                    email: validatedFields.data.email,
                    message: validatedFields.data.message,
                    // Ensure columns exist in 'public_messages' table
                },
            ])
            .select() // Optional: Select to confirm insert
            .single(); // Assuming you expect one row back

        if (error) {
            // Errors here are less likely to be RLS, but could be other DB issues
            console.error("Server Action: Supabase service role insert error:", error);
            return { status: 'error', message: `Database error: ${error.message}` };
        }

        console.log("Server Action: Insert successful (SERVICE ROLE):", data);
        return { status: 'success', message: 'Your message has been sent successfully!' };

    } catch (error: any) {
        console.error("Server Action: Unexpected error during service role insert:", error);
        return { status: 'error', message: `An unexpected server error occurred: ${error.message || 'Unknown error'}` };
    }
    // --- END SERVICE ROLE CLIENT WORKAROUND ---
}