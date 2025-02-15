import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Gallery from "./pages/Gallery";
import PaginatedGallery from "./pages/PaginatedGallery";
import {
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
const Layout = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
        overflow: "auto",
      }}
    >
      <nav
        style={{
          display: "flex",
          gap: "1rem",
          padding: "1rem",
          alignSelf: "center",
        }}
      >
        <Link to="/">Infinite Gallery</Link>
        <Link to="/paginated">Paginated Gallery</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Gallery />,
      },
      {
        path: "/paginated",
        element: <PaginatedGallery />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <br />
    </QueryClientProvider>
  );
}

export default App;
