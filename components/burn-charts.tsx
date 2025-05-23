"use client"

import type { ProjectData } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface BurnChartsProps {
  projectData: ProjectData
}

export function BurnCharts({ projectData }: BurnChartsProps) {
  // Calculate ideal burn down line
  const idealBurnDown = projectData.sprints.map((sprint, index) => {
    const totalSprints = projectData.sprints.length
    const idealRemaining = projectData.totalStoryPoints * (1 - index / totalSprints)

    return {
      name: `Sprint ${sprint.sprintNumber}`,
      date: sprint.date,
      remaining: sprint.remainingPoints,
      ideal: Math.round(idealRemaining),
      completed: sprint.completedPoints,
      total: projectData.totalStoryPoints,
    }
  })

  // Add starting point for burn up chart
  const burnUpData = [
    {
      name: "Start",
      date: "Project Start",
      completed: 0,
      scope: projectData.totalStoryPoints,
    },
    ...projectData.sprints.map((sprint) => ({
      name: `Sprint ${sprint.sprintNumber}`,
      date: sprint.date,
      completed: sprint.completedPoints,
      scope: projectData.totalStoryPoints,
    })),
  ]

  return (
    <div className="space-y-6">
      <Tabs defaultValue="burndown">
        <TabsList>
          <TabsTrigger value="burndown">Burn Down</TabsTrigger>
          <TabsTrigger value="burnup">Burn Up</TabsTrigger>
        </TabsList>

        <TabsContent value="burndown" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Burn Down Chart</CardTitle>
              <CardDescription>Tracking remaining work over time for {projectData.projectName}</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  remaining: {
                    label: "Remaining Points",
                    color: "hsl(var(--chart-1))",
                  },
                  ideal: {
                    label: "Ideal Burn Down",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={idealBurnDown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, projectData.totalStoryPoints]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="remaining"
                      stroke="var(--color-remaining)"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="ideal"
                      stroke="var(--color-ideal)"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="burnup" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Burn Up Chart</CardTitle>
              <CardDescription>Tracking completed work and total scope for {projectData.projectName}</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  completed: {
                    label: "Completed Points",
                    color: "hsl(var(--chart-1))",
                  },
                  scope: {
                    label: "Total Scope",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={burnUpData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, projectData.totalStoryPoints * 1.2]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="completed"
                      stroke="var(--color-completed)"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="scope"
                      stroke="var(--color-scope)"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
