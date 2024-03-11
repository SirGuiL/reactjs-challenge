import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UserPreferenceContextProvider } from "./contexts/UserPreferenceContext.tsx";
import { HistoryContextProvider } from "./contexts/HistoryContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserPreferenceContextProvider>
      <HistoryContextProvider>
        <App />
      </HistoryContextProvider>
    </UserPreferenceContextProvider>
  </React.StrictMode>
);
