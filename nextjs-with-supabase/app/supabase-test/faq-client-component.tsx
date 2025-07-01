// app/supabase-test/faq-client-component.tsx
"use client"; // Directive MUST be at the very top

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Shadcn UI Component Imports
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast"; // Corrected import path for the hook

// Define the FAQ type again (or import from types/supabase.ts)
interface Faq {
  id: string;
  question: string | null;
  answer: string | null;
  created_at: string | null;
  updated_at: string | null;
}

// --- Zod Schema for the Example Form ---
const faqFormSchema = z.object({
  question: z.string().min(5, { message: "Question must be at least 5 characters." }),
  answer: z.string().min(10, { message: "Answer must be at least 10 characters." }),
});

// --- Client Component Definition ---
// Renamed slightly to indicate it's the client part
export function FaqDisplayAndInteractionClient({ initialData, error }: { initialData: Faq[] | null, error?: string }) {

  // --- State Management ---
  const [selectedFaq, setSelectedFaq] = useState<Faq | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // --- Hooks ---
  const { toast } = useToast();
  const form = useForm<z.infer<typeof faqFormSchema>>({
    resolver: zodResolver(faqFormSchema),
    defaultValues: { question: "", answer: "" },
  });

  // --- Event Handlers ---
  function onSubmit(values: z.infer<typeof faqFormSchema>) {
    console.log("Form Submitted:", values);
    // TODO: Implement actual submission logic (Server Action recommended)
    toast({
      title: "✅ FAQ Submitted (Example)",
      description: `Question: ${values.question}`,
    });
    form.reset();
  }

  const handleOpenDialog = (faq: Faq) => {
    setSelectedFaq(faq);
    setIsDialogOpen(true);
  };

  const showSimpleToast = () => {
     toast({
      title: "Hello!",
      description: "This is a simple toast example.",
      duration: 3000,
    });
  }

  // --- JSX Rendering ---
  return (
    <>
      {/* --- Display Error if Data Fetching Failed --- */}
      {error && (
         <div className="my-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
           <strong className="font-bold">Error Fetching Data:</strong>
           <span className="block sm:inline"> {error}</span>
         </div>
       )}

      {/* --- Example 1: Displaying Data using CARD --- */}
      <h2 className="text-xl font-semibold mt-6 mb-3">Fetched FAQs (Using Card Component)</h2>
      {initialData && initialData.length > 0 ? (
        <div className="space-y-4">
          {initialData.map((faq) => (
            <Card key={`${faq.id}-card`}>
              <CardHeader>
                <CardTitle>{faq.question || "No Question Provided"}</CardTitle>
                <CardDescription>ID: {faq.id}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{faq.answer || "No Answer Provided"}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" onClick={() => handleOpenDialog(faq)}>
                  View in Dialog
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        !error && <p className="text-gray-500">No FAQs found or table is empty.</p>
      )}

       {/* --- Example 2: Displaying Data using TABLE --- */}
       <h2 className="text-xl font-semibold mt-8 mb-3">Fetched FAQs (Using Table Component)</h2>
       {initialData && initialData.length > 0 ? (
        <Table>
          <TableCaption>A list of the first {initialData.length} FAQs.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Question</TableHead>
              <TableHead>Answer</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialData.map((faq) => (
              <TableRow key={`${faq.id}-row`}>
                <TableCell className="font-medium">{faq.question || "N/A"}</TableCell>
                <TableCell>{faq.answer || "N/A"}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(faq)}>
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
       ) : (
         !error && <p className="text-gray-500">No FAQs found for table display.</p>
       )}


      {/* --- Example 3: DIALOG Component --- */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>FAQ Details</DialogTitle>
            <DialogDescription>
              Showing details for the selected FAQ.
            </DialogDescription>
          </DialogHeader>
          {selectedFaq ? (
            <div className="py-4 space-y-2 text-sm">
              <p><strong>ID:</strong> {selectedFaq.id}</p>
              <p><strong>Question:</strong> {selectedFaq.question}</p>
              <p><strong>Answer:</strong> {selectedFaq.answer}</p>
              <p><strong>Created:</strong> {selectedFaq.created_at ? new Date(selectedFaq.created_at).toLocaleString() : 'N/A'}</p>
              <p><strong>Updated:</strong> {selectedFaq.updated_at ? new Date(selectedFaq.updated_at).toLocaleString() : 'N/A'}</p>
            </div>
          ) : (
            <p>No FAQ data available.</p>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- Example 4: FORM Component --- */}
      <h2 className="text-xl font-semibold mt-8 mb-3">Add New FAQ (Using Form, Input, Textarea, Label, Button)</h2>
      <Card>
        <CardHeader>
          <CardTitle>New FAQ Form</CardTitle>
           <CardDescription>Using Shadcn Form components with react-hook-form and Zod.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the question..." {...field} />
                    </FormControl>
                    <FormDescription>
                      The question for the new FAQ entry.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Answer</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter the answer..." {...field} />
                    </FormControl>
                    <FormDescription>
                      The answer to the FAQ question.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit New FAQ</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* --- Example 5: TOAST Component Trigger --- */}
      <h2 className="text-xl font-semibold mt-8 mb-3">Toast Example</h2>
      <Card>
        <CardContent className="pt-6">
           <Button variant="outline" onClick={showSimpleToast}>
              Show Toast
           </Button>
        </CardContent>
      </Card>
    </>
  );
}