// app/(playground)/dbt-diary-card/components/entries-list-display.tsx
'use client';

import React from 'react';
import { DiaryEntryCardData } from '@/types/dbt';
// Use kebab-case for component import path
import DiaryEntryCard from './diary-card-entry';

interface EntriesListDisplayProps {
  entries: DiaryEntryCardData[] | null; 
}

const EntriesListDisplay: React.FC<EntriesListDisplayProps> = ({ entries }) => {
  if (!entries) {
    return <p className="text-destructive">Error loading entries.</p>;
  }

  if (entries.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-10">
        <p>No diary entries found.</p>
        <p className="mt-2 text-sm">Start logging your days!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {entries.map((entry) => (
        <DiaryEntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default EntriesListDisplay; // Keep PascalCase for component export