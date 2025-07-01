// app/(playground)/interactive-quiz/components/quiz-client-view.tsx
"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Trophy, ArrowLeft } from "lucide-react";
import type { QuizClient, QuizResult } from "@/types/quiz";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface QuizClientViewProps {
  quiz: QuizClient;
  onNextQuiz?: () => void;
}

export default function InteractiveQuizClientView({ quiz, onNextQuiz }: QuizClientViewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false); // This state IS needed for quiz logic
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<QuizResult | null>(null); // This state IS needed for quiz logic
  const [attempts, setAttempts] = useState<Record<string, number>>({});
  const [isShaking, setIsShaking] = useState(false);
  const [draggedOption, setDraggedOption] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  // const [windowSize, setWindowSize] = useState({ width: 0, height: 0 }); // Only needed if confetti or other window-size features are used

  const isMobile = useMediaQuery("(max-width: 768px)");
  const dropAreaRef = useRef<HTMLDivElement>(null);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isCorrect = selectedOption === currentQuestion?.correctAnswer;
  const hasAnsweredCurrentAttempt = selectedOption !== null;
  const currentAttempts = attempts[currentQuestion?.id] || 0;
  const maxAttempts = 2;
  const canAttempt = currentAttempts < maxAttempts;
  const hasFullyAnsweredQuestion = showExplanation || (selectedOption !== null && (isCorrect || !canAttempt));

  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  // Removed useEffect for windowSize if confetti is not used.
  // If you re-add confetti or need windowSize for other reasons, uncomment this:
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  //     handleResize();
  //     window.addEventListener("resize", handleResize);
  //     return () => window.removeEventListener("resize", handleResize);
  //   }
  // }, []);

  // **IMPORTANT**: The useEffect block that conditionally showed confetti based on
  // quizCompleted and results should be COMPLETELY REMOVED.
  // It was located around here.

  useEffect(() => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setQuizCompleted(false);
    setAnswers({});
    setResults(null);
    setAttempts({});
  }, [quiz]);

 useEffect(() => {
    if (hasAnsweredCurrentAttempt && !isCorrect && canAttempt && !showExplanation) {
      const timer = setTimeout(() => {
        setSelectedOption(null);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [hasAnsweredCurrentAttempt, isCorrect, canAttempt, showExplanation]);

  const handleOptionSelect = useCallback((option: string) => {
    if (hasFullyAnsweredQuestion) return;

    setSelectedOption(option);
    const isNowCorrect = option === currentQuestion.correctAnswer;
    const newAttemptsCount = isNowCorrect ? currentAttempts : (attempts[currentQuestion.id] || 0) + 1;
    
    setAttempts((prev) => ({ ...prev, [currentQuestion.id]: newAttemptsCount }));

    if (isNowCorrect) {
      setShowExplanation(true);
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: option }));
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      if (newAttemptsCount >= maxAttempts) {
        setShowExplanation(true);
        setAnswers((prev) => ({ ...prev, [currentQuestion.id]: option }));
      }
    }
  }, [currentQuestion, attempts, hasFullyAnsweredQuestion, maxAttempts, currentAttempts]);

  const navigateToQuestion = useCallback((index: number) => {
      setCurrentQuestionIndex(index);
      const questionId = quiz.questions[index].id;
      const previouslySelectedAnswer = answers[questionId];

      if (previouslySelectedAnswer) {
          setSelectedOption(previouslySelectedAnswer);
          setShowExplanation(true); 
      } else {
          setSelectedOption(null);
          setShowExplanation(false);
      }
  }, [answers, quiz.questions]);

  const handlePreviousQuestion = useCallback(() => {
    if (!isFirstQuestion) navigateToQuestion(currentQuestionIndex - 1);
  }, [isFirstQuestion, currentQuestionIndex, navigateToQuestion]);

  const handleNextQuestion = useCallback(() => {
    if (!hasFullyAnsweredQuestion && selectedOption === null) return;

    if (isLastQuestion) {
      let correctAnswersCount = 0;
      for (const questionId in answers) {
        const question = quiz.questions.find(q => q.id === questionId);
        if (question && answers[questionId] === question.correctAnswer) {
          correctAnswersCount++;
        }
      }

      setResults({
        totalQuestions: quiz.questions.length,
        correctAnswers: correctAnswersCount,
        percentage: quiz.questions.length > 0 ? Math.round((correctAnswersCount / quiz.questions.length) * 100) : 0,
        answers,
      });
      setQuizCompleted(true);
    } else {
      navigateToQuestion(currentQuestionIndex + 1);
    }
  }, [isLastQuestion, answers, quiz.questions, currentQuestionIndex, navigateToQuestion, hasFullyAnsweredQuestion, selectedOption]);

  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setQuizCompleted(false);
    setAnswers({});
    setResults(null);
    setAttempts({});
  }, []);

  const handleDragStart = (option: string) => {
    if (hasFullyAnsweredQuestion || isMobile) return;
    setDraggedOption(option);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (hasFullyAnsweredQuestion || !draggedOption) return;
    handleOptionSelect(draggedOption);
    setDraggedOption(null);
    setIsDraggingOver(false);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isDraggingOver && draggedOption && !hasFullyAnsweredQuestion) setIsDraggingOver(true);
  };
  const handleDragLeave = () => setIsDraggingOver(false);

  if (!currentQuestion) {
    return (
      <Card className="w-full p-6 text-center">
        <CardContent><p>Loading quiz question...</p></CardContent>
      </Card>
    );
  }

  const progressPercentage = quiz.questions.length > 0 ? Math.round(((currentQuestionIndex +1) / quiz.questions.length) * 100) : 0;

  if (quizCompleted && results) { // This `if` block uses quizCompleted and results correctly
    return (
      <Card className="w-full p-4 md:p-6 text-center shadow-xl">
        <CardHeader className="items-center">
          <Trophy className="w-24 h-24 text-yellow-400 mb-4" />
          <CardTitle className="text-3xl">Quiz Completed!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xl">
            You scored <span className="font-bold text-primary">{results.correctAnswers}</span> out of{" "}
            <span className="font-bold">{results.totalQuestions}</span>
          </p>
          <div className="w-full max-w-sm mx-auto">
            <Progress value={results.percentage} className="h-4" />
            <p className="text-2xl font-bold mt-2 text-primary">{results.percentage}%</p>
          </div>
          <div className="w-full mt-6 text-left max-h-[250px] overflow-y-auto pr-3 space-y-3">
            <h3 className="text-lg font-semibold mb-2 sticky top-0 bg-card/80 backdrop-blur-sm py-1 z-10">Question Review:</h3>
            {quiz.questions.map((questionData, index) => {
              const userAnswer = answers[questionData.id];
              const isAnswerCorrect = userAnswer === questionData.correctAnswer;
              return (
                <div key={questionData.id} className="p-3 rounded-md border bg-muted/30 text-sm">
                  <div className="flex items-start gap-2.5">
                    {isAnswerCorrect ? <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />}
                    <div className="flex-1">
                      <p className="font-medium">Q{index + 1}: {questionData.question}</p>
                      <p className="mt-0.5 text-muted-foreground">Your answer: <span className={cn(isAnswerCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400")}>{userAnswer || "Not answered"}</span></p>
                      {!isAnswerCorrect && <p className="mt-0.5 text-green-600 dark:text-green-400">Correct: {questionData.correctAnswer}</p>}
                      {questionData.explanation && <p className="mt-1.5 text-xs text-muted-foreground/70 italic border-l-2 border-border pl-2">{questionData.explanation}</p>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 mt-6 justify-center">
          {onNextQuiz && <Button onClick={onNextQuiz} size="lg"><ArrowRight className="w-4 h-4 mr-2" /> Next Quiz</Button>}
          <Button onClick={resetQuiz} variant="outline" size="lg"><RotateCcw className="w-4 h-4 mr-2" /> Retake Quiz</Button>
        </CardFooter>
      </Card>
    );
  }

  const getOptionStyling = (optionText: string, index: number) => {
    const isSelected = selectedOption === optionText;
    const isActualCorrect = currentQuestion.correctAnswer === optionText;

    const baseColorCycle = [
        "bg-sky-600 hover:bg-sky-500",
        "bg-amber-600 hover:bg-amber-500",
        "bg-emerald-600 hover:bg-emerald-500",
        "bg-rose-600 hover:bg-rose-500",
    ];

    if (hasFullyAnsweredQuestion) {
        if (isActualCorrect) return "bg-green-500 text-white ring-2 ring-green-300 dark:ring-green-700 cursor-default";
        if (isSelected && !isActualCorrect) return "bg-red-500 text-white ring-2 ring-red-300 dark:ring-red-700 cursor-default";
        return "bg-muted text-muted-foreground cursor-default opacity-60";
    }

    if (isSelected) {
        const selectedColorCycle = [ "bg-sky-500", "bg-amber-500", "bg-emerald-500", "bg-rose-500" ];
        return `${selectedColorCycle[index % selectedColorCycle.length]} text-white ring-2 ring-offset-2 ring-offset-card ring-current`;
    }
    return `${baseColorCycle[index % baseColorCycle.length]} text-white`;
  };

  return (
    <Card className="w-full p-4 md:p-6 shadow-xl">
      <CardHeader>
        <div className="flex justify-between items-center mb-1">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
             Attempts: {currentAttempts}/{maxAttempts}
          </CardDescription>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </CardHeader>

      <CardContent className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h2 className="text-xl md:text-2xl font-semibold mb-6 min-h-[60px] md:min-h-[80px] text-foreground">
              {currentQuestion.question}
            </h2>

            <motion.div
              className={cn("grid gap-3", isMobile ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2")}
              animate={isShaking ? { x: [0, -8, 8, -8, 8, -6, 6, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              {currentQuestion.options.map((option, index) => {
                return isMobile ? (
                  <Button
                    key={option}
                    variant="default"
                    size="lg"
                    className={cn(
                      "justify-start text-left h-auto py-3 px-4 whitespace-normal transition-all duration-150 ease-in-out",
                      getOptionStyling(option, index)
                    )}
                    onClick={() => handleOptionSelect(option)}
                    disabled={hasFullyAnsweredQuestion}
                  >
                    <span className="mr-3 h-6 w-6 rounded-full border border-current/30 flex items-center justify-center text-xs shrink-0">
                        {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </Button>
                ) : (
                  <motion.div
                    key={option}
                    draggable={!hasFullyAnsweredQuestion}
                    onDragStart={() => handleDragStart(option)}
                    onDragEnd={() => { setDraggedOption(null); setIsDraggingOver(false); }}
                    className={cn(
                      "p-3 rounded-lg font-medium text-left cursor-grab active:cursor-grabbing transition-all duration-150 ease-in-out flex items-center",
                      getOptionStyling(option, index)
                    )}
                    whileHover={!hasFullyAnsweredQuestion ? { scale: 1.03, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" } : {}}
                    whileTap={!hasFullyAnsweredQuestion ? { scale: 0.98, boxShadow: "0px 2px 5px rgba(0,0,0,0.1)" } : {}}
                  >
                     <span className="mr-3 h-6 w-6 rounded-full border border-current/30 flex items-center justify-center text-xs shrink-0">
                        {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </motion.div>
                );
              })}
            </motion.div>

            {!isMobile && !hasFullyAnsweredQuestion && (
              <div
                ref={dropAreaRef}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                  "mt-6 border-2 border-dashed border-border rounded-lg h-20 flex items-center justify-center transition-all text-muted-foreground",
                  isDraggingOver && "border-primary bg-primary/10 scale-105 text-primary",
                )}
              >
                {draggedOption ? `Drop '${draggedOption.substring(0,20)}${draggedOption.length > 20 ? "..." : ""}' here` : "Drag your answer here"}
              </div>
            )}
             {!isMobile && hasFullyAnsweredQuestion && selectedOption && (
                <div className={cn("mt-6 border-2 border-border rounded-lg h-20 flex items-center justify-center text-white font-medium", isCorrect ? "bg-green-500" : "bg-red-500")}>
                    Your Answer: {selectedOption}
                </div>
            )}

            <AnimatePresence>
              {showExplanation && currentQuestion.explanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: "1.5rem" }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="p-4 bg-muted/50 rounded-lg border"
                >
                  <p className="text-sm text-foreground">{currentQuestion.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </CardContent>

      <CardFooter className="mt-8 flex flex-col sm:flex-row justify-between gap-3">
        <Button onClick={handlePreviousQuestion} disabled={isFirstQuestion} variant="outline" size="lg">
          <ArrowLeft className="w-4 h-4 mr-2" /> Previous
        </Button>
        <Button 
            onClick={handleNextQuestion} 
            disabled={!hasFullyAnsweredQuestion && selectedOption === null} 
            variant="default" 
            size="lg"
        >
          {isLastQuestion ? "Finish Quiz" : "Next"}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}