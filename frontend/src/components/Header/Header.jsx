import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { Row, Col, Button, Input } from "antd";
import styles from "./Header.module.css";
import { SettingOutlined, SearchOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Search } = Input;

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const headerText = useMemo(() => {
    const isTagSearch = location.pathname.startsWith("/tagged")
      ? "/tagged"
      : undefined;
    switch (isTagSearch || location.pathname) {
      case "/notes":
        return t("header.notes");
      case "/archive":
        return t("header.archivedNotes");
      case "/settings":
        return t("header.settings");
      case "/tagged":
        return t("header.taggedNotes", {
          tag: location.pathname.split("/").pop(),
        });
      default:
        return t("header.notFound");
    }
  }, [location]);

  const onSearch = (value) => console.log(value);

  console.log({ location, headerText });

  return (
    <Row
      className={styles.headerContainer}
      justify="space-between"
      align="center"
    >
      <Col span={5}>
        <h2>{headerText}</h2>
      </Col>
      <Col span={19} className={styles.actionsCol}>
        <Row
          justify="end"
          align="center"
          className={styles.actionsRow}
          gutter={[16, 8]}
        >
          <Col span={12}>
            <Input
              className={styles.searchInput}
              prefix={<SearchOutlined />}
              placeholder={t("header.searchPlaceholder")}
              onSearch={onSearch}
            />
          </Col>
          <Col span={2}>
            <Button
              type="text"
              className={styles.settingsButton}
              onClick={() => navigate("/settings")}
            >
              <SettingOutlined />
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Header;
