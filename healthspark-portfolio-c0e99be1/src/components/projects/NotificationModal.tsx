
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface NotificationModalProps {
  open: boolean;
  projectId: string;
  projectTitle: string;
  onOpenChange: (open: boolean) => void;
}

/**
 * NotificationModal - Modal for users to sign up for project notifications
 * 
 * Allows users to enter their name and email to be notified when a project is launched.
 * 
 * Accessibility features:
 * - Keyboard accessible dialog
 * - Focus management
 * - ARIA attributes
 * - Clear error messaging
 */
const NotificationModal = ({ open, onOpenChange, projectId, projectTitle }: NotificationModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{name?: string; email?: string}>({});

  const validate = () => {
    const newErrors: {name?: string; email?: string} = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      // Insert notification subscription into Supabase
      const { error } = await supabase
        .from('project_notifications')
        .insert([
          { 
            project_id: projectId,
            name,
            email,
            subscribed_at: new Date().toISOString()
          }
        ]);
        
      if (error) throw error;
      
      toast({
        title: "Thanks for your interest!",
        description: `We'll notify you when ${projectTitle} launches.`,
      });
      
      // Reset form
      setName('');
      setEmail('');
      onOpenChange(false);
      
    } catch (error) {
      console.error('Error submitting notification request:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Get notified when this launches</DialogTitle>
          <DialogDescription>
            Enter your details below to be notified when {projectTitle} is available.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              aria-describedby={errors.name ? "name-error" : undefined}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p id="name-error" className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              aria-describedby={errors.email ? "email-error" : undefined}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          
          <DialogFooter className="mt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Notify me"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationModal;
