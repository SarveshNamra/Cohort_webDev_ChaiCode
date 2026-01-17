import { createLazyFileRoute, Link } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/Products')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
        Hello "/Products"!
        <Link to="/Product/1">This is Product 1</Link>
        <br />
        <Link to="/Product/2">This is Product 2</Link>
        <br />
        <Link to="/Product/3">This is Product 3</Link>
        <br />
    </div>
    );
}
