import { FormElements } from '@/src/components/FormElements';
import SidebarButtonElement from './SidebarButtonElement';

export default function FormElementsSidebar() {
  return (
    <div>
      Elements
      <SidebarButtonElement formElement={FormElements.TextField} />
    </div>
  );
}
