import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import FlexProvider from "./components/UI/Flex/Provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FlexProvider>
      <App />
    </FlexProvider>
  </React.StrictMode>
);
