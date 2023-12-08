'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { IoMdCheckbox } from 'react-icons/io';

import {
  DesignerComponentProps,
  ElementsType,
  FormComponentProps,
  FormElement,
  FormElementInstance,
  PropertiesComponentProps,
} from '@/src/types/elements';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '../ui/form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Checkbox } from '../ui/checkbox';
import { useDesigner } from '@/src/hooks/useDesigner';
import { cn } from '@/src/lib/utils';

const type: ElementsType = 'CheckboxField';

const extraAttributes = {
  label: 'Checkbox field',
  description: 'Description',
  required: true,
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  description: z.string().max(200),
  required: z.boolean().default(false),
});

export const CheckboxFieldFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  designerButtonElement: {
    icon: IoMdCheckbox,
    label: 'CheckBox Field',
  },

  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propetiesComponent: PropertiesComponent,

  validate: (
    formElement: FormElementInstance,
    currentValue: string
  ): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      return currentValue === 'true';
    }
    return true;
  },
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({ elementInstance }: DesignerComponentProps) {
  const element = elementInstance as CustomInstance;
  const { label, required, description } = element.extraAttributes;
  const id = `checkbox-${element.id}`;

  return (
    <div className='flex items-top space-x-2'>
      <Checkbox id={id} />

      <div className='grid gap-1 5 leading-none'>
        <Label htmlFor={id}>
          {label}
          {required && <span className='text-red-500'>*</span>}
        </Label>
        {description && (
          <p className='text-muted-foreground text-[0.8rem]'>{description}</p>
        )}
      </div>
    </div>
  );
}

function FormComponent({
  elementInstance,
  submitValue,
  defaultValue,
  isInvalid,
}: FormComponentProps) {
  const element = elementInstance as CustomInstance;
  const [value, setValue] = useState(defaultValue === 'true');
  const [error, setError] = useState(false);
  const { label, required, description } = element.extraAttributes;

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const id = `checkbox-${element.id}`;

  return (
    <div className='flex items-top space-x-2'>
      <Checkbox
        id={id}
        checked={value}
        className={cn(error && 'border-red-500')}
        onCheckedChange={(checked) => {
          let value = false;
          if (checked === true) value = true;
          setValue(value);

          if (!submitValue) return;
          const stringValue = value ? 'true' : 'false';
          const valid = CheckboxFieldFormElement.validate(element, stringValue);
          setError(!valid);
          submitValue(element.id, stringValue);
        }}
      />

      <div className='grid gap-1 5 leading-none'>
        <Label htmlFor={id} className={cn(error && 'text-red-500')}>
          {label}
          {required && <span className='text-red-500'>*</span>}
        </Label>
        {description && (
          <p
            className={cn(
              'text-muted-foreground text-[0.8rem]',
              error && 'text-red-500'
            )}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

function PropertiesComponent({ elementInstance }: PropertiesComponentProps) {
  const element = elementInstance as CustomInstance;

  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: 'onBlur',
    defaultValues: {
      label: element.extraAttributes.label,
      description: element.extraAttributes.description,
      required: element.extraAttributes.required,
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
          name='label'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                The label of the field. <br /> It will be displayed above the
                field.
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                The description of the field. <br /> It will be displayed below
                the field.
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='required'
          render={({ field }) => (
            <FormItem className='flex items-center justify-between rounded-lg border p-3 shadow-sm'>
              <div className='space-y-0 5'>
                <FormLabel>Required</FormLabel>
                <FormDescription>
                  Indicates whether the field is required or not.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
