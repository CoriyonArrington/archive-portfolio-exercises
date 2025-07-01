// lib/data/quizzes.ts
import { createClient } from "@/utils/supabase/server";
import type {
  QuizClient,
  QuizQuestionClient,
  SupabaseQuiz, // This type will need to be updated (see notes below)
  SupabaseQuizQuestion, // This type will need to be updated (see notes below)
  SupabaseQuestionOption,
} from "@/types/quiz";

// transformSupabaseQuizToClient function updated for new property names
function transformSupabaseQuizToClient(supabaseQuiz: SupabaseQuiz): QuizClient {
  // Assumes SupabaseQuiz type now has pg_quiz_questions
  const clientQuestions: QuizQuestionClient[] = (supabaseQuiz.pg_quiz_questions || [])
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((sq: SupabaseQuizQuestion) => { // Assumes SupabaseQuizQuestion type now has pg_question_options
      const options: string[] = (sq.pg_question_options || [])
        .sort((a, b) => a.sort_order - b.sort_order)
        .map(
          (opt: SupabaseQuestionOption) => opt.option_text
        );

      const correctOption = (sq.pg_question_options || []).find(
        (opt: SupabaseQuestionOption) => opt.is_correct
      );

      if (!correctOption) {
        // console.warn(`No correct option found for question ID: ${sq.id}`);
        return null; // Skip this question if no correct option is defined
      }

      return {
        id: sq.id,
        question: sq.question_text,
        options: options,
        correctAnswer: correctOption.option_text,
        explanation: sq.explanation || null,
      };
    })
    .filter((q): q is QuizQuestionClient => q !== null);

  return {
    id: supabaseQuiz.id,
    title: supabaseQuiz.title,
    description: supabaseQuiz.description,
    questions: clientQuestions,
  };
}

export async function getQuizById(quizId: string): Promise<QuizClient | null> {
  const supabase = createClient();

  // Updated select string with new table names for relationships
  const selectQuery = `
      id,
      title,
      description,
      pg_quiz_questions (
        id,
        question_text,
        explanation,
        sort_order,
        pg_question_options (
          id,
          option_text,
          is_correct,
          sort_order
        )
      )
    `;

  const { data: quizData, error } = await supabase
    .from("pg_quizzes") // <--- UPDATED TABLE NAME
    .select(selectQuery)
    .eq("id", quizId)
    // Ensure foreignTable names match actual related table names for ordering
    .order("sort_order", { foreignTable: "pg_quiz_questions", ascending: true })
    .order("sort_order", { foreignTable: "pg_quiz_questions.pg_question_options", ascending: true })
    .single();

  if (error) {
    console.error(`Error fetching quiz with ID ${quizId}:`, JSON.stringify(error, null, 2));
    return null;
  }

  if (!quizData) {
    return null;
  }

  // Updated type guard to check for new property name 'pg_quiz_questions'
  if (typeof quizData !== 'object' || quizData === null || !('id' in quizData) || !('pg_quiz_questions' in quizData)) {
    console.error("Fetched quizData is not of the expected object structure or is missing 'pg_quiz_questions':", quizData);
    return null;
  }

  // Ensure nested arrays are present, even if empty, for the transformation function
  // and use the new property names.
  const ensuredQuizData = {
    ...quizData,
    pg_quiz_questions: (quizData.pg_quiz_questions || []).map((qq: any) => ({
      ...(qq as SupabaseQuizQuestion), // Cast qq here, ensure SupabaseQuizQuestion type is updated
      pg_question_options: (qq.pg_question_options || []) as SupabaseQuestionOption[]
    }))
  };

  // Cast to SupabaseQuiz (which should now reflect the new property names)
  const supabaseQuiz = ensuredQuizData as unknown as SupabaseQuiz;
  return transformSupabaseQuizToClient(supabaseQuiz);
}

export async function getAvailableQuizzes(): Promise<{ id: string; title: string; description: string | null }[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("pg_quizzes") // <--- UPDATED TABLE NAME
    .select("id, title, description") // These are columns directly on pg_quizzes
    .order("created_at", { ascending: false }); // Assuming pg_quizzes has created_at

  if (error) {
    console.error("Error fetching available quizzes:", error.message);
    return [];
  }
  return data || [];
}

export async function getDefaultQuiz(): Promise<QuizClient | null> {
  const supabase = createClient();
  const { data: quizInfo, error: quizInfoError } = await supabase
    .from("pg_quizzes") // <--- UPDATED TABLE NAME
    .select("id, title") // Columns directly on pg_quizzes
    .order("created_at", { ascending: true }) // Assuming pg_quizzes has created_at
    .limit(1)
    .maybeSingle();

  if (quizInfoError) {
    console.error("Error fetching default quiz ID:", quizInfoError.message);
    return null;
  }
  
  if (!quizInfo) {
     console.warn("No quizzes found in the database to select a default.");
     return null;
  }

  // getQuizById will handle fetching the full quiz data with updated table names
  return getQuizById(quizInfo.id);
}