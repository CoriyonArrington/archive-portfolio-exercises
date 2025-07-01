// lib/actions/quiz.ts
"use server"; // This directive must be at the very top of the file

import type { QuizClient } from "@/types/quiz";
import { getQuizById } from "@/lib/data/quizzes"; // Assuming getQuizById is here

export async function fetchQuizAction(quizId: string): Promise<QuizClient | null> {
  // You can add any server-side validation or logging here if needed
  if (!quizId) {
    console.error("fetchQuizAction called without a quizId");
    return null;
  }
  try {
    const quiz = await getQuizById(quizId);
    return quiz;
  } catch (error) {
    console.error(`Error in fetchQuizAction for quizId ${quizId}:`, error);
    // Depending on your error handling strategy, you might throw the error
    // or return null/custom error object. For client consumption, null might be simpler.
    return null; 
  }
}