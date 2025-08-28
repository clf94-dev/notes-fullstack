import React from "react";
import { Card, Form, Input, Button, Divider, Col, Row, message } from "antd";
import styles from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { requestSignUp } from "@/services/Login";
import { InfoCircleOutlined } from "@ant-design/icons";

import NotesIcon from "@/assets/notes_logo.svg";

function SignUp() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const { t } = useTranslation();

  const handleOnFinish = (values) => {
    if (!values.email || !values.password) {
      return;
    }

    requestSignUp(values)
      .then(() => {
        messageApi.open({
          content: "Account created successfully",
          type: "success",
        });
        navigate("/login");
      })
      .catch((error) => {
        messageApi.error(error || "Account creation failed");
      });
  };

  return (
    <div className={styles.container}>
      {contextHolder}
      <Card className={styles.loginCard}>
        <img src={NotesIcon} alt="Notes Logo" className={styles.logo} />
        <h2 className={styles.welcome}>{t("signUp.title")}</h2>
        <p className={styles.subtitle}>{t("signUp.subtitle")}</p>

        <Form
          name="login"
          form={form}
          initialValues={{ remember: true }}
          onFinish={handleOnFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label={t("signUp.username")}
            name="email"
            className={styles.formItem}
            rules={[
              {
                required: true,
                type: "email",
                message: t("signUp.emailRequired"),
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={t("signUp.password")}
            name="password"
            className={styles.formItem}
            rules={[
              { required: true, message: t("signUp.passwordRequired") },
              { min: 8, message: t("signUp.passwordMinLength") },
              { max: 20, message: t("signUp.passwordMaxLength") },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                message: t("signUp.passwordPattern"),
              },
            ]}
            extra={
              <Row gutter={8}>
                <Col span={1}>
                  <InfoCircleOutlined className={styles.icon} />
                </Col>
                <Col span={23} className={styles.passwordInfo}>
                  <p>{t("signUp.passwordInfo1")}</p>
                  <p>{t("signUp.passwordInfo2")}</p>
                </Col>
              </Row>
            }
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Button
              className={styles.btnSign}
              type="primary"
              htmlType="submit"
              onClick={form.submit()}
            >
              {t("signUp.signBtn")}
            </Button>
          </Form.Item>

          <Divider className={styles.divider} />
          <p className={styles.noAccount}>
            {t("signUp.haveAccount")}{" "}
            <a className={styles.signUp} onClick={() => navigate("/login")}>
              {t("signUp.login")}
            </a>{" "}
          </p>
        </Form>
      </Card>
    </div>
  );
}

export default SignUp;
