'use server';

import { supabase } from '@/lib/utils/supabaseClient';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function submitContactForm(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;
  const honeypot = formData.get('honeypot') as string;

  if (honeypot) {
    redirect('/contact?error=spam');
  }

  const { error } = await supabase
    .from('contact_submissions')
    .insert([{ name, email, message, honeypot: null }]);

  if (error) {
    redirect('/contact?error=submission');
  }

  revalidatePath('/contact');
  redirect('/contact?success=true');
}
