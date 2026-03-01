import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import dateFormat from "../lib/utils";
import toast from "react-hot-toast";
import api from "../lib/axios";



const NoteCard = ({ note, setNotes }) => {
  // Prevent default Link navigation when delete button is clicked.
  // Since the whole card is wrapped inside a <Link>,
  // clicking the delete button would normally trigger navigation.
  // e.preventDefault() stops that default navigation behavior,
  // allowing only the delete logic to run.

  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm('Are you sure you want to delete this note?')) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success('Note deleted successfully');
    } catch (error) {
      console.log('Error in deleting notes', error);
      toast.error('Failed to delete note');
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className='card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#00FF9D]'
    >
      <div className='card-body'>
        <h3 className='card-title text-base-content'>{note.title}</h3>
        <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
        <div className='card-actions justify-between items-center mt-4'>
          <span className='text-sm text-base-content/60'>
            {dateFormat(note.createdAt)}
          </span>
          <div className='flex items-center gap-1'>
            <PenSquareIcon className='size-4' />
            <button
              className='btn btn-ghost btn-xs text-error'
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className='size-4' />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default NoteCard;