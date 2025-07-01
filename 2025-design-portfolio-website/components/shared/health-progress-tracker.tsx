"use client"

import type React from "react"

import { useState, useRef, useEffect, memo, useCallback } from "react"
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
} from "lucide-react"

// Weekly progress chart component
const WeeklyProgressChart = memo(({ timePeriod }: { timePeriod: "today" | "week" | "month" }) => {
  // Different chart data for each time period
  const chartData = {
    today: {
      steps: "M40,180 L120,160 L200,140 L280,120 L360,100 L440,80 L520,60",
      stepsPoints: [
        { cx: 40, cy: 180 },
        { cx: 120, cy: 160 },
        { cx: 200, cy: 140 },
        { cx: 280, cy: 120 },
        { cx: 360, cy: 100 },
        { cx: 440, cy: 80 },
        { cx: 520, cy: 60 },
      ],
      sleep: "M40,200 L120,190 L200,170 L280,150 L360,130 L440,110 L520,90",
      sleepPoints: [
        { cx: 40, cy: 200 },
        { cx: 120, cy: 190 },
        { cx: 200, cy: 170 },
        { cx: 280, cy: 150 },
        { cx: 360, cy: 130 },
        { cx: 440, cy: 110 },
        { cx: 520, cy: 90 },
      ],
      weight: "M40,100 L120,110 L200,120 L280,130 L360,140 L440,150 L520,160",
      weightPoints: [
        { cx: 40, cy: 100 },
        { cx: 120, cy: 110 },
        { cx: 200, cy: 120 },
        { cx: 280, cy: 130 },
        { cx: 360, cy: 140 },
        { cx: 440, cy: 150 },
        { cx: 520, cy: 160 },
      ],
      calories: "M40,110 L120,105 L200,95 L280,85 L360,75 L440,65 L520,55",
      caloriesPoints: [
        { cx: 40, cy: 110 },
        { cx: 120, cy: 105 },
        { cx: 200, cy: 95 },
        { cx: 280, cy: 85 },
        { cx: 360, cy: 75 },
        { cx: 440, cy: 65 },
        { cx: 520, cy: 55 },
      ],
      xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    week: {
      steps: "M40,160 L120,140 L200,100 L280,80 L360,60 L440,70 L520,50",
      stepsPoints: [
        { cx: 40, cy: 160 },
        { cx: 120, cy: 140 },
        { cx: 200, cy: 100 },
        { cx: 280, cy: 80 },
        { cx: 360, cy: 60 },
        { cx: 440, cy: 70 },
        { cx: 520, cy: 50 },
      ],
      sleep: "M40,180 L120,170 L200,150 L280,130 L360,110 L440,100 L520,80",
      sleepPoints: [
        { cx: 40, cy: 180 },
        { cx: 120, cy: 170 },
        { cx: 200, cy: 150 },
        { cx: 280, cy: 130 },
        { cx: 360, cy: 110 },
        { cx: 440, cy: 100 },
        { cx: 520, cy: 80 },
      ],
      weight: "M40,120 L120,125 L200,130 L280,135 L360,140 L440,145 L520,150",
      weightPoints: [
        { cx: 40, cy: 120 },
        { cx: 120, cy: 125 },
        { cx: 200, cy: 130 },
        { cx: 280, cy: 135 },
        { cx: 360, cy: 140 },
        { cx: 440, cy: 145 },
        { cx: 520, cy: 150 },
      ],
      calories: "M40,140 L120,130 L200,110 L280,90 L360,80 L440,75 L520,60",
      caloriesPoints: [
        { cx: 40, cy: 140 },
        { cx: 120, cy: 130 },
        { cx: 200, cy: 110 },
        { cx: 280, cy: 90 },
        { cx: 360, cy: 80 },
        { cx: 440, cy: 75 },
        { cx: 520, cy: 60 },
      ],
      xLabels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"],
    },
    month: {
      steps: "M40,140 L120,120 L200,90 L280,70 L360,50 L440,40 L520,30",
      stepsPoints: [
        { cx: 40, cy: 140 },
        { cx: 120, cy: 120 },
        { cx: 200, cy: 90 },
        { cx: 280, cy: 70 },
        { cx: 360, cy: 50 },
        { cx: 440, cy: 40 },
        { cx: 520, cy: 30 },
      ],
      sleep: "M40,160 L120,150 L200,140 L280,120 L360,100 L440,90 L520,70",
      sleepPoints: [
        { cx: 40, cy: 160 },
        { cx: 120, cy: 150 },
        { cx: 200, cy: 140 },
        { cx: 280, cy: 120 },
        { cx: 360, cy: 100 },
        { cx: 440, cy: 90 },
        { cx: 520, cy: 70 },
      ],
      weight: "M40,130 L120,125 L200,120 L280,115 L360,110 L440,105 L520,100",
      weightPoints: [
        { cx: 40, cy: 130 },
        { cx: 120, cy: 125 },
        { cx: 200, cy: 120 },
        { cx: 280, cy: 115 },
        { cx: 360, cy: 110 },
        { cx: 440, cy: 105 },
        { cx: 520, cy: 100 },
      ],
      calories: "M40,120 L120,110 L200,100 L280,80 L360,70 L440,60 L520,50",
      caloriesPoints: [
        { cx: 40, cy: 120 },
        { cx: 120, cy: 110 },
        { cx: 200, cy: 100 },
        { cx: 280, cy: 80 },
        { cx: 360, cy: 70 },
        { cx: 440, cy: 60 },
        { cx: 520, cy: 50 },
      ],
      xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },
  }

  const data = chartData[timePeriod]

  return (
    <div className="h-64 relative">
      <svg width="100%" height="100%" viewBox="0 0 600 240" className="overflow-visible">
        {/* Grid lines */}
        <g className="text-gray-200 dark:text-gray-700">
          <line x1="0" y1="0" x2="600" y2="0" stroke="currentColor" strokeDasharray="4" />
          <line x1="0" y1="60" x2="600" y2="60" stroke="currentColor" strokeDasharray="4" />
          <line x1="0" y1="120" x2="600" y2="120" stroke="currentColor" strokeDasharray="4" />
          <line x1="0" y1="180" x2="600" y2="180" stroke="currentColor" strokeDasharray="4" />
          <line x1="0" y1="240" x2="600" y2="240" stroke="currentColor" strokeDasharray="4" />
        </g>

        {/* X-axis labels */}
        <g className="text-xs text-gray-500 dark:text-gray-400 fill-current">
          {data.xLabels.map((label, index) => (
            <text key={index} x={40 + index * 80} y="260" textAnchor="middle">
              {label}
            </text>
          ))}
        </g>

        {/* Steps line (green color) */}
        <path
          d={data.steps}
          fill="none"
          stroke="#22c55e" // green-500
          strokeWidth="3"
          strokeLinecap="round"
        />
        <g>
          {data.stepsPoints.map((point, index) => (
            <circle key={index} cx={point.cx} cy={point.cy} r="4" fill="#22c55e" />
          ))}
        </g>

        {/* Sleep line (purple) */}
        <path d={data.sleep} fill="none" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" />
        <g>
          {data.sleepPoints.map((point, index) => (
            <circle key={index} cx={point.cx} cy={point.cy} r="4" fill="#a855f7" />
          ))}
        </g>

        {/* Weight line (yellow) */}
        <path
          d={data.weight}
          fill="none"
          stroke="#eab308"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="5,5"
        />
        <g>
          {data.weightPoints.map((point, index) => (
            <circle key={index} cx={point.cx} cy={point.cy} r="4" fill="#eab308" />
          ))}
        </g>

        {/* Calories line (orange) */}
        <path
          d={data.calories}
          fill="none"
          stroke="#f97316" // orange-500
          strokeWidth="3"
          strokeLinecap="round"
        />
        <g>
          {data.caloriesPoints.map((point, index) => (
            <circle key={index} cx={point.cx} cy={point.cy} r="4" fill="#f97316" />
          ))}
        </g>
      </svg>
    </div>
  )
})

WeeklyProgressChart.displayName = "WeeklyProgressChart"

// Before version - truly outdated, cluttered interface
const BeforeVersion = memo(() => {
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-800 p-4 font-mono">
      <div className="bg-blue-900 text-white p-2 text-center text-sm font-bold mb-2">HEALTH TRACK APP v1.2</div>

      <div className="grid grid-cols-2 gap-2 mb-2">
        <div className="bg-white dark:bg-gray-700 p-2 border-2 border-gray-400">
          <div className="text-xs text-center font-bold text-gray-700 dark:text-gray-300 mb-1">DAILY STEPS</div>
          <table className="w-full border-collapse border border-gray-400 text-xs">
            <thead>
              <tr className="bg-gray-300 dark:bg-gray-600">
                <th className="border border-gray-400 p-1">Date</th>
                <th className="border border-gray-400 p-1">Steps</th>
                <th className="border border-gray-400 p-1">Target</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 p-1">03/14</td>
                <td className="border border-gray-400 p-1">5,231</td>
                <td className="border border-gray-400 p-1">10,000</td>
              </tr>
              <tr className="bg-gray-100 dark:bg-gray-600">
                <td className="border border-gray-400 p-1">03/13</td>
                <td className="border border-gray-400 p-1">4,892</td>
                <td className="border border-gray-400 p-1">10,000</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-1">03/12</td>
                <td className="border border-gray-400 p-1">5,677</td>
                <td className="border border-gray-400 p-1">10,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-white dark:bg-gray-700 p-2 border-2 border-gray-400">
          <div className="text-xs text-center font-bold text-gray-700 dark:text-gray-300 mb-1">CALORIE INTAKE/BURN</div>
          <table className="w-full border-collapse border border-gray-400 text-xs">
            <thead>
              <tr className="bg-gray-300 dark:bg-gray-600">
                <th className="border border-gray-400 p-1">Date</th>
                <th className="border border-gray-400 p-1">In</th>
                <th className="border border-gray-400 p-1">Out</th>
                <th className="border border-gray-400 p-1">Net</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 p-1">03/14</td>
                <td className="border border-gray-400 p-1">2,450</td>
                <td className="border border-gray-400 p-1">842</td>
                <td className="border border-gray-400 p-1">+1,608</td>
              </tr>
              <tr className="bg-gray-100 dark:bg-gray-600">
                <td className="border border-gray-400 p-1">03/13</td>
                <td className="border border-gray-400 p-1">2,310</td>
                <td className="border border-gray-400 p-1">756</td>
                <td className="border border-gray-400 p-1">+1,554</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-2">
        <div className="bg-white dark:bg-gray-700 p-2 border-2 border-gray-400">
          <div className="text-xs text-center font-bold text-gray-700 dark:text-gray-300 mb-1">WEIGHT LOG (KG)</div>
          <div className="flex justify-between items-center">
            <button className="bg-gray-300 text-xs px-1 border border-gray-500">◀</button>
            <div className="text-center">
              <div className="text-2xl font-bold">84.0</div>
              <div className="text-xs text-red-600">▲ 0.5 kg</div>
            </div>
            <button className="bg-gray-300 text-xs px-1 border border-gray-500">▶</button>
          </div>
          <div className="mt-2 h-8 bg-gray-300 dark:bg-gray-600 relative">
            <div className="absolute inset-0 flex items-center justify-center text-xs">Click to view weight chart</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 p-2 border-2 border-gray-400">
          <div className="text-xs text-center font-bold text-gray-700 dark:text-gray-300 mb-1">SLEEP MONITOR</div>
          <div className="flex justify-between items-center">
            <button className="bg-gray-300 text-xs px-1 border border-gray-500">◀</button>
            <div className="text-center">
              <div className="text-2xl font-bold">6:12</div>
              <div className="text-xs text-red-600">▼ 0:18 hrs</div>
            </div>
            <button className="bg-gray-300 text-xs px-1 border border-gray-500">▶</button>
          </div>
          <div className="mt-2 h-8 bg-gray-300 dark:bg-gray-600 relative">
            <div className="absolute inset-0 flex items-center justify-center text-xs">Click to view sleep chart</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <div className="bg-white dark:bg-gray-700 p-2 border-2 border-gray-400">
          <div className="text-xs text-center font-bold text-gray-700 dark:text-gray-300 mb-1">DAILY SCHEDULE</div>
          <div className="text-xs">
            <div className="flex justify-between border-b border-gray-300 py-1">
              <span>07:00 AM</span>
              <span className="font-bold">Morning Walk</span>
              <span className="text-red-600">MISSED</span>
            </div>
            <div className="flex justify-between border-b border-gray-300 py-1">
              <span>09:00 PM</span>
              <span className="font-bold">Take Medication</span>
              <span className="text-gray-500">PENDING</span>
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <button className="bg-gray-300 text-xs p-1 border border-gray-500">Add Event</button>
            <button className="bg-gray-300 text-xs p-1 border border-gray-500">View All</button>
            <button className="bg-gray-300 text-xs p-1 border border-gray-500">Settings</button>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-2 text-xs">
        <button className="bg-blue-800 text-white px-2 py-1">EXPORT DATA</button>
        <button className="bg-blue-800 text-white px-2 py-1">PRINT REPORT</button>
        <button className="bg-red-800 text-white px-2 py-1">SYSTEM HELP</button>
      </div>

      <div className="text-xs text-center mt-2 text-gray-600 dark:text-gray-400">
        Last sync: 03/14/2025 10:42 AM | Battery: 68% | v1.2.34
      </div>
    </div>
  )
})

