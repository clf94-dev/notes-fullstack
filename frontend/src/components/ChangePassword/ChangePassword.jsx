import { Form, Input, Button, message } from "antd";
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
        messageApi.error(error);
      });
  };

  return (
    <div>
      {contextHolder}
      <h2 className={styles.title}>Change Password</h2>
      <Form
        name="changePassword"
        layout="vertical"
        onFinish={handleOnFinish}
        style={{ maxWidth: 500 }}
        autoComplete="off"
      >
        <Form.Item
          label="Current Password"
          name="currentPassword"
          rules={[
            { required: true, message: "Please input your current password!" },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            { required: true, message: "Please input your new password!" },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
              message: t("login.passwordPattern"),
            },
          ]}
          extra={
            <div className={styles.extraInfo}>
              <InfoCircleOutlined /> Password must be at least 8 characters long
              and include uppercase letters, lowercase letters, and numbers.
            </div>
          }
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm New Password"
          name="confirmNewPassword"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Please confirm your new password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item labelAlign="right">
          <Button type="primary" htmlType="submit">
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
