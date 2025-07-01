"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ChartConfig {
  [dataKey: string]: {
    label: string
    color: string
  }
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
}

const ChartContext = React.createContext<{
  config: ChartConfig
  getColor: (dataKey: string) => string
  getLabel: (dataKey: string) => string
}>({
  config: {},
  getColor: () => "",
  getLabel: () => "",
})

function ChartContainer({ config, className, children, ...props }: ChartContainerProps) {
  const getColor = React.useCallback(
    (dataKey: string) => {
      return config[dataKey]?.color || ""
    },
    [config],
  )

  const getLabel = React.useCallback(
    (dataKey: string) => {
      return config[dataKey]?.label || dataKey
    },
    [config],
  )

  // Create CSS variables for each color
  const cssVariables = React.useMemo(() => {
    return Object.entries(config).reduce(
      (acc, [dataKey, { color }]) => {
        acc[`--color-${dataKey}`] = color
        return acc
      },
      {} as Record<string, string>,
    )
  }, [config])

  return (
    <ChartContext.Provider value={{ config, getColor, getLabel }}>
      <div className={cn("chart-container", className)} style={cssVariables} {...props}>
        {children}
      </div>
    </ChartContext.Provider>
  )
}

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a ChartContainer")
  }
  return context
}

interface ChartTooltipProps extends React.HTMLAttributes<HTMLDivElement> {}

const ChartTooltip = React.forwardRef<HTMLDivElement, ChartTooltipProps>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("rounded-lg border bg-background p-2 shadow-md", className)} {...props} />
})
ChartTooltip.displayName = "ChartTooltip"

interface ChartTooltipContentProps {
  payload?: Array<{
    value: number
    name: string
    dataKey: string
  }>
  label?: string
  active?: boolean
}

function ChartTooltipContent({ payload, label, active }: ChartTooltipContentProps) {
  const { getColor, getLabel } = useChart()

  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="space-y-1">
      <p className="text-xs font-medium">{label}</p>
      <div className="space-y-0.5">
        {payload.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: getColor(item.dataKey) }} />
            <span className="text-xs text-muted-foreground">{getLabel(item.dataKey)}</span>
            <span className="text-xs font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export { ChartContainer, ChartTooltip, ChartTooltipContent, useChart }
