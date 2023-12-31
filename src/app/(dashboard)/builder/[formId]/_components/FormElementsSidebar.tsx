import { Separator } from '@/components/ui/separator';
import {
  formElementsList,
  layoutElementsList,
} from '@/components/FormElements';
import SidebarButtonElement from './SidebarButtonElement';

export default function FormElementsSidebar() {
  return (
    <div>
      <p className='text-sm text-foreground/70'>Drag and drop elements</p>
      <Separator className='my-2' />
      <div className='grid grid-cols1 md:grid-cols-2 gap-2 place-items-center'>
        <p className='text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start'>
          Layout elements
        </p>
        {layoutElementsList.map((element) => (
          <SidebarButtonElement key={element.type} formElement={element} />
        ))}
        <p className='text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start'>
          Form elements
        </p>
        {formElementsList.map((element) => (
          <SidebarButtonElement key={element.type} formElement={element} />
        ))}
      </div>
    </div>
  );
}
