import { ElementsType, FormElement } from '@/types/elements';
import { TextFieldFormElement } from './fields/TextField';
import { TitleFieldFormElement } from './fields/TitleField';
import { SubTitleFieldFormElement } from './fields/SubTitleField';
import { ParagrahFieldFormElement } from './fields/ParagraphField';
import { SeparatorFieldFormElement } from './fields/SeparatorField';
import { SpacerFieldFormElement } from './fields/SpacerField';
import { NumberFieldFormElement } from './fields/NumberField';
import { TextAreaFieldFormElement } from './fields/TextAreaField';
import { DateFieldFormElement } from './fields/DateField';
import { SelectFieldFormElement } from './fields/SelectField';
import { CheckboxFieldFormElement } from './fields/CheckboxField';

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TitleField: TitleFieldFormElement,
  SubTitleField: SubTitleFieldFormElement,
  ParagraphField: ParagrahFieldFormElement,
  SeparatorField: SeparatorFieldFormElement,
  SpacerField: SpacerFieldFormElement,
  TextField: TextFieldFormElement,
  NumberField: NumberFieldFormElement,
  TextAreaField: TextAreaFieldFormElement,
  DateField: DateFieldFormElement,
  SelectField: SelectFieldFormElement,
  CheckboxField: CheckboxFieldFormElement,
};

export const layoutElementsList: FormElement[] = [
  FormElements.TitleField,
  FormElements.SubTitleField,
  FormElements.ParagraphField,
  FormElements.SeparatorField,
  FormElements.SpacerField,
];

export const formElementsList: FormElement[] = [
  FormElements.TextField,
  FormElements.NumberField,
  FormElements.TextAreaField,
  FormElements.DateField,
  FormElements.SelectField,
  FormElements.CheckboxField,
];
