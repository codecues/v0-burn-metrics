import { ProjectDashboard } from "@/components/project-dashboard"

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Burn Metrics Dashboard</h1>
      <ProjectDashboard />
    </div>
  )
}
