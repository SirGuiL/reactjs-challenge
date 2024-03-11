import { RouterProvider } from "react-router-dom";

import { Sidebar } from "./components/Sidebar";
import { router } from "./router";

function App() {
  return (
    <main className="flex flex-col-reverse md:flex-row h-screen">
      <Sidebar />

      <RouterProvider router={router} />
    </main>
  );
}

export default App;
