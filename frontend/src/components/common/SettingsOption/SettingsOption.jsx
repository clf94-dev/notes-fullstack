import { Card, Col, Radio, Row } from "antd";

import styles from "./SettingsOption.module.css";

function SettingsOption({ item, onSelect }) {
  return (
    <Card
      key={item.key}
      className={styles.optionCard}
      onClick={() => {
        onSelect(item.key);
      }}
    >
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
  );
}

export default SettingsOption;
