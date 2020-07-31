import { IPreferences, Locale } from "@types";

export interface IProps {
  preferences: IPreferences;
  localesOptions?: Array<{
    localeCode: string;
    localeName: string;
  }>;
  formId?: string;
  formRef?: React.RefObject<HTMLFormElement>;
  handleSubmit?: (formData: IPreferences) => void;
  handleChange?: (e: React.ChangeEvent) => void;
  handleBlur?: (e: React.FocusEvent) => void;
  testingContext?: string;
}

export interface IPreferencesFormValues extends Omit<IPreferences, "locale"> {
  locale: {
    localeCode: Locale;
    localeName: string;
  };
}
