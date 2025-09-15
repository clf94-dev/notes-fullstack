import { Button, Row, Col, Radio, Card } from "antd";
import React from "react";
import SansSerifIcon from "@/assets/sans_serif.svg";
import SerifIcon from "@/assets/serif.svg";
import MonospaceIcon from "@/assets/monospace.svg";
import styles from "./FontTheme.module.css";
import { useTranslation } from "react-i18next";
import SettingsOption from "@/components/common/SettingsOption/SettingsOption";
import { useMemo } from "react";

function ColorTheme() {
  const { t } = useTranslation();
  const [currentTheme, setCurrentTheme] = React.useState("light");
  const colorThemeItems = useMemo(() => {
    return [
      {
        key: "sansserif",
        label: t("settings.font.sans-serif"),
        imageAlt: "Sans serif font preview",
        description: t("settings.font.sans-serifDescription"),
        icon: SansSerifIcon,
      },
      {
        key: "serif",
        label: t("settings.font.serif"),
        imageAlt: "Serif font preview",
        description: t("settings.font.serifDescription"),
        icon: SerifIcon,
      },
      {
        key: "monospace",
        label: t("settings.font.monospace"),
        imageAlt: "Monospace font preview",
        description: t("settings.font.monospaceDescription"),
        icon: MonospaceIcon,
      },
    ];
  }, [t]);
  return (
    <Row className={styles.fontThemeContainer}>
      <Col span={24}>
        <h3 className={styles.sectionTitle}>{t("settings.font.title")}</h3>
      </Col>
      <Col span={24}>
        <span className={styles.sectionSubtitle}>
          {t("settings.font.description")}
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
