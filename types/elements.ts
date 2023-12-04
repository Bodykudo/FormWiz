import { ElementType, FC } from 'react';

export type ElementsType = 'TextField';

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

export type FormElement = {
  type: ElementsType;

  construct: (id: string) => FormElementInstance;

  designerButtonElement: {
    icon: ElementType;
    label: string;
  };

  designerComponent: FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: FC;
  propetiesComponent: FC<{
    elementInstance: FormElementInstance;
  }>;
};
