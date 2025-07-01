// app/(playground)/dbt-diary-card/components/diary-entry-detail-display.tsx
'use client';

import React from 'react';
import Link from 'next/link'; // Import Link
import { DiaryEntryClient } from '@/types/dbt'; 
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Button } from "@/components/ui/button"; // Import Button
import { format } from 'date-fns';
import { AlertTriangle, Pencil } from 'lucide-react'; // Import Pencil icon

interface DiaryEntryDetailDisplayProps {
  entry: DiaryEntryClient; 
}

const DiaryEntryDetailDisplay: React.FC<DiaryEntryDetailDisplayProps> = ({ entry }) => {
  // Helper to format date (can be moved to a utils file)
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString + 'T00:00:00Z');
      if (isNaN(date.getTime())) return 'Invalid date';
      return format(date, 'EEEE, MMMM d, yyyy'); 
    } catch (e) {
      return 'Invalid date';
    }
  };

   // Helper to check color darkness (can be moved to a utils file)
  const isColorDark = (hexColor: string | undefined): boolean => {
    if (!hexColor) return false;
    const color = hexColor.startsWith('#') ? hexColor.substring(1) : hexColor;
    if (color.length !== 6 && color.length !== 3) return false; 
    const hex = color.length === 3 ? color.split('').map(c => c + c).join('') : color;
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5;
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        {/* --- Row for Title, Edit Button, Crisis Badge --- */}
        <div className="flex justify-between items-start mb-2 gap-4">
          {/* Left side: Title */}
          <CardTitle className="text-2xl">{formatDate(entry.date)}</CardTitle>
          
          {/* Right side: Edit Button and Crisis Badge */}
          <div className="flex items-center gap-2 flex-shrink-0"> 
            {entry.crisis && (
              <Badge variant="destructive" className="flex gap-1 items-center text-xs">
                <AlertTriangle className="h-3 w-3" /> Crisis
              </Badge>
            )}
            {/* Edit Button using Link */}
            <Link href={`/dbt-diary-card/entries/${entry.id}/edit`} passHref legacyBehavior>
                <Button variant="outline" size="sm" aria-label="Edit entry">
                    <Pencil className="h-4 w-4" />
                </Button>
            </Link>
          </div>
        </div>
        {/* --- Wellness Rating --- */}
        <CardDescription>
          Wellness Rating: <span className="font-semibold">{entry.wellnessRating ?? 'N/A'}/5</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Notes Section */}
        {entry.notes && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Notes</h3>
            <p className="text-sm whitespace-pre-wrap">{entry.notes}</p> 
          </div>
        )}

        {/* Emotions Section */}
        {entry.emotions && entry.emotions.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Emotions Logged</h3>
            <div className="flex flex-wrap gap-2">
              {entry.emotions.map((emotion, index) => (
                <Badge
                  key={`${emotion.emotionId}-${index}`} 
                  style={{ 
                    backgroundColor: emotion.color, 
                    color: isColorDark(emotion.color) ? '#FFFFFF' : '#000000',
                    borderColor: isColorDark(emotion.color) ? emotion.color : undefined
                  }}
                  variant={isColorDark(emotion.color) ? "default" : "outline"}
                >
                  {emotion.name} (Intensity: {emotion.intensity ?? 'N/A'})
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {entry.skills && entry.skills.length > 0 && (
           <div>
             <h3 className="text-lg font-semibold mb-2">Skills Used</h3>
             <ul className="list-disc list-inside space-y-1 text-sm">
              {entry.skills.map((skill, index) => (
                <li key={`${skill.skillId}-${index}`}>
                  <span className="font-medium">{skill.name}</span> ({skill.category})
                </li>
              ))}
             </ul>
           </div>
        )}
        
        {/* Urges Section */}
        {entry.urges && entry.urges.length > 0 && (
           <div>
             <h3 className="text-lg font-semibold mb-2">Urges Logged</h3>
             <ul className="list-disc list-inside space-y-1 text-sm">
              {entry.urges.map((urge, index) => (
                <li key={`${urge.urgeId}-${index}`}>
                  <span className="font-medium">{urge.name}</span> (Rating: {urge.rating ?? 'N/A'})
                </li>
              ))}
             </ul>
           </div>
        )}

        {/* Custom Fields Section */}
        {entry.customFields && entry.customFields.length > 0 && (
           <div>
             <h3 className="text-lg font-semibold mb-2">Custom Fields</h3>
             <ul className="list-disc list-inside space-y-1 text-sm">
              {entry.customFields.map((field, index) => (
                <li key={`${field.fieldId}-${index}`}>
                  <span className="font-medium">{field.name}</span> ({field.type}): {JSON.stringify(field.value)} 
                </li>
              ))}
             </ul>
           </div>
        )}

        {/* Fallback if no details logged */}
         {(!entry.notes && entry.emotions?.length === 0 && entry.skills?.length === 0 && entry.urges?.length === 0 && entry.customFields?.length === 0) && (
            <p className="text-sm text-muted-foreground italic">No specific details were logged for this day beyond the wellness rating.</p>
         )}

      </CardContent>
    </Card>
  );
};

export default DiaryEntryDetailDisplay;