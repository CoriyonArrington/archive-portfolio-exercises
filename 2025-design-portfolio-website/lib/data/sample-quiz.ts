import type { Quiz } from "@/types/quiz"

export const designPrinciplesQuiz: Quiz = {
  id: "design-principles",
  title: "Design Principles Quiz",
  description: "Test your knowledge of fundamental design principles and concepts.",
  questions: [
    {
      id: "design-q1",
      question: "On average, how many seconds will a person spend on a website?",
      options: ["8 seconds", "15 seconds", "25 seconds", "40 seconds"],
      correctAnswer: "15 seconds",
      explanation:
        "Research shows that users typically spend about 15 seconds on a website before deciding whether to stay or leave. This highlights the importance of clear, engaging design that quickly communicates value.",
    },
    {
      id: "design-q2",
      question: "Which design principle refers to the arrangement of elements to create a sense of stability?",
      options: ["Contrast", "Balance", "Hierarchy", "Proximity"],
      correctAnswer: "Balance",
      explanation:
        "Balance in design refers to the distribution of visual weight to create stability. It can be symmetrical (formal) or asymmetrical (informal), but both aim to provide equilibrium to the composition.",
    },
    {
      id: "design-q3",
      question: "What is the primary purpose of white space in design?",
      options: [
        "To save ink when printing",
        "To reduce development time",
        "To improve readability and focus",
        "To minimize content requirements",
      ],
      correctAnswer: "To improve readability and focus",
      explanation:
        "White space (or negative space) gives content room to breathe, improves readability, creates focus on important elements, and contributes to the overall aesthetic quality of the design.",
    },
    {
      id: "design-q4",
      question: "Which color psychology association is generally incorrect?",
      options: ["Blue - Trust", "Red - Energy", "Green - Growth", "Yellow - Sadness"],
      correctAnswer: "Yellow - Sadness",
      explanation:
        "Yellow is typically associated with optimism, happiness, and energy—not sadness. Color psychology suggests yellow creates feelings of cheerfulness and stimulates mental activity.",
    },
    {
      id: "design-q5",
      question: "What is the 'F-pattern' in web design?",
      options: [
        "A layout shaped like the letter F",
        "How users typically scan web content",
        "A framework for responsive design",
        "A type of navigation menu",
      ],
      correctAnswer: "How users typically scan web content",
      explanation:
        "The F-pattern describes the common reading pattern where users scan a webpage in a shape resembling the letter F—across the top, then down the left side, with occasional scans to the right. This influences effective content placement.",
    },
  ],
}

export const accessibilityQuiz: Quiz = {
  id: "accessibility",
  title: "Web Accessibility Quiz",
  description: "Test your knowledge of web accessibility standards and best practices.",
  questions: [
    {
      id: "access-q1",
      question: "What does WCAG stand for?",
      options: [
        "Web Content Accessibility Guidelines",
        "World Computer Access Group",
        "Web Compliance and Governance",
        "Website Color and Graphics",
      ],
      correctAnswer: "Web Content Accessibility Guidelines",
      explanation:
        "WCAG (Web Content Accessibility Guidelines) are developed by the W3C and provide a set of recommendations for making web content more accessible to people with disabilities.",
    },
    {
      id: "access-q2",
      question: "What is the minimum contrast ratio recommended by WCAG AA standards for normal text?",
      options: ["2:1", "3:1", "4.5:1", "7:1"],
      correctAnswer: "4.5:1",
      explanation:
        "WCAG 2.1 Level AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text to ensure readability for users with visual impairments.",
    },
    {
      id: "access-q3",
      question: "Which HTML attribute is essential for screen readers to understand images?",
      options: ["src", "alt", "title", "description"],
      correctAnswer: "alt",
      explanation:
        "The alt attribute provides alternative text for images, allowing screen readers to describe the image to users with visual impairments. It's a fundamental component of web accessibility.",
    },
    {
      id: "access-q4",
      question: "What is the purpose of ARIA landmarks in web development?",
      options: [
        "To create visual borders around sections",
        "To improve SEO rankings",
        "To identify regions of a page for assistive technologies",
        "To mark deprecated HTML elements",
      ],
      correctAnswer: "To identify regions of a page for assistive technologies",
      explanation:
        "ARIA landmarks (such as role='navigation', role='main') help assistive technologies understand the structure of a webpage, allowing users to navigate more efficiently between different sections.",
    },
    {
      id: "access-q5",
      question: "Which of these is NOT a principle of the WCAG?",
      options: ["Perceivable", "Operable", "Understandable", "Affordable"],
      correctAnswer: "Affordable",
      explanation:
        "The four principles of WCAG are Perceivable, Operable, Understandable, and Robust (POUR). 'Affordable' is not one of the principles.",
    },
  ],
}
