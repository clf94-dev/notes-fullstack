import React from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "antd";
import styles from "./LanguageMenu.module.css";

const LanguageMenu = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={styles.languageMenu}>
      <h3 className={styles.title}>{t("settings.language.title")}</h3>
      <Switch
        className={styles.switch}
        size="large"
        checkedChildren={t("settings.language.english")}
        unCheckedChildren={t("settings.language.spanish")}
        onChange={(checked) => changeLanguage(checked ? "en" : "es")}
      />
    </div>
  );
};
export default LanguageMenu;
