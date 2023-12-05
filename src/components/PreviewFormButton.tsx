import { userPreviewModal } from '@/src/hooks/usePreviewModal';
import { Button } from './ui/button';
import { MdPreview } from 'react-icons/md';

export default function PreviewFormButton() {
  const { onOpen } = userPreviewModal();
  return (
    <Button variant='outline' onClick={onOpen} className='gap-2'>
      <MdPreview className='w-6 h-6' /> Preview
    </Button>
  );
}
