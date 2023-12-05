'use client';

import { FormElements } from '@/src/components/FormElements';
import { Button } from '@/src/components/ui/button';
import { Separator } from '@/src/components/ui/separator';
import { useDesigner } from '@/src/hooks/useDesigner';
import { AiOutlineClose } from 'react-icons/ai';

export default function PropertiesFormSidebar() {
  const { selectedElement, setSelectedElement } = useDesigner();

  if (!selectedElement) return null;

  const PropertiesForm = FormElements[selectedElement.type].propetiesComponent;
  return (
    <div className='flex flex-col p-2'>
      <div className='flex justify-between items-center'>
        <p className='text-sm text-foreground/70'>Element properties</p>
        <Button
          size='icon'
          variant='ghost'
          onClick={() => setSelectedElement(null)}
        >
          <AiOutlineClose />
        </Button>
      </div>
      <Separator className='mb-4' />
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
}
