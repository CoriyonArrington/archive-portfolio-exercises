// app/supabase-test/toast-demo-client.tsx - Corrected import path
"use client";

import { Button } from "@/components/ui/button";
// FIX: Import from the hooks directory now
import { useToast } from "@/hooks/use-toast";

export function ToastDemoClient() {
  const { toast } = useToast(); // This should now be found

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: "Scheduled: Catch up",
            description: "Friday, February 10, 2023 at 5:57 PM",
          });
        }}
      >
        Show Default Toast
      </Button>
      <Button
        variant="outline"
        className="text-green-600 border-green-600 hover:bg-green-100 hover:text-green-700"
        onClick={() => {
          toast({
            title: "Success!",
            description: "Your profile was updated successfully.",
          });
        }}
      >
        Show Success Toast
      </Button>
      <Button
        variant="destructive"
        onClick={() => {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          });
        }}
      >
        Show Error Toast
      </Button>
    </div>
  );
}