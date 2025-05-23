"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ProjectData, SprintData } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProjectFormProps {
  onAddSprint: (sprint: SprintData) => void
  onUpdateProject: (name: string, points: number) => void
  projectData: ProjectData
  nextSprintNumber: number
}

export function ProjectForm({ onAddSprint, onUpdateProject, projectData, nextSprintNumber }: ProjectFormProps) {
  const [sprintData, setSprintData] = useState<SprintData>({
    sprintNumber: nextSprintNumber,
    completedPoints: 0,
    remainingPoints:
      projectData.totalStoryPoints - projectData.sprints[projectData.sprints.length - 1]?.completedPoints ||
      projectData.totalStoryPoints,
    date: new Date().toISOString().split("T")[0],
  })

  const [projectName, setProjectName] = useState(projectData.projectName)
  const [totalPoints, setTotalPoints] = useState(projectData.totalStoryPoints)

  const handleSprintSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddSprint(sprintData)
  }

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdateProject(projectName, totalPoints)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Data</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sprint">
          <TabsList className="mb-4">
            <TabsTrigger value="sprint">Add Sprint</TabsTrigger>
            <TabsTrigger value="project">Project Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="sprint">
            <form onSubmit={handleSprintSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sprintNumber">Sprint Number</Label>
                  <Input
                    id="sprintNumber"
                    type="number"
                    value={sprintData.sprintNumber}
                    onChange={(e) => setSprintData({ ...sprintData, sprintNumber: Number.parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={sprintData.date}
                    onChange={(e) => setSprintData({ ...sprintData, date: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="completedPoints">Completed Points</Label>
                  <Input
                    id="completedPoints"
                    type="number"
                    value={sprintData.completedPoints}
                    onChange={(e) => {
                      const completed = Number.parseInt(e.target.value)
                      setSprintData({
                        ...sprintData,
                        completedPoints: completed,
                        remainingPoints: projectData.totalStoryPoints - completed,
                      })
                    }}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="remainingPoints">Remaining Points</Label>
                  <Input
                    id="remainingPoints"
                    type="number"
                    value={sprintData.remainingPoints}
                    onChange={(e) => setSprintData({ ...sprintData, remainingPoints: Number.parseInt(e.target.value) })}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Add Sprint Data
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="project">
            <form onSubmit={handleProjectSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name</Label>
                <Input id="projectName" value={projectName} onChange={(e) => setProjectName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalPoints">Total Story Points</Label>
                <Input
                  id="totalPoints"
                  type="number"
                  value={totalPoints}
                  onChange={(e) => setTotalPoints(Number.parseInt(e.target.value))}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Update Project
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
