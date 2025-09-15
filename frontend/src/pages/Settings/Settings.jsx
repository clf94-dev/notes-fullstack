import { Row, Col, Button, message, Typography, Divider } from "antd";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import ColorTheme from "@/components/ColorTheme/ColorTheme";

import styles from "./Settings.module.css";

import { useLocation } from "react-router-dom";

const { Text } = Typography;

function Settings() {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedTab, setSelectedTab] = useState("profile");

  const settingsMenu = useMemo(() => {
    return [
      {
        key: "color",
        label: t("settings.color.menu"),
        children: <ColorTheme />,
      },
      {
        key: "font",
        label: t("settings.font"),
        children: <div> font theme</div>,
      },
      {
        key: "language",
        label: t("settings.language"),
        children: <div> language theme</div>,
      },
      {
        key: "password",
        label: t("settings.password"),
        children: <div> change password</div>,
      },
    ];
  }, [t]);

  return (
    <div>
      {contextHolder}
      <Row className={styles.settingsPage} gutter={16}>
        <Col span={6} className={styles.settingsList}>
          <Row>
            {settingsMenu.map((item) => (
              <Col key={item.key} span={24}>
                <Button
                  type="text"
                  className={styles.settingsButton}
                  onClick={() => setSelectedTab(item.key)}
                >
                  {item.label}
                </Button>
              </Col>
            ))}
            <Divider />

            <Col span={24}>
              <Button
                type="text"
                className={styles.loginButton}
                onClick={() => console.log("Logout clicked")}
              >
                {t("settings.logout")}
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={18} className={styles.settingDetail}>
          {settingsMenu.find((item) => item.key === selectedTab)?.children}
        </Col>
      </Row>
    </div>
  );
}

export default Settings;
