// app/(playground)/interactive-quiz/page.tsx

import QuizShell from "./components/quiz-shell";
import { getAvailableQuizzes, getQuizById } from "@/lib/data/quizzes";
import type { QuizClient } from "@/types/quiz";
import { H1 } from "@/components/typography/H1";
import { P } from "@/components/typography/P";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export const metadata = {
  title: "Interactive Quizzes", // Changed to plural
  description: "Test your knowledge with our interactive UX quizzes!",
};

// export const revalidate = 3600;

export default async function InteractiveQuizPage() {
  const availableQuizzes = await getAvailableQuizzes();
  let initialQuiz: QuizClient | null = null;

  if (availableQuizzes.length > 0) {
    // Load the full data for the first available quiz as the initial one
    initialQuiz = await getQuizById(availableQuizzes[0].id);
  }

  if (!availableQuizzes || availableQuizzes.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <H1>Interactive Quizzes</H1>
        </div>
        <Separator className="my-8" />
        <Alert variant="destructive" className="max-w-xl mx-auto">
          <Terminal className="h-4 w-4" />
          <AlertTitle>No Quizzes Found</AlertTitle>
          <AlertDescription>
            We couldn&apos;t find any quizzes at this moment. Please ensure quizzes
            are available in the database.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // If the initial quiz failed to load but others might exist (shouldn't happen if IDs are consistent)
  if (!initialQuiz) {
     return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <H1>Interactive Quizzes</H1>
        </div>
        <Separator className="my-8" />
        <Alert variant="destructive" className="max-w-xl mx-auto">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error Loading Initial Quiz</AlertTitle>
          <AlertDescription>
            There was an issue loading the initial quiz data. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Title and description could be dynamic based on selected quiz in QuizShell */}
      {/* Or keep a generic one here */}
      <div className="mb-6 text-center">
        <H1>Interactive UX Quizzes</H1>
        <P className="mt-2 text-muted-foreground">
          Select a quiz below and test your User Experience knowledge!
        </P>
      </div>
      <Separator className="my-8" />
      <div className="max-w-4xl mx-auto"> {/* Increased max-width for tabs */}
        <QuizShell
          quizzesMeta={availableQuizzes.map(q => ({ id: q.id, title: q.title }))}
          initialQuizData={initialQuiz}
        />
      </div>
    </div>
  );
}