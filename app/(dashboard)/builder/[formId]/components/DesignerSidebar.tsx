import { FormElements } from '@/components/FormElements';
import SidebarButtonElement from './SidebarButtonElement';

export default function DesignerSidebar() {
  return (
    <aside className='w-100 max-w-xmd flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full'>
      Elements
      <SidebarButtonElement formElement={FormElements.TextField} />
    </aside>
  );
}
