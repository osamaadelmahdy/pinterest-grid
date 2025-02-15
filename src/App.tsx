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
const Layout = () => {
  return (
    <>
      <nav
        style={{
          display: "flex",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/paginated">About</Link>
      </nav>
      <Outlet />
    </>
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
