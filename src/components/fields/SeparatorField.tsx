'use client';

import { RiSeparator } from 'react-icons/ri';
import { ElementsType, FormElement } from '@/types/elements';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';

const type: ElementsType = 'SeparatorField';

export const SeparatorFieldFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
  }),

  designerButtonElement: {
    icon: RiSeparator,
    label: 'Separator Field',
  },

  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propetiesComponent: PropertiesComponent,

  validate: () => true,
};

function DesignerComponent() {
  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label className='text-muted-foreground'>Separator field</Label>
      <Separator />
    </div>
  );
}

function FormComponent() {
  return <Separator />;
}

function PropertiesComponent() {
  return <p>No properties for this element</p>;
}
