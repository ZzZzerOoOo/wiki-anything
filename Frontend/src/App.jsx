import PageView from "./pages/PageView";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewPage from "./pages/newPages";
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
                path="/pages/new"
                element={
                  <AppLayout>
                    <NewPage />
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

        </Routes>

    </div>
  );
}

export default App;
