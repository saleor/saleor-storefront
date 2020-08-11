import { Formik } from "formik";
import React from "react";
import { useIntl } from "react-intl";
import { InputSelect } from "@components/molecules";
import { commonMessages } from "@temp/intl";
import { localeNames } from "@temp/components/Locale";
import { Locale } from "@types";
import * as S from "./styles";
import { IProps, IPreferencesFormValues } from "./types";

export const PreferencesForm: React.FC<IProps> = ({
  preferences,
  handleSubmit,
  formId,
  localesOptions,
  testingContext,
  formRef,
}: IProps) => {
  const intl = useIntl();

  const { locale: localeCode, ...commonFields } = preferences;
  const formPreferences: IPreferencesFormValues = {
    locale: {
      localeCode,
      localeName: localeNames[localeCode],
    },
    ...commonFields,
  };

  return (
    <Formik
      initialValues={formPreferences}
      onSubmit={(values: IPreferencesFormValues, { setSubmitting }) => {
        if (handleSubmit) {
          const { locale, ...commonFields } = values;
          handleSubmit({ locale: locale.localeCode, ...commonFields });
        }
        setSubmitting(false);
      }}
    >
      {({ handleSubmit, values, setFieldValue }) => (
        <S.LocaleSelectForm
          id={formId}
          onSubmit={handleSubmit}
          ref={formRef}
          data-test={testingContext}
        >
          <S.Wrapper>
            <S.RowWithOneCell>
              <InputSelect
                defaultValue={preferences?.locale}
                label={intl.formatMessage(commonMessages.language)}
                name="locale"
                options={localesOptions}
                value={localesOptions?.find(
                  option => option.localeCode === values.locale.localeCode
                )}
                onChange={(value: Locale, name: string) =>
                  setFieldValue(name, value)
                }
                optionLabelKey="localeName"
                optionValueKey="localeCode"
                autoComplete="locale"
              />
            </S.RowWithOneCell>
          </S.Wrapper>
        </S.LocaleSelectForm>
      )}
    </Formik>
  );
};
