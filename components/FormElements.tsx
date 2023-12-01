import { ElementsType, FormElement } from '@/types/elements';
import { TextFieldFormElement } from './fields/TextField';

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
};
