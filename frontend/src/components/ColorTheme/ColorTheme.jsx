import { Button, Row, Col, Radio, Card } from "antd";
import React from "react";
import LightModeIcon from "@/assets/light_mode.svg";
import DarkModeIcon from "@/assets/dark_mode.svg";
import SystemModeIcon from "@/assets/system_mode.svg";
import styles from "./ColorTheme.module.css";
import { useTranslation } from "react-i18next";
import SettingsOption from "@/components/common/SettingsOption/SettingsOption";
import { useMemo } from "react";

function ColorTheme() {
  const { t } = useTranslation();
  const [currentTheme, setCurrentTheme] = React.useState("light");
  const colorThemeItems = useMemo(() => {
    return [
      {
        key: "light",
        label: t("settings.color.light"),
        imageAlt: "Light Theme Preview",
        description: t("settings.color.lightDescription"),
        icon: LightModeIcon,
      },
      {
        key: "dark",
        label: t("settings.color.dark"),
        imageAlt: "Dark Theme Preview",
        description: t("settings.color.darkDescription"),
        icon: DarkModeIcon,
      },
      {
        key: "system",
        label: t("settings.color.system"),
        imageAlt: "System Theme Preview",
        description: t("settings.color.systemDescription"),
        icon: SystemModeIcon,
      },
    ];
  }, [t]);
  return (
    <Row className={styles.colorThemeContainer}>
      <Col span={24}>
        <h3 className={styles.sectionTitle}>{t("settings.color.title")}</h3>
      </Col>
      <Col span={24}>
        <span className={styles.sectionSubtitle}>
          {t("settings.color.description")}
        </span>
      </Col>
      <Col span={24}>
        <Radio.Group value={currentTheme} className={styles.radioGroup}>
          {colorThemeItems.map((item) => (
            <SettingsOption
              key={item.key}
              item={item}
              onSelect={() => setCurrentTheme(item.key)}
            />
          ))}
        </Radio.Group>
      </Col>
      <Button type="primary" className={styles.saveButton}>
        Save Changes
      </Button>
    </Row>
  );
}

export default ColorTheme;
