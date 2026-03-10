import PageView from "./pages/PageView";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewPage from "./pages/newPages";
import NewWiki from "./pages/newWiki";
import WikiView from "./pages/WikiView";
import AppLayout from "./components/common/AppLayout";

function App() {

  const [value, setValue] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/pages/${value}`);
    setValue("");
  }

  return (
    <div className="app">        
      <Routes>

              <Route
                path="/"
                element={
                  <AppLayout>
                    <HomePage />
                  </AppLayout>
                }
              />

              <Route
                path="/pages/newPage"
                element={
                  <AppLayout>
                    <NewPage />
                  </AppLayout>
                }
              />

              <Route
                path="/wiki/newWiki"
                element={
                  <AppLayout>
                    <NewWiki />
                  </AppLayout>
                }
              />
              <Route
                path="/pages/:slug"
                element={
                  <AppLayout>
                    <PageView />
                  </AppLayout>
                }
              />

              <Route
                path="/wiki/:slug"
                element={
                  <AppLayout>
                    <WikiView />
                  </AppLayout>
                }
              />

        </Routes>

    </div>
  );
}

export default App;
