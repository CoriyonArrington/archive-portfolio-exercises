// app/(playground)/dbt-diary-card/layout.tsx
import React from "react";

export default function DBTDiaryCardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* You could have a sub-navigation specific to the DBT Diary Card here eventually */}
      {/* For example, links to Dashboard, New Entry, Progress, Skills Library */}
      {/* <nav className="mb-4 p-4 bg-muted rounded-md">
        <ul className="flex space-x-4">
          <li><a href="/playground/dbt-diary-card">Dashboard</a></li>
          <li><a href="/playground/dbt-diary-card/new-entry">New Entry</a></li>
          <li><a href="/playground/dbt-diary-card/entries">View Entries</a></li>
          <li><a href="/playground/dbt-diary-card/skills">Skills Library</a></li>
        </ul>
      </nav> */}
      <main>{children}</main>
    </div>
  );
}