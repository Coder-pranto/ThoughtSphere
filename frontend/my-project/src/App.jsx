import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import CreatePage from "./pages/CreatePage";
import NoteDetail from "./pages/NoteDetail";
import toast from 'react-hot-toast'

const App = () => {

  const notify = () => toast.success('Here is your toast.');
  return (
    <div data-theme="coffee" className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      {/* <button className="btn btn-outline" onClick={notify}>Make me a toast</button> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetail />} />
      </Routes>
    </div>
  );
};
export default App;