BeforeVersion.displayName = "BeforeVersion"

// After version - modern, user-friendly interface
const AfterVersion = memo(() => {
  const [timePeriod, setTimePeriod] = useState<"today" | "week" | "month">("today")

  // Sample data for different time periods
  const timePeriodsData = {
    today: {
      steps: "8,742",
      stepsPercentage: 87,
      stepsChange: "12% from yesterday",
      calories: "1,842",
      caloriesPercentage: 65,
      caloriesChange: "608 net today",
      weight: "74",
      weightPercentage: 80,
      weightChange: "0.5 kg this week",
      sleep: "6:12",
      sleepPercentage: 77,
      sleepChange: "18 min less than yesterday",
    },
    week: {
      steps: "52,390",
      stepsPercentage: 75,
      stepsChange: "8% from last week",
      calories: "12,450",
      caloriesPercentage: 70,
      caloriesChange: "3,200 net this week",
      weight: "74",
      weightPercentage: 80,
      weightChange: "1.2 kg this month",
      sleep: "6:45",
      sleepPercentage: 84,
      sleepChange: "30 min more than last week",
    },
    month: {
      steps: "210,580",
      stepsPercentage: 82,
      stepsChange: "15% from last month",
      calories: "48,900",
      caloriesPercentage: 72,
      caloriesChange: "12,500 net this month",
      weight: "74",
      weightPercentage: 80,
      weightChange: "2.5 kg in 2 months",
      sleep: "6:50",
      sleepPercentage: 85,
      sleepChange: "40 min more than last month",
    },
  }

  const data = timePeriodsData[timePeriod]

  // Create a StatCard component for consistent rendering
  const StatCard = ({
    icon,
    iconColor,
    bgColor,
    barColor,
    textColor,
    title,
    value,
    unit,
    change,
    percentage,
    target,
  }: {
    icon: React.ReactNode
    iconColor: string
    bgColor: string
    barColor: string
    textColor: string
    title: string
    value: string
    unit?: string
    change: string
    percentage: number
    target: string
  }) => (
    <div className={`${bgColor} p-2 rounded-lg`}>
      <div className="flex items-center gap-1 mb-0.5">
        <div className={`${iconColor} p-1 rounded-full`}>{icon}</div>
        <span className="text-xs text-muted-foreground">{title}</span>
      </div>
      <div className={`text-base font-bold ${textColor}`}>
        {value} {unit && <span className="text-xs">{unit}</span>}
      </div>
      <div className={`text-[10px] mt-0.5 flex items-center ${textColor}`}>
        <span className="inline-block mr-0.5">↑</span> {change}
      </div>
      <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
        <div className={`${barColor} h-1 rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
      <div className="text-[10px] text-muted-foreground mt-0.5">
        {percentage}% of {target}
      </div>
    </div>
  )

  return (
    <div className="w-full bg-white dark:bg-gray-900 p-4 md:p-6 shadow-lg">
      <div className="flex flex-col mb-4">
        <h2 className="text-2xl font-bold text-left text-blue-600">Health Dashboard</h2>
        <p className="text-muted-foreground text-left text-sm">Welcome back! You're making great progress.</p>
        <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
          <div className="flex flex-wrap gap-1">
            <button
              className={`px-3 py-1 text-xs ${timePeriod === "today" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800"} rounded-full shadow-sm`}
              onClick={() => setTimePeriod("today")}
            >
              Today
            </button>
            <button
              className={`px-3 py-1 text-xs ${timePeriod === "week" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800"} rounded-full shadow-sm`}
              onClick={() => setTimePeriod("week")}
            >
              Week
            </button>
            <button
              className={`px-3 py-1 text-xs ${timePeriod === "month" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800"} rounded-full shadow-sm`}
              onClick={() => setTimePeriod("month")}
            >
              Month
            </button>
          </div>
        </div>
      </div>

      {/* Stats cards - using a simple grid with forced 2x2 layout */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <StatCard
          icon={<Activity size={12} className="text-green-500" />}
          iconColor="bg-green-500/20"
          bgColor="bg-green-500/10"
          barColor="bg-green-500"
          textColor="text-green-500"
          title="Steps"
          value={data.steps}
          change={data.stepsChange}
          percentage={data.stepsPercentage}
          target="goal (10k)"
        />

        <StatCard
          icon={<Flame size={12} className="text-orange-500" />}
          iconColor="bg-orange-500/20"
          bgColor="bg-orange-500/10"
          barColor="bg-orange-500"
          textColor="text-orange-500"
          title="Calories"
          value={data.calories}
          change={data.caloriesChange}
          percentage={data.caloriesPercentage}
          target="target (2.4k)"
        />

        <StatCard
          icon={<Award size={12} className="text-yellow-500" />}
          iconColor="bg-yellow-500/20"
          bgColor="bg-yellow-500/10"
          barColor="bg-yellow-500"
          textColor="text-yellow-500"
          title="Weight"
          value={data.weight}
          unit="kg"
          change={data.weightChange}
          percentage={data.weightPercentage}
          target="goal (70kg)"
        />

        <StatCard
          icon={<Droplet size={12} className="text-purple-500" />}
          iconColor="bg-purple-500/20"
          bgColor="bg-purple-500/10"
          barColor="bg-purple-500"
          textColor="text-purple-500"
          title="Sleep"
          value={data.sleep}
          unit="hrs"
          change={data.sleepChange}
          percentage={data.sleepPercentage}
          target="rec. (8hrs)"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">
              {timePeriod === "today" ? "Daily" : timePeriod === "week" ? "Weekly" : "Monthly"} Progress
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span> Steps
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-purple-500 inline-block"></span> Sleep
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-yellow-500 inline-block"></span> Weight
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-orange-500 inline-block"></span> Calories
              </span>
            </div>
          </div>
          <WeeklyProgressChart timePeriod={timePeriod} />
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
          <h3 className="font-medium mb-4">Today's Schedule</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full h-8 w-8 flex items-center justify-center mt-1">
                <Calendar size={16} className="text-blue-600" />
              </div>
              <div>
                <div className="font-medium">Morning Walk</div>
                <div className="text-sm text-muted-foreground">7:00 AM</div>
                <div className="text-xs text-green-500 mt-1">Completed ✓</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full h-8 w-8 flex items-center justify-center mt-1">
                <Calendar size={16} className="text-blue-600" />
              </div>
              <div>
                <div className="font-medium">Yoga Session</div>
                <div className="text-sm text-muted-foreground">6:00 PM</div>
                <div className="text-xs text-muted-foreground mt-1">In 4 hours</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full h-8 w-8 flex items-center justify-center mt-1">
                <Calendar size={16} className="text-blue-600" />
              </div>
              <div>
                <div className="font-medium">Medication</div>
                <div className="text-sm text-muted-foreground">9:00 PM</div>
                <div className="text-xs text-muted-foreground mt-1">In 7 hours</div>
              </div>
            </div>
          </div>

          <button className="w-full mt-4 text-sm text-blue-600 bg-blue-600/10 py-2 rounded-lg">Add New Activity</button>
        </div>
      </div>

      <div className="bg-blue-600/5 p-3 rounded-xl mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-blue-600 text-white p-1 rounded-full">
            <Award size={14} />
          </div>
          <h3 className="font-medium text-blue-600 text-sm">Weekly Achievements</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white dark:bg-gray-800 p-2 rounded-lg text-center">
            <div className="text-base font-bold">3 Days</div>
            <div className="text-xs text-muted-foreground">Step Goal Streak</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-2 rounded-lg text-center">
            <div className="text-base font-bold">5 Days</div>
            <div className="text-xs text-muted-foreground">Sleep Goal Streak</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-2 rounded-lg text-center">
            <div className="text-base font-bold">-2.5 kg</div>
            <div className="text-xs text-muted-foreground">Monthly Progress</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-2 rounded-lg text-center">
            <div className="text-base font-bold">+15%</div>
            <div className="text-xs text-muted-foreground">Activity Increase</div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-2">
        <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600/10 text-blue-600 rounded-lg text-sm">
          <Share className="h-4 w-4" />
          <span>Share Data</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600/10 text-blue-600 rounded-lg text-sm">
          <Download className="h-4 w-4" />
          <span>Export Data</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600/10 text-blue-600 rounded-lg text-sm">
          <Printer className="h-4 w-4" />
          <span>Print Report</span>
        </button>
      </div>

      <div className="text-xs text-center mt-3 text-muted-foreground">
        Last sync: 03/14/2025 10:42 AM | Battery: 68% | v2.4.0
      </div>
    </div>
  )
})

AfterVersion.displayName = "AfterVersion"

// The comparison slider component
const ComparisonSlider = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [showHint, setShowHint] = useState(true)

  // Handle mouse/touch events for dragging
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    setIsDragging(true)
    setShowHint(false)
  }

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setPosition((prev) => Math.max(0, prev - 5))
    } else if (e.key === "ArrowRight") {
      setPosition((prev) => Math.min(100, prev + 5))
    }
    setShowHint(false)
  }

  const updateSliderPosition = useCallback((clientX: number) => {
    if (containerRef.current) {
      const { left, width } = containerRef.current.getBoundingClientRect()
      const newPosition = ((clientX - left) / width) * 100
      setPosition(Math.min(100, Math.max(0, newPosition)))
    }
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        updateSliderPosition(e.clientX)
      }
    },
    [isDragging, updateSliderPosition],
  )

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        updateSliderPosition(e.touches[0].clientX)
      }
    },
    [isDragging, updateSliderPosition],
  )

  // Add and remove event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("touchmove", handleTouchMove)
      window.addEventListener("mouseup", handleMouseUp)
      window.addEventListener("touchend", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchend", handleMouseUp)
    }
  }, [isDragging, handleMouseMove, handleTouchMove, handleMouseUp])

  // Hide hint after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col">
      <div
        className="relative overflow-hidden border border-gray-200 dark:border-gray-700 h-[800px]"
        ref={containerRef}
      >
        {/* Before version (full width) */}
        <div className="w-full">
          <BeforeVersion />
        </div>

        {/* After version (clipped) - using a fixed width container to prevent layout issues */}
        <div
          className="absolute top-0 left-0 h-full overflow-hidden"
          style={{
            width: `${position}%`,
          }}
        >
          {/* Fixed width container to ensure layout doesn't break */}
          <div className="w-full min-w-[320px]">
            <AfterVersion />
          </div>
        </div>

        {/* Slider handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-primary cursor-ew-resize"
          style={{ left: `${position}%` }}
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
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shadow-md">
            <div className="flex">
              <ChevronLeft size={16} />
              <ChevronRight size={16} />
            </div>
          </div>
        </div>

        {/* Drag hint overlay */}
        {showHint && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white">
            <div className="flex items-center gap-2 text-lg font-medium">
              <MousePointerClick size={24} />
              <span>Drag to compare before and after</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function HealthProgressTracker() {
  return (
    <div className="w-full h-full flex flex-col">
      <ComparisonSlider />
    </div>
  )
}

