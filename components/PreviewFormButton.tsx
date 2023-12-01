import { Button } from './ui/button';
import { MdPreview } from 'react-icons/md';

export default function PreviewFormButton() {
  return (
    <Button variant='outline' className='gap-2'>
      <MdPreview className='w-6 h-6' /> Preview
    </Button>
  );
}
