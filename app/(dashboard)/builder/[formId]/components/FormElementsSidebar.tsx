import { FormElements } from '@/components/FormElements';
import SidebarButtonElement from './SidebarButtonElement';

export default function FormElementsSidebar() {
  return (
    <div>
      Elements
      <SidebarButtonElement formElement={FormElements.TextField} />
    </div>
  );
}
