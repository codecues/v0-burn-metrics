export interface SprintData {
  sprintNumber: number
  completedPoints: number
  remainingPoints: number
  date: string
}

export interface ProjectData {
  projectName: string
  totalStoryPoints: number
  sprints: SprintData[]
}
