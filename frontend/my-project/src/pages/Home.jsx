import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "../components/Loading";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
const Home = () => {
  const [isRatelimited, setIsRatelimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notes = await axios.get('http://localhost:5001/api/v1/notes');
        console.log(notes.data);
        setNotes(notes.data);
        setLoading(false);
        setIsRatelimited(false);

      } catch (error) {
        console.log("Error fetching notes");
        console.log(error.response);
        if (error.response?.status === 429) {
          setIsRatelimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      }
      finally {
        setLoading(false);
      }
    }
    fetchNotes();
  }, [])
  

  return (
    <div className='min-h-screen'>
      <Navbar />
      {isRatelimited && <RateLimitedUI />}
      
      {notes.length === 0 && !isRatelimited && <NotesNotFound />}

      <div className='max-w-6xl mx-auto px-4 mt-6'>
        {loading && <Loader />}

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Home