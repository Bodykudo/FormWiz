import { ElementType, FC } from 'react';

export type ElementsType =
  | 'TextField'
  | 'TitleField'
  | 'SubTitleField'
  | 'ParagraphField'
  | 'SeparatorField'
  | 'SpacerField'
  | 'NumberField'
  | 'TextAreaField'
  | 'DateField'
  | 'SelectField'
  | 'CheckboxField';

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

export type SubmitFunction = (key: string, value: string) => void;

export type DesignerComponentProps = {
  elementInstance: FormElementInstance;
};

export type FormComponentProps = {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  defaultValue?: string;
  isInvalid?: boolean;
};

export type PropertiesComponentProps = {
  elementInstance: FormElementInstance;
};

export type FormElement = {
  type: ElementsType;

  construct: (id: string) => FormElementInstance;

  designerButtonElement: {
    icon: ElementType;
    label: string;
  };

  designerComponent: FC<DesignerComponentProps>;
  formComponent: FC<FormComponentProps>;
  propetiesComponent: FC<PropertiesComponentProps>;

  validate: (formElement: FormElementInstance, currentValue: string) => boolean;
};
