import { NotebookIcon } from 'lucide-react';
import { Link } from 'react-router';

const NotesNotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center'>
      <div className='bg-primary/10 rounded-full p-8'>
        <NotebookIcon className='size-10 text-primary' />
      </div>
      <h3 className='text-2xl font-bold'>Your canvas is still blank</h3>
      <p className='text-base-content/70'>
        Every big idea starts with a single note. Capture your thoughts, spark
        your creativity, and begin building your story today.
      </p>
      <Link to='/create' className='btn btn-primary'>
        Start Your First Note
      </Link>
    </div>
  );
};

export default NotesNotFound;
