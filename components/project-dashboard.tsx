"use client"

import { useState } from "react"
import { ProjectForm } from "@/components/project-form"
import { BurnCharts } from "@/components/burn-charts"
import type { ProjectData, SprintData } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export function ProjectDashboard() {
  const [projectData, setProjectData] = useState<ProjectData>({
    projectName: "Sample Project",
    totalStoryPoints: 100,
    sprints: [
      {
        sprintNumber: 1,
        completedPoints: 20,
        remainingPoints: 80,
        date: "2023-01-15",
      },
      {
        sprintNumber: 2,
        completedPoints: 35,
        remainingPoints: 65,
        date: "2023-01-29",
      },
      {
        sprintNumber: 3,
        completedPoints: 55,
        remainingPoints: 45,
        date: "2023-02-12",
      },
    ],
  })

  const [showForm, setShowForm] = useState(false)

  const handleAddSprint = (newSprint: SprintData) => {
    setProjectData((prev) => ({
      ...prev,
      sprints: [...prev.sprints, newSprint],
    }))
    setShowForm(false)
  }

  const handleUpdateProject = (name: string, points: number) => {
    setProjectData((prev) => ({
      ...prev,
      projectName: name,
      totalStoryPoints: points,
    }))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="charts">
            <TabsList className="mb-4">
              <TabsTrigger value="charts">Charts</TabsTrigger>
              <TabsTrigger value="data">Project Data</TabsTrigger>
            </TabsList>
            <TabsContent value="charts">
              <BurnCharts projectData={projectData} />
            </TabsContent>
            <TabsContent value="data">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    {projectData.projectName} - {projectData.totalStoryPoints} Story Points
                  </h2>
                  <Button variant="outline" onClick={() => setShowForm(!showForm)} className="flex items-center gap-1">
                    <PlusCircle className="h-4 w-4" />
                    {showForm ? "Cancel" : "Add Sprint"}
                  </Button>
                </div>

                {showForm && (
                  <ProjectForm
                    onAddSprint={handleAddSprint}
                    onUpdateProject={handleUpdateProject}
                    projectData={projectData}
                    nextSprintNumber={projectData.sprints.length + 1}
                  />
                )}

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Sprint</th>
                        <th className="text-left py-2">Date</th>
                        <th className="text-left py-2">Completed</th>
                        <th className="text-left py-2">Remaining</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projectData.sprints.map((sprint) => (
                        <tr key={sprint.sprintNumber} className="border-b">
                          <td className="py-2">Sprint {sprint.sprintNumber}</td>
                          <td className="py-2">{sprint.date}</td>
                          <td className="py-2">{sprint.completedPoints}</td>
                          <td className="py-2">{sprint.remainingPoints}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
