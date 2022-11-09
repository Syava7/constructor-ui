import React, { createContext, useContext } from "react";

const translations = {
  ua: {
    FORM_NAME: "Ім'я:",
    FORM_PHONE: "Номер телефону:",
    FORM_EMAIL: "Email:",
    FORM_MESSAGE: "Коментар:",
    FORM_PRIVACY_1: "Натискаючи “Надіслати” ви погоджуєтесь на обробку ",
    FORM_PRIVACY_2: "персональних даних",
    FORM_SEND: "Надіслати",
  },
  ru: {
    FORM_NAME: "Имя:",
    FORM_PHONE: "Номер телефона:",
    FORM_EMAIL: "Email:",
    FORM_MESSAGE: "Комментарий:",
    FORM_PRIVACY_1: "Нажимая “Отправить” вы соглашаетесь на обработку ",
    FORM_PRIVACY_2: "персональных данных",
    FORM_SEND: "Отправить",
  },
  en: {
    FORM_NAME: "Name:",
    FORM_PHONE: "Phone number:",
    FORM_EMAIL: "Email:",
    FORM_MESSAGE: "Message",
    FORM_PRIVACY_1: 'By clicking "Send" you agree to the processing of ',
    FORM_PRIVACY_2: "personal data",
    FORM_SEND: "Send",
  },
};

export const LanguageContext = createContext({
  translationsOvverride: {
    ua: {},
    ru: {},
    en: {},
  },
  currentLanguage: "ua",
});

export const LanguageProvider = ({
  translationsOvverride = {
    ua: {},
    ru: {},
    en: {},
  },
  currentLanguage = "ua",
  children,
}) => {
  return (
    <LanguageContext.Provider
      value={{ translationsOvverride, currentLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const { translationsOvverride, currentLanguage } =
    useContext(LanguageContext);

  /**
   *
   * @param {keyof typeof translations['ua']} translationCode
   * @returns {string}
   */
  return function t(translationCode) {
    if (translationCode in translationsOvverride[currentLanguage]) {
      return translationsOvverride[currentLanguage][translationCode];
    }

    return translationCode in translations[currentLanguage]
      ? translations[currentLanguage][translationCode]
      : translationCode;
  };
};
