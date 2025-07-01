"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface DataPoint {
  name: string
  steps: number
  calories: number
  weight: number
}

interface RechartsWrapperProps {
  data: DataPoint[]
  colors?: {
    steps?: string
    calories?: string
    weight?: string
  }
}

const RechartsWrapper = ({
  data,
  colors = {
    steps: "#10b981",
    calories: "#3b82f6",
    weight: "#8b5cf6",
  },
}: RechartsWrapperProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="name" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="steps" stroke={colors.steps} activeDot={{ r: 8 }} strokeWidth={2} />
        <Line type="monotone" dataKey="calories" stroke={colors.calories} strokeWidth={2} />
        <Line type="monotone" dataKey="weight" stroke={colors.weight} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default RechartsWrapper
