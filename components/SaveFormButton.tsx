import { HiSaveAs } from 'react-icons/hi';
import { Button } from './ui/button';

export default function PreviewFormButton() {
  return (
    <Button variant='outline' className='gap-2'>
      <HiSaveAs className='w-4 h-4' /> Save
    </Button>
  );
}
