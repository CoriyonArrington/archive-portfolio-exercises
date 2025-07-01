// app/(playground)/interactive-quiz/components/quiz-shell.tsx
"use client";

import { useState, useEffect, useCallback, useTransition } from "react"; // Changed to useTransition
import type { QuizClient } from "@/types/quiz";
import InteractiveQuizClientView from "./quiz-client-view";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { fetchQuizAction } from "@/lib/actions/quiz";

interface QuizMeta {
  id: string;
  title: string;
}

interface QuizShellProps {
  quizzesMeta: QuizMeta[];
  initialQuizData: QuizClient; // This is the fully loaded data for the first quiz
}

export default function QuizShell({ quizzesMeta, initialQuizData }: QuizShellProps) {
  // Initialize state with the initialQuizData directly
  const [selectedQuizId, setSelectedQuizId] = useState<string>(initialQuizData.id);
  const [currentQuizData, setCurrentQuizData] = useState<QuizClient | null>(initialQuizData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition(); // For smoother UI updates

  // This effect synchronizes the component if the initialQuizData prop itself changes fundamentally.
  // This is more of a safeguard if the parent page were to send a *different* initial quiz.
  useEffect(() => {
    setSelectedQuizId(initialQuizData.id);
    setCurrentQuizData(initialQuizData);
    setError(null); // Clear any previous errors when initial data changes
  }, [initialQuizData]); // Only depend on initialQuizData reference

  const handleQuizSelection = useCallback(async (quizId: string) => {
    // If already selected and data is loaded, or if currently loading this quiz, do nothing.
    if ((quizId === selectedQuizId && currentQuizData?.id === quizId && !isLoading) || (isLoading && selectedQuizId === quizId)) {
        return;
    }

    setSelectedQuizId(quizId); // Optimistically set the selected tab
    setIsLoading(true);
    setError(null);

    startTransition(async () => {
      try {
        // If we already have this quiz data (e.g., if it was the initial one), don't re-fetch
        if (quizId === initialQuizData.id) {
            setCurrentQuizData(initialQuizData);
        } else {
            const quizData = await fetchQuizAction(quizId);
            if (quizData) {
                setCurrentQuizData(quizData);
            } else {
                setError(`Failed to load quiz: ${quizzesMeta.find(q => q.id === quizId)?.title || 'Unknown Quiz'}`);
                setCurrentQuizData(null); // Clear data on fetch error
            }
        }
      } catch (e) {
        console.error("Error fetching quiz data:", e);
        setError("An unexpected error occurred while loading the quiz.");
        setCurrentQuizData(null); // Clear data on catch
      } finally {
        setIsLoading(false);
      }
    });
  }, [selectedQuizId, currentQuizData, isLoading, initialQuizData, quizzesMeta]); // Added dependencies

  const handleNextQuiz = useCallback(() => {
    const currentIndex = quizzesMeta.findIndex(q => q.id === selectedQuizId);
    if (currentIndex !== -1 && currentIndex < quizzesMeta.length - 1) {
      const nextQuizId = quizzesMeta[currentIndex + 1].id;
      handleQuizSelection(nextQuizId);
    }
  }, [quizzesMeta, selectedQuizId, handleQuizSelection]);

  const displayQuiz = isLoading ? null : currentQuizData; // Show skeleton if loading, otherwise current data or null

  return (
    <div className="space-y-6">
      <Tabs value={selectedQuizId} onValueChange={handleQuizSelection} className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 h-auto">
          {quizzesMeta.map((quiz) => (
            <TabsTrigger key={quiz.id} value={quiz.id} className="py-2 px-3 h-auto text-sm sm:text-base">
              {quiz.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {/* Actual content is rendered below, not inside TabsContent for this dynamic setup */}
      </Tabs>
      
      <div className="mt-4 min-h-[400px]"> {/* Added min-height to prevent layout jump */}
        {isLoading || isPending ? ( // Show skeleton if loading or transition is pending
            <div className="space-y-4 p-6 border rounded-xl shadow-md bg-card">
                <Skeleton className="h-8 w-3/4 bg-muted" />
                <Skeleton className="h-4 w-1/2 bg-muted" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                    <Skeleton className="h-16 w-full rounded-full bg-muted" />
                    <Skeleton className="h-16 w-full rounded-full bg-muted" />
                    <Skeleton className="h-16 w-full rounded-full bg-muted" />
                    <Skeleton className="h-16 w-full rounded-full bg-muted" />
                </div>
                <Skeleton className="h-10 w-1/3 mt-6 bg-muted" />
            </div>
        ) : error ? (
            <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Error Loading Quiz</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        ) : displayQuiz ? (
          <InteractiveQuizClientView
            key={displayQuiz.id} // Ensures re-mount when quiz ID changes
            quiz={displayQuiz}
            onNextQuiz={quizzesMeta.findIndex(q => q.id === selectedQuizId) < quizzesMeta.length - 1 ? handleNextQuiz : undefined}
          />
        ) : (
            <Alert>
                <Terminal className="h-4 w-4" />
                <AlertTitle>No Quiz Data</AlertTitle>
                <AlertDescription>Please select a quiz from the tabs above.</AlertDescription>
            </Alert>
        )}
      </div>
    </div>
  );
}