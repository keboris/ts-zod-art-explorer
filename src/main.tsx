import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import GalleryContextProvider from "./contexts/GalleryContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GalleryContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GalleryContextProvider>
  </StrictMode>
);
