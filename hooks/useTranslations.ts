import { useRouter } from "next/router";
import { useMemo } from "react";
import en from "../locales/en.json";

export const useTranslations = () => {
  const { locale } = useRouter();

  const translations = useMemo(() => {
    switch (locale) {
      case "en":
        return en;
      default:
        return en;
    }
  }, [locale]);

  return translations;
};
