import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import CreatePage from "./pages/CreatePage";
import NoteDetail from "./pages/NoteDetail";


const App = () => {


  return (
    <div data-theme="autumn" className="relative h-full w-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetail />} />
      </Routes>
    </div>
  );
};
export default App;