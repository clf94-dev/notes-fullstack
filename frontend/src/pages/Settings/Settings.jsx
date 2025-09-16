import { Row, Col, Button, message, Divider } from "antd";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import ColorTheme from "@/components/ColorTheme/ColorTheme";
import FontTheme from "@/components/FontTheme/FontTheme";
import ChangePassword from "@/components/ChangePassword/ChangePassword";
import LanguageMenu from "@/components/LanguageMenu/LanguageMenu";

import ColorIcon from "@/assets/light_mode.svg";
import FontIcon from "@/assets/type.svg";
import LanguageIcon from "@/assets/type.svg";
import PasswordIcon from "@/assets/lock.svg";
import LogoutIcon from "@/assets/logout.svg";

import styles from "./Settings.module.css";

function Settings() {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedTab, setSelectedTab] = useState("profile");

  const settingsMenu = useMemo(() => {
    return [
      {
        key: "color",
        label: (
          <div className={styles.settingsLabel}>
            <img src={ColorIcon} alt="color icon" className={styles.icon} />
            {t("settings.color.menu")}
          </div>
        ),
        children: <ColorTheme />,
      },
      {
        key: "font",
        label: (
          <div className={styles.settingsLabel}>
            <img src={FontIcon} alt="font icon" className={styles.icon} />
            {t("settings.font.menu")}
          </div>
        ),
        children: <FontTheme />,
      },
      {
        key: "language",
        label: (
          <div className={styles.settingsLabel}>
            <img
              src={LanguageIcon}
              alt="language icon"
              className={styles.icon}
            />
            {t("settings.language.menu")}
          </div>
        ),
        children: <LanguageMenu />,
      },
      {
        key: "password",
        label: (
          <div className={styles.settingsLabel}>
            <img
              src={PasswordIcon}
              alt="password icon"
              className={styles.icon}
            />
            {t("settings.password")}
          </div>
        ),
        children: <ChangePassword />,
      },
    ];
  }, [t]);

  const handleLougout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div>
      {contextHolder}
      <Row className={styles.settingsPage} gutter={16} justify="start">
        <Col span={6} className={styles.settingsList}>
          <Row>
            {settingsMenu.map((item) => (
              <Col key={item.key} span={24}>
                <Button
                  type="text"
                  className={`styles.settingsButton ${
                    selectedTab === item.key ? styles.activeButton : ""
                  }`}
                  block
                  onClick={() => setSelectedTab(item.key)}
                >
                  {item.label}
                </Button>
              </Col>
            ))}
            <Divider className={styles.divider} />

            <Col span={24}>
              <Button
                type="text"
                block
                className={styles.logoutButton}
                onClick={handleLougout}
              >
                <img
                  src={LogoutIcon}
                  alt="logout icon"
                  className={styles.icon}
                />
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
