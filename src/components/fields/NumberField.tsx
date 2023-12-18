'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bs123 } from 'react-icons/bs';

import {
  DesignerComponentProps,
  ElementsType,
  FormComponentProps,
  FormElement,
  FormElementInstance,
  PropertiesComponentProps,
} from '@/types/elements';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '../ui/form';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useDesigner } from '@/hooks/useDesigner';
import { cn } from '@/lib/utils';

const type: ElementsType = 'NumberField';

const extraAttributes = {
  label: 'Number field',
  description: 'Description',
  required: true,
  placeholder: '0',
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  description: z.string().max(200),
  required: z.boolean().default(false),
  placeholder: z.string().max(50),
});

export const NumberFieldFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  designerButtonElement: {
    icon: Bs123,
    label: 'Number Field',
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
      return currentValue.length > 0;
    }
    return true;
  },
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({ elementInstance }: DesignerComponentProps) {
  const element = elementInstance as CustomInstance;
  const { label, required, placeholder, description } = element.extraAttributes;

  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label>
        {label}
        {required && <span className='text-red-500'>*</span>}
      </Label>
      <Input readOnly type='number' disabled placeholder={placeholder} />
      {description && (
        <p className='text-muted-foreground text-[0.8rem]'>{description}</p>
      )}
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
  const [value, setValue] = useState(defaultValue || '');
  const [error, setError] = useState(false);
  const { label, required, placeholder, description } = element.extraAttributes;

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label className={cn(error && 'text-red-500')}>
        {label}
        {required && <span className='text-red-500'>*</span>}
      </Label>
      <Input
        type='number'
        className={cn(error && 'border-red-500')}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => {
          if (!submitValue) return;
          const valid = NumberFieldFormElement.validate(
            element,
            e.target.value
          );
          setError(!valid);
          if (!valid) return;
          submitValue(element.id, e.target.value);
        }}
        value={value}
      />
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
      placeholder: element.extraAttributes.placeholder,
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
          name='placeholder'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Placeholder</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>The placeholder of the field.</FormDescription>
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
