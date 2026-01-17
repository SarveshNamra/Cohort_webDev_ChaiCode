import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/testRoute')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/testRoute"!</div>
}
