// app/(playground)/dbt-diary-card/components/skills-display.tsx
"use client";

import type { DBTSkillClient } from "@/types/dbt";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
// You might want to import specific Lucide icons if your skill.icon refers to them by name
// import { Smile, Zap, Users, Brain } from "lucide-react"; // Example

interface SkillsDisplayProps {
  skills: DBTSkillClient[];
}

// Helper to get an icon component (example, you'll need to implement this based on skill.icon values)
// const getIconComponent = (iconName?: string | null) => {
//   if (!iconName) return null;
//   switch (iconName.toLowerCase()) {
//     case "smile": return <Smile className="h-5 w-5 mr-2" />;
//     case "zap": return <Zap className="h-5 w-5 mr-2" />;
//     // Add more cases for your icons
//     default: return null;
//   }
// };

export default function SkillsDisplay({ skills }: SkillsDisplayProps) {
  if (!skills || skills.length === 0) {
    return <p className="text-muted-foreground">No skills to display.</p>;
  }

  // Group skills by category
  const skillsByCategory: Record<string, DBTSkillClient[]> = skills.reduce((acc, skill) => {
    const category = skill.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, DBTSkillClient[]>);

  return (
    <div>
      <Accordion type="multiple" className="w-full space-y-4">
        {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
          <AccordionItem value={category} key={category} className="border bg-card rounded-lg shadow-sm">
            <AccordionTrigger className="px-6 py-4 text-lg font-semibold hover:no-underline">
              {category} ({categorySkills.length})
            </AccordionTrigger>
            <AccordionContent className="px-6 pt-0 pb-4 space-y-4">
              {categorySkills.map((skill) => (
                <Card key={skill.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl flex items-center">
                        {/* {getIconComponent(skill.icon)} Placeholder for actual icon rendering */}
                        {skill.icon && <span className="mr-2 text-primary">◆</span> /* Simple placeholder */}
                        {skill.name}
                      </CardTitle>
                      {skill.isCustom && <Badge variant="outline">Custom</Badge>}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    {skill.description && (
                      <div>
                        <h4 className="font-semibold text-muted-foreground">Description:</h4>
                        <p className="text-foreground/90">{skill.description}</p>
                      </div>
                    )}
                    {skill.practice && (
                      <div>
                        <h4 className="font-semibold text-muted-foreground">How to Practice:</h4>
                        <p className="text-foreground/90">{skill.practice}</p>
                      </div>
                    )}
                    {skill.examples && (
                      <div>
                        <h4 className="font-semibold text-muted-foreground">Examples:</h4>
                        <p className="text-foreground/90">{skill.examples}</p>
                      </div>
                    )}
                    {skill.benefits && (
                      <div>
                        <h4 className="font-semibold text-muted-foreground">Benefits:</h4>
                        <p className="text-foreground/90">{skill.benefits}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}