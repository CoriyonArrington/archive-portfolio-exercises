"use client"

import type React from "react"
import { useState, useCallback, useRef, useEffect } from "react"
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Trophy, ArrowLeft } from "lucide-react"
import type { Quiz, QuizResult } from "@/types/quiz"
import { motion, AnimatePresence, useDragControls } from "framer-motion"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import dynamic from "next/dynamic"

// Dynamically import react-confetti to avoid SSR issues
const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false })

interface QuizProps {
  quiz: Quiz
  onNextQuiz?: () => void
}

export default function InteractiveQuiz({ quiz, onNextQuiz }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [results, setResults] = useState<QuizResult | null>(null)
  const [attempts, setAttempts] = useState<Record<string, number>>({})
  const [isShaking, setIsShaking] = useState(false)
  const [draggedOption, setDraggedOption] = useState<string | null>(null)
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  const isMobile = useMediaQuery("(max-width: 768px)")
  const dragControls = useDragControls()
  const dropAreaRef = useRef<HTMLDivElement>(null)

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const isCorrect = selectedOption === currentQuestion?.correctAnswer
  const hasAnswered = selectedOption !== null
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1
  const currentAttempts = attempts[currentQuestion?.id] || 0
  const maxAttempts = 2
  const isFirstQuestion = currentQuestionIndex === 0

  // Get window size for confetti
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }

      handleResize()
      window.addEventListener("resize", handleResize)

      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Show confetti when quiz is completed
  useEffect(() => {
    if (quizCompleted && results) {
      setShowConfetti(true)
      const timer = setTimeout(() => {
        setShowConfetti(false)
      }, 5000) // Show confetti for 5 seconds

      return () => clearTimeout(timer)
    }
  }, [quizCompleted, results])

  // Reset state when quiz changes
  useEffect(() => {
    setCurrentQuestionIndex(0)
    setSelectedOption(null)
    setShowExplanation(false)
    setQuizCompleted(false)
    setAnswers({})
    setResults(null)
    setAttempts({})
  }, [quiz])

  // Auto-retry on incorrect answer
  useEffect(() => {
    if (hasAnswered && !isCorrect && currentAttempts < maxAttempts) {
      const timer = setTimeout(() => {
        setSelectedOption(null)
        setShowExplanation(false)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [hasAnswered, isCorrect, currentAttempts, maxAttempts])

  const handleOptionSelect = useCallback(
    (option: string) => {
      if (hasAnswered) return
      setSelectedOption(option)

      const newAttemptsCount = (attempts[currentQuestion.id] || 0) + 1
      setAttempts((prev) => ({ ...prev, [currentQuestion.id]: newAttemptsCount }))

      if (option === currentQuestion.correctAnswer) {
        // Correct answer
        setShowExplanation(true)
        setAnswers((prev) => ({ ...prev, [currentQuestion.id]: option }))
      } else {
        // Incorrect answer
        setIsShaking(true)
        setTimeout(() => setIsShaking(false), 500)

        // Only show explanation and record answer after second attempt
        if (newAttemptsCount >= maxAttempts) {
          setShowExplanation(true)
          setAnswers((prev) => ({ ...prev, [currentQuestion.id]: option }))
        }
      }
    },
    [hasAnswered, currentQuestion, attempts],
  )

  const handlePreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
      setSelectedOption(null)
      setShowExplanation(false)
    }
  }, [currentQuestionIndex])

  const handleNextQuestion = useCallback(() => {
    if (isLastQuestion) {
      // Calculate results
      const correctAnswers = Object.entries(answers).reduce((count, [questionId, answer]) => {
        const question = quiz.questions.find((q) => q.id === questionId)
        return question?.correctAnswer === answer ? count + 1 : count
      }, 0)

      setResults({
        totalQuestions: quiz.questions.length,
        correctAnswers,
        percentage: Math.round((correctAnswers / quiz.questions.length) * 100),
        answers,
      })

      setQuizCompleted(true)
    } else {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedOption(null)
      setShowExplanation(false)
    }
  }, [isLastQuestion, answers, quiz.questions])

  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0)
    setSelectedOption(null)
    setShowExplanation(false)
    setQuizCompleted(false)
    setAnswers({})
    setResults(null)
    setAttempts({})
  }, [])

  const handleDragStart = (option: string) => {
    if (hasAnswered || isMobile) return
    setDraggedOption(option)
  }

  // Fixed drag and drop functionality
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (hasAnswered || !draggedOption) return

    handleOptionSelect(draggedOption)
    setDraggedOption(null)
    setIsDraggingOver(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!isDraggingOver && draggedOption) {
      setIsDraggingOver(true)
    }
  }

  const handleDragLeave = () => {
    setIsDraggingOver(false)
  }

  if (quizCompleted && results) {
    return (
      <div className="w-full p-6 bg-white dark:bg-black rounded-xl shadow-md text-black dark:text-white border border-gray-200 dark:border-gray-800">
        {showConfetti && (
          <ReactConfetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={200}
            gravity={0.15}
          />
        )}
        <div className="flex flex-col items-center justify-center space-y-6 py-8">
          <Trophy className="w-16 h-16 text-yellow-500" />
          <h2 className="text-3xl font-bold text-center">Quiz Completed!</h2>
          <div className="flex flex-col items-center justify-center space-y-2">
            <p className="text-xl">
              You scored <span className="font-bold">{results.correctAnswers}</span> out of{" "}
              <span className="font-bold">{results.totalQuestions}</span>
            </p>
            <div className="w-full bg-gray-700 rounded-full h-4 mt-2">
              <div
                className={cn(
                  "h-4 rounded-full",
                  results.percentage >= 70 ? "bg-green-500" : results.percentage >= 40 ? "bg-yellow-500" : "bg-red-500",
                )}
                style={{ width: `${results.percentage}%` }}
              />
            </div>
            <p className="text-lg font-bold mt-1">{results.percentage}%</p>
          </div>

          <div className="w-full mt-8">
            <h3 className="text-xl font-semibold mb-4">Question Review:</h3>
            <div className="space-y-4">
              {quiz.questions.map((question, index) => {
                const userAnswer = answers[question.id]
                const isCorrect = userAnswer === question.correctAnswer

                return (
                  <div
                    key={question.id}
                    className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          Question {index + 1}: {question.question}
                        </p>
                        <p className="mt-1 text-sm">
                          <span className="font-medium">Your answer:</span> {userAnswer}
                        </p>
                        {!isCorrect && (
                          <p className="mt-1 text-sm text-green-400">
                            <span className="font-medium">Correct answer:</span> {question.correctAnswer}
                          </p>
                        )}
                        {question.explanation && <p className="mt-2 text-sm text-gray-400">{question.explanation}</p>}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            {onNextQuiz && (
              <button
                onClick={onNextQuiz}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ArrowRight className="w-5 h-5 mr-2" /> Next Quiz
              </button>
            )}
            <button
              onClick={resetQuiz}
              className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <RotateCcw className="w-5 h-5 mr-2" /> Retake Quiz
            </button>
          </div>
        </div>
      </div>
    )
  }

  const getOptionColor = (index: number) => {
    const colors = [
      "bg-orange-500 hover:bg-orange-600", // Orange
      "bg-purple-500 hover:bg-purple-600", // Purple
      "bg-teal-500 hover:bg-teal-600", // Teal
      "bg-pink-500 hover:bg-pink-600", // Pink
    ]
    return colors[index % colors.length]
  }

  return (
    <div className="w-full p-6 bg-white dark:bg-black rounded-xl shadow-md text-black dark:text-white border border-gray-200 dark:border-gray-800">
      {/* Quiz Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {Math.round(((currentQuestionIndex + 1) / quiz.questions.length) * 100)}% complete
          </p>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col md:flex-row gap-4"
        >
          <div className="md:w-2/5">
            <h3 className="text-3xl font-bold mb-6">
              {currentQuestion.question.split(" ").map((word, i) => (
                <span key={i} className={word.toLowerCase() === "seconds" ? "text-green-500" : ""}>
                  {word}{" "}
                </span>
              ))}
            </h3>
            {currentAttempts > 0 && currentAttempts < maxAttempts && !isCorrect && (
              <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">{`That's not quite right. Try again!`}</p>
            )}
          </div>

          <div className="md:w-3/5">
            {/* Answer Options */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6"
              animate={isShaking ? { x: [0, -10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedOption === option
                const isCorrectAnswer = currentQuestion.correctAnswer === option
                // Only show correct answer highlight when explanation is shown
                const showCorrectHighlight = showExplanation && isCorrectAnswer
                // Gray out incorrect answers when explanation is shown
                const grayOutIncorrect = showExplanation && !isCorrectAnswer

                return isMobile ? (
                  // Mobile: Click/Tap interface
                  <button
                    key={index}
                    onClick={() => !hasAnswered && handleOptionSelect(option)}
                    className={cn(
                      "py-4 px-6 rounded-full font-medium text-center transition-all",
                      !grayOutIncorrect ? getOptionColor(index) : "bg-gray-400 dark:bg-gray-600",
                      hasAnswered && isSelected && isCorrect && "ring-4 ring-green-500 bg-green-500",
                      hasAnswered && isSelected && !isCorrect && "ring-4 ring-red-500",
                      showCorrectHighlight && !isSelected && "ring-4 ring-green-500 bg-green-500",
                    )}
                    disabled={hasAnswered}
                  >
                    {option}
                  </button>
                ) : (
                  // Desktop: Drag interface
                  <motion.div
                    key={index}
                    draggable={!hasAnswered}
                    onDragStart={() => handleDragStart(option)}
                    onDragEnd={() => {
                      setDraggedOption(null)
                      setIsDraggingOver(false)
                    }}
                    className={cn(
                      "py-4 px-6 rounded-full font-medium text-center cursor-grab active:cursor-grabbing transition-all",
                      !grayOutIncorrect ? getOptionColor(index) : "bg-gray-400 dark:bg-gray-600",
                      hasAnswered && isSelected && isCorrect && "ring-4 ring-green-500 bg-green-500",
                      hasAnswered && isSelected && !isCorrect && "ring-4 ring-red-500",
                      showCorrectHighlight && !isSelected && "ring-4 ring-green-500 bg-green-500",
                      hasAnswered && "cursor-default",
                    )}
                  >
                    {option}
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Drop Area */}
            {!isMobile && (
              <div
                ref={dropAreaRef}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                  "border-2 border-gray-400 dark:border-gray-600 rounded-full h-16 flex items-center justify-center transition-all overflow-hidden",
                  isDraggingOver && "border-blue-500 bg-blue-100 dark:bg-blue-900/20 scale-105",
                  hasAnswered && "border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800/50",
                )}
              >
                {selectedOption ? (
                  <div
                    className={cn(
                      "w-full h-full flex items-center justify-center rounded-full font-medium",
                      isCorrect ? "bg-green-500" : "bg-red-500",
                    )}
                  >
                    {selectedOption}
                  </div>
                ) : (
                  <p className="text-gray-400">Drag your answer here</p>
                )}
              </div>
            )}

            {/* Explanation - only show after max attempts or correct answer */}
            <AnimatePresence>
              {showExplanation && currentQuestion.explanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700"
                >
                  <p className="text-sm text-gray-300">{currentQuestion.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={handlePreviousQuestion}
          disabled={isFirstQuestion}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            !isFirstQuestion ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-700 cursor-not-allowed"
          }`}
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Previous
        </button>

        <button
          onClick={handleNextQuestion}
          disabled={!hasAnswered}
          className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            hasAnswered ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-700 cursor-not-allowed"
          }`}
        >
          {isLastQuestion ? "Finish Quiz" : "Next"}
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  )
}

