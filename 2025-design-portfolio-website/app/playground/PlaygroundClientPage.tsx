"use client"

import { useState } from "react"
import { designPrinciplesQuiz, accessibilityQuiz } from "@/lib/data/sample-quiz"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InteractiveQuiz from "@/components/quiz/interactive-quiz"

export default function PlaygroundClientPage() {
  const [activeTab, setActiveTab] = useState("design-principles")

  const handleNextQuiz = () => {
    if (activeTab === "design-principles") {
      setActiveTab("accessibility")
    } else {
      setActiveTab("design-principles")
    }
  }

  return (
    <div className="container px-0 py-12">
      <h1 className="text-4xl font-bold mb-8">Playground</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="design-principles">Design Principles</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
        </TabsList>

        <TabsContent value="design-principles">
          <InteractiveQuiz quiz={designPrinciplesQuiz} onNextQuiz={handleNextQuiz} />
        </TabsContent>

        <TabsContent value="accessibility">
          <InteractiveQuiz quiz={accessibilityQuiz} onNextQuiz={handleNextQuiz} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
