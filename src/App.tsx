import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Gallery from "./components/Gallery";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Gallery />
    </QueryClientProvider>
  );
}

export default App;
