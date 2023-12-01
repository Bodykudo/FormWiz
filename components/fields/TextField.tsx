'use client';

import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from '@/types/elements';
import { MdTextFields } from 'react-icons/md';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

const type: ElementsType = 'TextField';

const extraAttributes = {
  label: 'Text field',
  description: 'Description',
  required: true,
  placeholder: 'Value here...',
};

export const TextFieldFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  designerButtonElement: {
    icon: MdTextFields,
    label: 'Text Field',
  },

  designerComponent: DesignerComponent,
  formComponent: () => <div>FORM</div>,
  propetiesComponent: () => <div>PROPERTIES</div>,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, required, placeholder, description } = element.extraAttributes;

  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label>
        {label}
        {required && <span className='text-red-500'>*</span>}
      </Label>
      <Input readOnly disabled placeholder={placeholder} />
      {description && (
        <p className='text-muted-foreground text-[0.8rem]'>{description}</p>
      )}
    </div>
  );
}
