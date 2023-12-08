import FormElementsSidebar from './FormElementsSidebar';
import PropertiesFormSidebar from './PropertiesFormSidebar';
import { useDesigner } from '@/src/hooks/useDesigner';

export default function DesignerSidebar() {
  const { selectedElement } = useDesigner();
  return (
    <aside className='w-100 max-w-xmd flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full'>
      {!selectedElement && <FormElementsSidebar />}
      {selectedElement && <PropertiesFormSidebar />}
    </aside>
  );
}
