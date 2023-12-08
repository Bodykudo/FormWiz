'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LuHeading2 } from 'react-icons/lu';

import {
  DesignerComponentProps,
  ElementsType,
  FormComponentProps,
  FormElement,
  FormElementInstance,
  PropertiesComponentProps,
} from '@/src/types/elements';

import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useDesigner } from '@/src/hooks/useDesigner';

const type: ElementsType = 'SubTitleField';

const extraAttributes = {
  title: 'SubTitle field',
};

const propertiesSchema = z.object({
  title: z.string().min(2).max(50),
});

export const SubTitleFieldFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  designerButtonElement: {
    icon: LuHeading2,
    label: 'SubTitle Field',
  },

  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propetiesComponent: PropertiesComponent,

  validate: () => true,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({ elementInstance }: DesignerComponentProps) {
  const element = elementInstance as CustomInstance;
  const { title } = element.extraAttributes;

  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label className='text-muted-foreground'>Title field</Label>
      <p className='text-lg'>{title}</p>
    </div>
  );
}

function FormComponent({ elementInstance }: FormComponentProps) {
  const element = elementInstance as CustomInstance;
  const { title } = element.extraAttributes;

  return <p className='text-lg'>{title}</p>;
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

function PropertiesComponent({ elementInstance }: PropertiesComponentProps) {
  const element = elementInstance as CustomInstance;

  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: 'onBlur',
    defaultValues: {
      title: element.extraAttributes.title,
    },
  });

  const { handleSubmit, control } = form;

  const { updateElement } = useDesigner();

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: propertiesFormSchemaType) {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...values,
      },
    });
  }

  return (
    <Form {...form}>
      <form onBlur={handleSubmit(applyChanges)} className='space-y-3'>
        <FormField
          control={control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur();
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
