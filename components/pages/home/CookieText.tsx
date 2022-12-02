import React from "react";
import { useTranslations } from "../../../hooks";
import AppText from "../../common/AppText";

const CookieText = () => {
  const t = useTranslations();
  return <AppText fontSize="xs">{t.form.cookieText}</AppText>;
};

export default CookieText;
