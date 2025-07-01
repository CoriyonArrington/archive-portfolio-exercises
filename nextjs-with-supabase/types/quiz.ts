// types/quiz.ts

// Client-facing types (these likely don't need to change unless your transformed output changes)
export interface QuestionOption { // This seems like a duplicate of SupabaseQuestionOption without sort_order, or an unused type. Review if needed.
  id: string;
  option_text: string;
  is_correct: boolean;
}

export interface QuizQuestionClient {
  id: string;
  question: string;
  options: string[];          // Array of option texts
  correctAnswer: string;      // The text of the correct option
  explanation: string | null;
}

export interface QuizClient {
  id: string;
  title: string;
  description: string | null;
  questions: QuizQuestionClient[];
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  answers: Record<string, string>;
}

// Types for data as fetched from Supabase - UPDATES NEEDED HERE
export interface SupabaseQuestionOption {
  id: string;
  option_text: string;
  is_correct: boolean;
  sort_order: number;
  // Any other fields directly from pg_question_options table
}

export interface SupabaseQuizQuestion {
  id: string;
  question_text: string;
  explanation: string | null;
  sort_order: number;
  pg_question_options?: SupabaseQuestionOption[]; // <--- UPDATED property name (and made optional '?' for safety)
  // Any other fields directly from pg_quiz_questions table
}

export interface SupabaseQuiz {
  id: string;
  title: string;
  description: string | null;
  pg_quiz_questions?: SupabaseQuizQuestion[]; // <--- UPDATED property name (and made optional '?' for safety)
  created_at?: string; // Added if your pg_quizzes table has this and you use it for ordering
  // Any other fields directly from pg_quizzes table
}