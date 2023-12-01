import { MdOutlinePublish } from 'react-icons/md';
import { Button } from './ui/button';

export default function PreviewFormButton() {
  return (
    <Button variant='premium' className='gap-2'>
      <MdOutlinePublish className='w-4 h-4' /> Publish
    </Button>
  );
}
