import { Button, Row, Col, Radio, Card } from "antd";
import LightModeIcon from "@/assets/light_mode.svg";
import DarkModeIcon from "@/assets/dark_mode.svg";
import SystemModeIcon from "@/assets/system_mode.svg";
import styles from "./ColorTheme.module.css";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

function ColorTheme() {
  const { t } = useTranslation();
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
        <Radio.Group>
          {colorThemeItems.map((item) => (
            <Card key={item.key} className={styles.optionCard}>
              <Row justify="space-between" align="middle">
                <Col span={1}>
                  <div className={styles.iconContainer}>
                    <img
                      src={item.icon}
                      alt={item.imageAlt}
                      className={styles.themeIcon}
                    />
                  </div>
                </Col>
                <Col span={19}>
                  <h4 className={styles.themeTitle}>{item.label}</h4>
                  <p className={styles.themeDescription}>{item.description}</p>
                </Col>

                <Col span={1} className={styles.radioCol}>
                  <Radio value={item.key}></Radio>
                </Col>
              </Row>
            </Card>
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
