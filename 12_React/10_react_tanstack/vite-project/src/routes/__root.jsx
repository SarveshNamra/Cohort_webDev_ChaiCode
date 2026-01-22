import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { useNotification } from '../context/NotificationContext'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  // using context
  const {count} = useNotification();

  return (
    <React.Fragment>
        <div>Hello "__root"!</div>
        <div className="p-2 flex gap-2">
            <Link to="/" className="[&.active]:font-bold">
                Home
            </Link>{' '}
            <Link to="/about" className="[&.active]:font-bold">
                About
            </Link>
        </div>
        <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </React.Fragment>
  )
}
