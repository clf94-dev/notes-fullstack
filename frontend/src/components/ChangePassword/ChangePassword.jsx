import { Form, Input, Button, message, Row, Col } from "antd";
import { requestChangePassword } from "@/services/settings";
import { useTranslation } from "react-i18next";
import styles from "./ChangePassword.module.css";
import { InfoCircleOutlined } from "@ant-design/icons";

const ChangePassword = () => {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  const handleOnFinish = (values) => {
    console.log("Received values of form: ", values);

    const body = {
      oldPassword: values.currentPassword,
      newPassword: values.newPassword,
    };
    console.log({ body });
    requestChangePassword(body)
      .then(() => {
        messageApi.success("Password changed successfully");
      })
      .catch((error) => {
        messageApi.error(t(`settings.changePassword.${error}`));
      });
  };

  return (
    <div>
      {contextHolder}
      <h2 className={styles.title}>{t("settings.changePassword.title")}</h2>
      <Form
        name="changePassword"
        layout="vertical"
        onFinish={handleOnFinish}
        style={{ maxWidth: 500 }}
        autoComplete="off"
      >
        <Form.Item
          label={t("settings.changePassword.currentPassword")}
          name="currentPassword"
          rules={[
            {
              required: true,
              message: t("settings.changePassword.currentPasswordRequired"),
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label={t("settings.changePassword.newPassword")}
          name="newPassword"
          rules={[
            {
              required: true,
              message: t("settings.changePassword.passwordRequired"),
            },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
              message: t("settings.changePassword.passwordPattern"),
            },
            {
              min: 8,
              message: t("settings.changePassword.passwordMinLength"),
            },
            {
              max: 20,
              message: t("settings.changePassword.passwordMaxLength"),
            },
          ]}
          extra={
            <div className={styles.extraInfo}>
              <InfoCircleOutlined />{" "}
              {t("settings.changePassword.passwordPattern")}
            </div>
          }
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label={t("settings.changePassword.confirmNewPassword")}
          name="confirmNewPassword"
          dependencies={["newPassword"]}
          rules={[
            {
              required: true,
              message: t("settings.changePassword.confirmPasswordRequired"),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(t("settings.changePassword.passwordMismatch"))
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Row justify="end" align="middle" gutter={16}>
          <Col span={7}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {t("settings.changePassword.submitButton")}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ChangePassword;
