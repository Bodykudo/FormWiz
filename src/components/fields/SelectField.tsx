'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { RxDropdownMenu } from 'react-icons/rx';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';

import { useDesigner } from '@/src/hooks/useDesigner';
import { cn } from '@/src/lib/utils';

const type: ElementsType = 'SelectField';

const extraAttributes = {
  label: 'Select field',
  description: 'Description',
  required: true,
  placeholder: 'Value here...',
  options: [],
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  description: z.string().max(200),
  required: z.boolean().default(false),
  placeholder: z.string().max(50),
  options: z.array(z.string()).default([]),
});

export const SelectFieldFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  designerButtonElement: {
    icon: RxDropdownMenu,
    label: 'Select Field',
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
      <Select>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </Select>
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
  const { label, required, placeholder, description, options } =
    element.extraAttributes;

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label className={cn(error && 'text-red-500')}>
        {label}
        {required && <span className='text-red-500'>*</span>}
      </Label>
      <Select
        defaultValue={value}
        onValueChange={(value) => {
          setValue(value);
          if (!submitValue) return;
          const valid = SelectFieldFormElement.validate(element, value);
          setError(!valid);
          submitValue(element.id, value);
        }}
      >
        <SelectTrigger className={cn('w-full', error && 'border-red-500')}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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
    mode: 'onSubmit',
    defaultValues: {
      label: element.extraAttributes.label,
      description: element.extraAttributes.description,
      required: element.extraAttributes.required,
      placeholder: element.extraAttributes.placeholder,
      options: element.extraAttributes.options,
    },
  });

  const { handleSubmit, control } = form;

  const { updateElement, setSelectedElement } = useDesigner();

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

    toast({
      title: 'Success',
      description: 'Properties saved successfully',
    });

    setSelectedElement(null);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(applyChanges)} className='space-y-3'>
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

        <Separator />

        <FormField
          control={control}
          name='options'
          render={({ field }) => (
            <FormItem>
              <div className='flex justify-between items-center'>
                <FormLabel>Options</FormLabel>
                <Button
                  variant='outline'
                  className='gap-2'
                  onClick={(e) => {
                    e.preventDefault();
                    form.setValue('options', field.value.concat('New option'));
                  }}
                >
                  <AiOutlinePlus />
                  Add
                </Button>
              </div>
              <div className='flex flex-col gap-2'>
                {form.watch('options').map((option, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between gap-1'
                  >
                    <Input
                      placeholder=''
                      value={option}
                      onChange={(e) => {
                        field.value[index] = e.target.value;
                        field.onChange(field.value);
                      }}
                    />
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={(e) => {
                        e.preventDefault();
                        const newOptions = [...field.value];
                        newOptions.splice(index, 1);
                        field.onChange(newOptions);
                      }}
                    >
                      <AiOutlineClose />
                    </Button>
                  </div>
                ))}
              </div>

              <FormDescription>
                The description of the field. <br /> It will be displayed below
                the field.
              </FormDescription>
            </FormItem>
          )}
        />
        <Separator />

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

        <Separator />
        <Button className='w-full' type='submit'>
          Save
        </Button>
      </form>
    </Form>
  );
}
