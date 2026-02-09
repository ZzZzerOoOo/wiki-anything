import PageView from "./pages/PageView";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import NewPage from "./pages/newPages";
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
      {/* <Header /> */}

      {/* <form className="slug-form" onSubmit={handleSubmit}>
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Enter page slug"
        />
        <button>Go</button>
        </form> */}
        

      <Routes>
          {/* <Route path="/" element={<Navigate to="/pages/home" />} /> */}
           <Route path="/" element={<HomePage />} />
           <Route path="/pages/new" element={<NewPage />} />
          <Route path="/pages/:slug" element={<PageView />} />
          <Route path="*" element={<NotFound />}/>
        </Routes>

        
        {/* <form className="slug-form" onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter page slug"
        />
        <button>Load</button>
      </form> */}
      
      {/* <PageView slug={slug} /> */}

    </div>
  );
}

export default App;
