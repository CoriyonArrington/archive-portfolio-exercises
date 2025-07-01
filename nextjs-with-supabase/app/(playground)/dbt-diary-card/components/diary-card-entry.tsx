// app/(playground)/dbt-diary-card/components/diary-entry-card.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { DiaryEntryCardData } from '@/types/dbt';

interface DiaryEntryCardProps {
  entry: DiaryEntryCardData;
}

// Keep PascalCase for component name
const DiaryEntryCard: React.FC<DiaryEntryCardProps> = ({ entry }) => { 
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString + 'T00:00:00Z');
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      return format(date, 'MMM d, yy'); 
    } catch (e) {
      console.error('Error formatting date:', e);
      return 'Invalid date';
    }
  };

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
    <Link href={`/dbt-diary-card/entries/${entry.id}`} className="block">
      <Card className={`h-full flex flex-col transition-all duration-150 ease-in-out hover:shadow-lg hover:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${entry.crisis ? 'border-destructive hover:border-destructive/80' : 'border-border'}`}>
        <CardHeader className="p-4 pb-2 flex flex-row justify-between items-start">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1.5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {formatDate(entry.entryDate)}
            </span>
          </div>
          {entry.crisis && (
            <div>
              <Badge variant="destructive" className="flex gap-1 items-center text-xs">
                <AlertTriangle className="h-3 w-3" /> Crisis
              </Badge>
            </div>
          )}
        </CardHeader>
        <CardContent className="p-4 pt-0 flex-grow">
          {entry.emotions && entry.emotions.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {entry.emotions.map(emotion => (
                <Badge
                  key={emotion.id}
                  style={{ 
                    backgroundColor: emotion.color, 
                    color: isColorDark(emotion.color) ? '#FFFFFF' : '#000000',
                    borderColor: isColorDark(emotion.color) ? emotion.color : undefined
                  }}
                  className="text-xs"
                  variant={isColorDark(emotion.color) ? "default" : "outline"}
                >
                  {emotion.name}
                </Badge>
              ))}
            </div>
          )}
          {entry.notes && (
             <p className="text-sm text-muted-foreground line-clamp-3">{entry.notes}</p>
          )}
          {(!entry.notes && (!entry.emotions || entry.emotions.length === 0)) && (
            <p className="text-sm text-muted-foreground italic">No specific details recorded.</p>
          )}
        </CardContent>
        <CardFooter className="p-4 pt-2 flex justify-between items-center border-t mt-auto">
          <div className="text-sm text-muted-foreground">
            {typeof entry.wellnessRating === 'number' ? (
              <>
                <span className="font-medium text-foreground">{entry.wellnessRating}</span>/5 wellness
              </>
            ) : (
              <span className="italic">N/A</span>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{entry.skills?.length || 0}</span> skills used
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default DiaryEntryCard; // Keep PascalCase for component export