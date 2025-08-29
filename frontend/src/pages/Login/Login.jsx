import React from "react";
import { Card, Form, Input, Button, Divider, Col, Row, message } from "antd";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { requestLogin } from "@/services/Login";

import Icon from "@ant-design/icons";

import NotesIcon from "@/assets/notes_logo.svg";

function Login() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const { t } = useTranslation();

  const handleOnFinish = (values) => {
    if (!values.email || !values.password) {
      return;
    }

    requestLogin(values)
      .then((data) => {
        localStorage.setItem("token", data);
        navigate("/notes");
      })
      .catch((error) => {
        console.log({ error });
        messageApi.error(error || "Login failed");
      });
  };

  return (
    <div className={styles.container}>
      {contextHolder}
      <Card className={styles.loginCard}>
        <img src={NotesIcon} alt="Notes Logo" className={styles.logo} />
        <h2 className={styles.welcome}>{t("login.welcome")}</h2>
        <p className={styles.subtitle}>{t("login.pleaseLogin")}</p>

        <Form
          name="login"
          form={form}
          initialValues={{ remember: true }}
          onFinish={handleOnFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label={t("login.username")}
            name="email"
            className={styles.formItem}
            rules={[
              {
                required: true,
                type: "email",
                message: t("login.emailRequired"),
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={t("login.password")}
            name="password"
            className={styles.formItem}
            rules={[
              { required: true, message: t("login.passwordRequired") },
              { min: 8, message: t("login.passwordMinLength") },
              { max: 20, message: t("login.passwordMaxLength") },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                message: t("login.passwordPattern"),
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Row justify="end" align={"middle"}>
            <Col span={12} className={styles.forgotPassword}>
              <a onClick={() => navigate("/forgot-password")}>
                {t("login.forgotPass")}
              </a>
            </Col>
          </Row>

          <Form.Item label={null}>
            <Button
              className={styles.btnLogin}
              type="primary"
              htmlType="submit"
              onClick={form.submit()}
            >
              {t("login.loginButton")}
            </Button>
          </Form.Item>

          <Divider className={styles.divider} />
          <p className={styles.noAccount}>
            {t("login.noAccount")}{" "}
            <a className={styles.signUp} onClick={() => navigate("/sign-up")}>
              {t("login.signUp")}
            </a>{" "}
          </p>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
