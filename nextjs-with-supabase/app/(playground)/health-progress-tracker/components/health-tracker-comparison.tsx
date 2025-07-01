// app/(playground)/health-progress-tracker/components/health-tracker-comparison.tsx
"use client";

import React, { useState, useRef, useEffect, memo, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MousePointerClick,
  Activity,
  Calendar,
  Droplet,
  Award,
  Flame,
  Download,
  Printer,
  Share,
} from "lucide-react";

// Assuming you have these UI components from shadcn/ui or similar
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // If desired for sections
// If you have specific typography components and want to use them:
// import { H2, H3, P as TextP } from "@/components/typography";

// Helper function to get Tailwind color class from hex for SVG strokes/fills
// This is a simplified example. Ideally, your Tailwind config has these colors.
const getTailwindColorClass = (hexColor: string): string => {
  const colorMap: { [key: string]: string } = {
    "#22c55e": "text-green-500", // green-500
    "#a855f7": "text-purple-500", // purple-500
    "#eab308": "text-yellow-500", // yellow-500
    "#f97316": "text-orange-500", // orange-500
  };
  return colorMap[hexColor.toLowerCase()] || "text-gray-500"; // Fallback
};


const WeeklyProgressChart = memo(({ timePeriod }: { timePeriod: "today" | "week" | "month" }) => {
  const chartData = {
    today: {
      steps: "M40,180 L120,160 L200,140 L280,120 L360,100 L440,80 L520,60",
      stepsPoints: [ { cx: 40, cy: 180 }, { cx: 120, cy: 160 }, { cx: 200, cy: 140 }, { cx: 280, cy: 120 }, { cx: 360, cy: 100 }, { cx: 440, cy: 80 }, { cx: 520, cy: 60 }, ],
      sleep: "M40,200 L120,190 L200,170 L280,150 L360,130 L440,110 L520,90",
      sleepPoints: [ { cx: 40, cy: 200 }, { cx: 120, cy: 190 }, { cx: 200, cy: 170 }, { cx: 280, cy: 150 }, { cx: 360, cy: 130 }, { cx: 440, cy: 110 }, { cx: 520, cy: 90 }, ],
      weight: "M40,100 L120,110 L200,120 L280,130 L360,140 L440,150 L520,160",
      weightPoints: [ { cx: 40, cy: 100 }, { cx: 120, cy: 110 }, { cx: 200, cy: 120 }, { cx: 280, cy: 130 }, { cx: 360, cy: 140 }, { cx: 440, cy: 150 }, { cx: 520, cy: 160 }, ],
      calories: "M40,110 L120,105 L200,95 L280,85 L360,75 L440,65 L520,55",
      caloriesPoints: [ { cx: 40, cy: 110 }, { cx: 120, cy: 105 }, { cx: 200, cy: 95 }, { cx: 280, cy: 85 }, { cx: 360, cy: 75 }, { cx: 440, cy: 65 }, { cx: 520, cy: 55 }, ],
      xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    week: {
      steps: "M40,160 L120,140 L200,100 L280,80 L360,60 L440,70 L520,50",
      stepsPoints: [ { cx: 40, cy: 160 }, { cx: 120, cy: 140 }, { cx: 200, cy: 100 }, { cx: 280, cy: 80 }, { cx: 360, cy: 60 }, { cx: 440, cy: 70 }, { cx: 520, cy: 50 }, ],
      sleep: "M40,180 L120,170 L200,150 L280,130 L360,110 L440,100 L520,80",
      sleepPoints: [ { cx: 40, cy: 180 }, { cx: 120, cy: 170 }, { cx: 200, cy: 150 }, { cx: 280, cy: 130 }, { cx: 360, cy: 110 }, { cx: 440, cy: 100 }, { cx: 520, cy: 80 }, ],
      weight: "M40,120 L120,125 L200,130 L280,135 L360,140 L440,145 L520,150",
      weightPoints: [ { cx: 40, cy: 120 }, { cx: 120, cy: 125 }, { cx: 200, cy: 130 }, { cx: 280, cy: 135 }, { cx: 360, cy: 140 }, { cx: 440, cy: 145 }, { cx: 520, cy: 150 }, ],
      calories: "M40,140 L120,130 L200,110 L280,90 L360,80 L440,75 L520,60",
      caloriesPoints: [ { cx: 40, cy: 140 }, { cx: 120, cy: 130 }, { cx: 200, cy: 110 }, { cx: 280, cy: 90 }, { cx: 360, cy: 80 }, { cx: 440, cy: 75 }, { cx: 520, cy: 60 }, ],
      xLabels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"],
    },
    month: {
      steps: "M40,140 L120,120 L200,90 L280,70 L360,50 L440,40 L520,30",
      stepsPoints: [ { cx: 40, cy: 140 }, { cx: 120, cy: 120 }, { cx: 200, cy: 90 }, { cx: 280, cy: 70 }, { cx: 360, cy: 50 }, { cx: 440, cy: 40 }, { cx: 520, cy: 30 }, ],
      sleep: "M40,160 L120,150 L200,140 L280,120 L360,100 L440,90 L520,70",
      sleepPoints: [ { cx: 40, cy: 160 }, { cx: 120, cy: 150 }, { cx: 200, cy: 140 }, { cx: 280, cy: 120 }, { cx: 360, cy: 100 }, { cx: 440, cy: 90 }, { cx: 520, cy: 70 }, ],
      weight: "M40,130 L120,125 L200,120 L280,115 L360,110 L440,105 L520,100",
      weightPoints: [ { cx: 40, cy: 130 }, { cx: 120, cy: 125 }, { cx: 200, cy: 120 }, { cx: 280, cy: 115 }, { cx: 360, cy: 110 }, { cx: 440, cy: 105 }, { cx: 520, cy: 100 }, ],
      calories: "M40,120 L120,110 L200,100 L280,80 L360,70 L440,60 L520,50",
      caloriesPoints: [ { cx: 40, cy: 120 }, { cx: 120, cy: 110 }, { cx: 200, cy: 100 }, { cx: 280, cy: 80 }, { cx: 360, cy: 70 }, { cx: 440, cy: 60 }, { cx: 520, cy: 50 }, ],
      xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },
  };

  const data = chartData[timePeriod];

  return (
    <div className="h-64 relative">
      <svg width="100%" height="100%" viewBox="0 0 600 240" className="overflow-visible">
        <g className="text-gray-200 dark:text-gray-700">
          <line x1="0" y1="0" x2="600" y2="0" stroke="currentColor" strokeDasharray="4" />
          <line x1="0" y1="60" x2="600" y2="60" stroke="currentColor" strokeDasharray="4" />
          <line x1="0" y1="120" x2="600" y2="120" stroke="currentColor" strokeDasharray="4" />
          <line x1="0" y1="180" x2="600" y2="180" stroke="currentColor" strokeDasharray="4" />
          <line x1="0" y1="240" x2="600" y2="240" stroke="currentColor" strokeDasharray="4" />
        </g>
        <g className="text-xs text-gray-500 dark:text-gray-400 fill-current">
          {data.xLabels.map((label, index) => (
            <text key={index} x={40 + index * 80} y="260" textAnchor="middle">
              {label}
            </text>
          ))}
        </g>
        <path
          d={data.steps}
          fill="none"
          stroke="currentColor" // Use currentColor
          className={getTailwindColorClass("#22c55e")} // Apply color class
          strokeWidth="3"
          strokeLinecap="round"
        />
        <g className={getTailwindColorClass("#22c55e")}> {/* Apply color class to parent for circles */}
          {data.stepsPoints.map((point, index) => (
            <circle key={index} cx={point.cx} cy={point.cy} r="4" fill="currentColor" />
          ))}
        </g>
        <path d={data.sleep} fill="none" stroke="currentColor" className={getTailwindColorClass("#a855f7")} strokeWidth="3" strokeLinecap="round" />
        <g className={getTailwindColorClass("#a855f7")}>
          {data.sleepPoints.map((point, index) => (
            <circle key={index} cx={point.cx} cy={point.cy} r="4" fill="currentColor" />
          ))}
        </g>
        <path
          d={data.weight}
          fill="none"
          stroke="currentColor"
          className={getTailwindColorClass("#eab308")}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="5,5"
        />
        <g className={getTailwindColorClass("#eab308")}>
          {data.weightPoints.map((point, index) => (
            <circle key={index} cx={point.cx} cy={point.cy} r="4" fill="currentColor" />
          ))}
        </g>
        <path
          d={data.calories}
          fill="none"
          stroke="currentColor"
          className={getTailwindColorClass("#f97316")}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <g className={getTailwindColorClass("#f97316")}>
          {data.caloriesPoints.map((point, index) => (
            <circle key={index} cx={point.cx} cy={point.cy} r="4" fill="currentColor" />
          ))}
        </g>
      </svg>
    </div>
  );
});
WeeklyProgressChart.displayName = "WeeklyProgressChart";


const BeforeVersion = memo(() => {
  // ... (Keep BeforeVersion mostly as is, as it represents an "old" style)
  // You *could* replace its buttons with your project's Button if you want to test component flexibility
  // but for a "before" view, the original raw HTML+Tailwind is probably fine to emphasize the contrast.
  // For brevity, I'll skip pasting the full BeforeVersion code here. Assume it's the same as provided.
  return (
  <div className="w-full bg-gray-200 dark:bg-gray-800 p-4 font-mono">
    <div className="bg-blue-900 text-white p-2 text-center text-sm font-bold mb-2">HEALTH TRACK APP v1.2</div>
    <div className="grid grid-cols-2 gap-2 mb-2">
      <div className="bg-white dark:bg-gray-700 p-2 border-2 border-gray-400">
        <div className="text-xs text-center font-bold text-gray-700 dark:text-gray-300 mb-1">DAILY STEPS</div>
        <table className="w-full border-collapse border border-gray-400 text-xs">
          <thead><tr className="bg-gray-300 dark:bg-gray-600"><th className="border border-gray-400 p-1">Date</th><th className="border border-gray-400 p-1">Steps</th><th className="border border-gray-400 p-1">Target</th></tr></thead>
          <tbody><tr><td className="border border-gray-400 p-1">03/14</td><td className="border border-gray-400 p-1">5,231</td><td className="border border-gray-400 p-1">10,000</td></tr><tr className="bg-gray-100 dark:bg-gray-600"><td className="border border-gray-400 p-1">03/13</td><td className="border border-gray-400 p-1">4,892</td><td className="border border-gray-400 p-1">10,000</td></tr><tr><td className="border border-gray-400 p-1">03/12</td><td className="border border-gray-400 p-1">5,677</td><td className="border border-gray-400 p-1">10,000</td></tr></tbody>
        </table>
      </div>
      <div className="bg-white dark:bg-gray-700 p-2 border-2 border-gray-400">
        <div className="text-xs text-center font-bold text-gray-700 dark:text-gray-300 mb-1">CALORIE INTAKE/BURN</div>
        <table className="w-full border-collapse border border-gray-400 text-xs">
          <thead><tr className="bg-gray-300 dark:bg-gray-600"><th className="border border-gray-400 p-1">Date</th><th className="border border-gray-400 p-1">In</th><th className="border border-gray-400 p-1">Out</th><th className="border border-gray-400 p-1">Net</th></tr></thead>
          <tbody><tr><td className="border border-gray-400 p-1">03/14</td><td className="border border-gray-400 p-1">2,450</td><td className="border border-gray-400 p-1">842</td><td className="border border-gray-400 p-1">+1,608</td></tr><tr className="bg-gray-100 dark:bg-gray-600"><td className="border border-gray-400 p-1">03/13</td><td className="border border-gray-400 p-1">2,310</td><td className="border border-gray-400 p-1">756</td><td className="border border-gray-400 p-1">+1,554</td></tr></tbody>
        </table>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-2 mb-2">
      <div className="bg-white dark:bg-gray-700 p-2 border-2 border-gray-400">
        <div className="text-xs text-center font-bold text-gray-700 dark:text-gray-300 mb-1">WEIGHT LOG (KG)</div>
        <div className="flex justify-between items-center"><button className="bg-gray-300 text-xs px-1 border border-gray-500">◀</button><div className="text-center"><div className="text-2xl font-bold">84.0</div><div className="text-xs text-red-600">▲ 0.5 kg</div></div><button className="bg-gray-300 text-xs px-1 border border-gray-500">▶</button></div>
        <div className="mt-2 h-8 bg-gray-300 dark:bg-gray-600 relative"><div className="absolute inset-0 flex items-center justify-center text-xs">Click to view weight chart</div></div>
      </div>
      <div className="bg-white dark:bg-gray-700 p-2 border-2 border-gray-400">
        <div className="text-xs text-center font-bold text-gray-700 dark:text-gray-300 mb-1">SLEEP MONITOR</div>
        <div className="flex justify-between items-center"><button className="bg-gray-300 text-xs px-1 border border-gray-500">◀</button><div className="text-center"><div className="text-2xl font-bold">6:12</div><div className="text-xs text-red-600">▼ 0:18 hrs</div></div><button className="bg-gray-300 text-xs px-1 border border-gray-500">▶</button></div>
        <div className="mt-2 h-8 bg-gray-300 dark:bg-gray-600 relative"><div className="absolute inset-0 flex items-center justify-center text-xs">Click to view sleep chart</div></div>
      </div>
    </div>
    <div className="grid grid-cols-1 gap-2">
      <div className="bg-white dark:bg-gray-700 p-2 border-2 border-gray-400">
        <div className="text-xs text-center font-bold text-gray-700 dark:text-gray-300 mb-1">DAILY SCHEDULE</div>
        <div className="text-xs"><div className="flex justify-between border-b border-gray-300 py-1"><span>07:00 AM</span><span className="font-bold">Morning Walk</span><span className="text-red-600">MISSED</span></div><div className="flex justify-between border-b border-gray-300 py-1"><span>09:00 PM</span><span className="font-bold">Take Medication</span><span className="text-gray-500">PENDING</span></div></div>
        <div className="flex justify-between mt-2"><button className="bg-gray-300 text-xs p-1 border border-gray-500">Add Event</button><button className="bg-gray-300 text-xs p-1 border border-gray-500">View All</button><button className="bg-gray-300 text-xs p-1 border border-gray-500">Settings</button></div>
      </div>
    </div>
    <div className="flex justify-between mt-2 text-xs"><button className="bg-blue-800 text-white px-2 py-1">EXPORT DATA</button><button className="bg-blue-800 text-white px-2 py-1">PRINT REPORT</button><button className="bg-red-800 text-white px-2 py-1">SYSTEM HELP</button></div>
    <div className="text-xs text-center mt-2 text-gray-600 dark:text-gray-400">Last sync: 03/14/2025 10:42 AM | Battery: 68% | v1.2.34</div>
  </div>
  );
});
BeforeVersion.displayName = "BeforeVersion";


const AfterVersion = memo(() => {
  const [timePeriod, setTimePeriod] = useState<"today" | "week" | "month">("today");
  const timePeriodsData = { /* ... same data as provided ... */ 
    today: { steps: "8,742", stepsPercentage: 87, stepsChange: "12% from yesterday", calories: "1,842", caloriesPercentage: 65, caloriesChange: "608 net today", weight: "74", weightPercentage: 80, weightChange: "0.5 kg this week", sleep: "6:12", sleepPercentage: 77, sleepChange: "18 min less than yesterday", },
    week: { steps: "52,390", stepsPercentage: 75, stepsChange: "8% from last week", calories: "12,450", caloriesPercentage: 70, caloriesChange: "3,200 net this week", weight: "74", weightPercentage: 80, weightChange: "1.2 kg this month", sleep: "6:45", sleepPercentage: 84, sleepChange: "30 min more than last week", },
    month: { steps: "210,580", stepsPercentage: 82, stepsChange: "15% from last month", calories: "48,900", caloriesPercentage: 72, caloriesChange: "12,500 net this month", weight: "74", weightPercentage: 80, weightChange: "2.5 kg in 2 months", sleep: "6:50", sleepPercentage: 85, sleepChange: "40 min more than last month", },
  };
  const data = timePeriodsData[timePeriod];

  const StatCard = ({ icon, iconColor, bgColor, barColor, textColor, title, value, unit, change, percentage, target, }: { icon: React.ReactNode; iconColor: string; bgColor: string; barColor: string; textColor: string; title: string; value: string; unit?: string; change: string; percentage: number; target: string; }) => (
    <div className={`${bgColor} p-3 rounded-lg shadow`}> {/* Added shadow, adjusted padding */}
      <div className="flex items-center gap-2 mb-1"> {/* Adjusted gap and margin */}
        <div className={`${iconColor} p-1.5 rounded-full`}>{icon}</div> {/* Adjusted padding */}
        <span className="text-sm font-medium text-muted-foreground">{title}</span> {/* Adjusted font size/weight */}
      </div>
      <div className={`text-xl font-bold ${textColor}`}> {/* Adjusted font size */}
        {value} {unit && <span className="text-xs font-normal">{unit}</span>}
      </div>
      <div className={`text-xs mt-1 flex items-center ${textColor}`}> {/* Adjusted margin/font size */}
        {/* Consider dynamic up/down arrow based on change value if available */}
        <span className="inline-block mr-1">↑</span> {change}
      </div>
      <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5"> {/* Adjusted margin/height */}
        <div className={`${barColor} h-1.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
      <div className="text-xs text-muted-foreground mt-1"> {/* Adjusted margin */}
        {percentage}% of {target}
      </div>
    </div>
  );

  return (
    // Use Card component for the main container if desired, or just a div
    <div className="w-full bg-background text-foreground p-4 md:p-6 rounded-lg shadow-xl"> {/* Using theme colors, added rounded-lg, shadow-xl */}
      <div className="mb-6"> {/* Increased margin */}
        {/* <H2 className="text-2xl font-bold text-left text-primary">Health Dashboard</H2> */}
        <h2 className="text-2xl font-bold text-left text-primary">Health Dashboard</h2> {/* Use H2 if available */}
        <p className="text-muted-foreground text-left text-sm mt-1">Welcome back! You're making great progress.</p> {/* Use TextP if available */}
      </div>
      
      <div className="flex flex-wrap items-center justify-start gap-2 mt-4 mb-6"> {/* justify-start */}
        {(["today", "week", "month"] as const).map((period) => (
          <Button
            key={period}
            variant={timePeriod === period ? "default" : "outline"}
            size="sm" // Or a custom smaller size if needed
            onClick={() => setTimePeriod(period)}
            className="rounded-full capitalize px-4 text-xs h-8" // Adjust styling for rounded-full look
          >
            {period}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"> {/* Responsive grid */}
        <StatCard icon={<Activity size={14} />} iconColor="bg-green-500/20 text-green-600 dark:text-green-400" bgColor="bg-green-500/10" barColor="bg-green-500" textColor="text-green-600 dark:text-green-400" title="Steps" value={data.steps} change={data.stepsChange} percentage={data.stepsPercentage} target="goal (10k)" />
        <StatCard icon={<Flame size={14} />} iconColor="bg-orange-500/20 text-orange-600 dark:text-orange-400" bgColor="bg-orange-500/10" barColor="bg-orange-500" textColor="text-orange-600 dark:text-orange-400" title="Calories" value={data.calories} change={data.caloriesChange} percentage={data.caloriesPercentage} target="target (2.4k)" />
        <StatCard icon={<Award size={14} />} iconColor="bg-yellow-500/20 text-yellow-600 dark:text-yellow-400" bgColor="bg-yellow-500/10" barColor="bg-yellow-500" textColor="text-yellow-600 dark:text-yellow-400" title="Weight" value={data.weight} unit="kg" change={data.weightChange} percentage={data.weightPercentage} target="goal (70kg)" />
        <StatCard icon={<Droplet size={14} />} iconColor="bg-purple-500/20 text-purple-600 dark:text-purple-400" bgColor="bg-purple-500/10" barColor="bg-purple-500" textColor="text-purple-600 dark:text-purple-400" title="Sleep" value={data.sleep} unit="hrs" change={data.sleepChange} percentage={data.sleepPercentage} target="rec. (8hrs)" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-2 shadow-md">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg"> {/* Adjusted font size */}
                {timePeriod === "today" ? "Daily" : timePeriod === "week" ? "Weekly" : "Monthly"} Progress
              </CardTitle>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground"> {/* Adjusted gap */}
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-500"></span> Steps</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Sleep</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span> Weight</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> Calories</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <WeeklyProgressChart timePeriod={timePeriod} />
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Today&apos;s Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Schedule Items - Minor style tweaks for consistency */}
            {[
              { icon: <Calendar size={18} />, title: "Morning Walk", time: "7:00 AM", status: "Completed ✓", statusColor: "text-green-500" },
              { icon: <Calendar size={18} />, title: "Yoga Session", time: "6:00 PM", status: "In 4 hours", statusColor: "text-muted-foreground" },
              { icon: <Calendar size={18} />, title: "Medication", time: "9:00 PM", status: "In 7 hours", statusColor: "text-muted-foreground" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="bg-primary/10 text-primary p-2 rounded-full flex items-center justify-center mt-0.5"> {/* Use primary color */}
                  {item.icon}
                </div>
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-muted-foreground">{item.time}</div>
                  <div className={`text-xs mt-0.5 ${item.statusColor}`}>{item.status}</div>
                </div>
              </div>
            ))}
             <Button variant="outline" className="w-full mt-4">Add New Activity</Button>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-md mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
                <div className="bg-primary text-primary-foreground p-1.5 rounded-full"> {/* Use primary theme */}
                    <Award size={16} />
                </div>
                <CardTitle className="text-lg text-primary">Weekly Achievements</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
                {value: "3 Days", label: "Step Goal Streak"},
                {value: "5 Days", label: "Sleep Goal Streak"},
                {value: "-2.5 kg", label: "Monthly Progress"},
                {value: "+15%", label: "Activity Increase"},
            ].map((ach, idx) => (
                <div key={idx} className="bg-card border p-3 rounded-lg text-center shadow-sm"> {/* Use card bg, add border */}
                    <div className="text-lg font-bold">{ach.value}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{ach.label}</div>
                </div>
            ))}
          </CardContent>
      </Card>

      <div className="flex flex-wrap justify-center sm:justify-end items-center gap-3"> {/* Centered on small, end on larger */}
        {[
          { icon: <Share className="h-4 w-4" />, label: "Share Data" },
          { icon: <Download className="h-4 w-4" />, label: "Export Data" },
          { icon: <Printer className="h-4 w-4" />, label: "Print Report" },
        ].map((btn, idx) => (
          <Button key={idx} variant="outline" size="sm">
            {btn.icon}
            <span className="ml-2">{btn.label}</span>
          </Button>
        ))}
      </div>

      <div className="text-xs text-center mt-6 text-muted-foreground">
        Last sync: 03/14/2025 10:42 AM | Battery: 68% | v2.4.0
      </div>
    </div>
  );
});
AfterVersion.displayName = "AfterVersion";


const ComparisonSlider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [showHint, setShowHint] = useState(true);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault(); // Prevent text selection
    setIsDragging(true);
    setShowHint(false);
  };

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setPosition((prev) => Math.max(0, prev - 2)); // Smaller step for keyboard
    } else if (e.key === "ArrowRight") {
      setPosition((prev) => Math.min(100, prev + 2)); // Smaller step for keyboard
    }
    setShowHint(false);
  };

  const updateSliderPosition = useCallback((clientX: number) => {
    if (containerRef.current) {
      const { left, width } = containerRef.current.getBoundingClientRect();
      const newPosition = ((clientX - left) / width) * 100;
      setPosition(Math.min(100, Math.max(0, newPosition)));
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
      if (isDragging) updateSliderPosition(e.clientX);
    },[isDragging, updateSliderPosition]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
      if (isDragging && e.touches[0]) updateSliderPosition(e.touches[0].clientX);
    },[isDragging, updateSliderPosition]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleMouseUp]);

  useEffect(() => {
    if(showHint) {
        const timer = setTimeout(() => setShowHint(false), 5000);
        return () => clearTimeout(timer);
    }
  }, [showHint]);

  return (
    <div className="flex flex-col items-center"> {/* Centering the slider itself if it's not full width */}
      <div
        className="relative overflow-hidden border border-border rounded-lg w-full max-w-5xl h-[700px] sm:h-[800px] md:h-[900px]" // Added max-width, rounded-lg, responsive height
        ref={containerRef}
      >
        <div className="absolute top-0 left-0 w-full h-full"> {/* Ensure BeforeVersion fills */}
          <BeforeVersion />
        </div>
        <div
          className="absolute top-0 left-0 h-full overflow-hidden"
          style={{ width: `${position}%` }}
        >
          {/* This inner div ensures AfterVersion content doesn't shrink with the clip path.
              It needs a width that allows AfterVersion to render at its intended size.
              Setting it to the container's potential max-width is a safe bet. */}
          <div className="w-[1024px] max-w-5xl h-full"> {/* Match approx max-width of container */}
            <AfterVersion />
          </div>
        </div>
        <div
          className="absolute top-0 bottom-0 w-1.5 bg-primary cursor-ew-resize group" // Thicker line, added group
          style={{ left: `calc(${position}% - 3px)` }} // Offset by half its width
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          tabIndex={0}
          role="slider"
          aria-valuenow={position}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Comparison slider"
          onKeyDown={handleKeyDown}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg transition-transform duration-150 group-hover:scale-110"> {/* Larger handle, themed colors */}
            <div className="flex">
              <ChevronLeft size={20} />
              <ChevronRight size={20} />
            </div>
          </div>
        </div>
        {showHint && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white z-10 animate-pulse">
            <div className="flex items-center gap-3 text-xl font-semibold p-4 bg-black/30 rounded-lg">
              <MousePointerClick size={28} />
              <span>Drag or use arrow keys to compare</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


// Renamed export to avoid conflict with page file name
export const HealthTrackerComparisonView = () => {
  return (
    // The main container for the comparison view, could add padding/margins if needed
    // This component is now focused solely on rendering the slider.
    <ComparisonSlider />
  );
};

// No need for memo on the default export of the page component usually.
// If HealthTrackerComparisonView is complex and re-renders unnecessarily, memo can be applied.
// export default memo(HealthTrackerComparisonView); // You can memo here if needed