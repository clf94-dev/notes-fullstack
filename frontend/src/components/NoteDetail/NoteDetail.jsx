import { Row, Col, Typography, Divider, Button, Form, message } from "antd";
import TagIcon from "@/assets/tag.svg";
import LoadingIcon from "@/assets/loading.svg";
import CircleClockIcon from "@/assets/circle_clock.svg";
import styles from "./NoteDetail.module.css";
import TextArea from "antd/es/input/TextArea";
import { requestEditNote } from "@/services/dashboard";
import moment from "moment";

const { Title, Text } = Typography;

function NoteDetail({ note }) {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = (values) => {
    console.log("Form values:", values);

    requestEditNote(note.id, values)
      .then(() => {
        messageApi.success("Note updated successfully");
      })
      .catch((error) => {
        messageApi.error("Failed to update note");
        console.error("Error updating note:", error);
      });
  };

  const handleCancel = () => {
    form.setFieldValue("content", note.content);
  };

  console.log({ note });
  return (
    <Row gutter={16}>
      {contextHolder}
      <div className={styles.noteDetail}>
        <Title level={3}>{note.title}</Title>

        <Row
          className={styles.noteDetailRow}
          gutter={[8, 16]}
          align="center"
          justify="space-between"
        >
          <Col span={6}>
            <Row>
              {" "}
              <Col span={4}>
                <img src={TagIcon} alt="Tag" className={styles.detailIcon} />
              </Col>
              <Col span={20}>
                <Text>Tags</Text>
              </Col>
            </Row>
          </Col>
          <Col span={18}>
            <Text>{note.tags.map((tag) => tag.name).join(", ")}</Text>
          </Col>
        </Row>

        <Row className={styles.noteDetailRow} align="center">
          <Col span={6}>
            <Row gutter={[8, 16]} align="center">
              {" "}
              <Col span={4}>
                <img
                  src={LoadingIcon}
                  alt="Status"
                  className={styles.detailIcon}
                />
              </Col>
              <Col span={20}>
                <Text> Status</Text>
              </Col>
            </Row>
          </Col>
          <Col span={18}>
            <Text>{note.status}</Text>
          </Col>
        </Row>

        <Row className={styles.noteDetailRow} align="center">
          <Col span={6}>
            <Row>
              {" "}
              <Col span={4}>
                <img
                  src={CircleClockIcon}
                  alt="Last Edited"
                  className={styles.detailIcon}
                />
              </Col>
              <Col span={20}>
                <Text>Last Edited</Text>
              </Col>
            </Row>
          </Col>
          <Col span={18}>
            <Text>{moment(note.updatedAt).format("DD MMM YYYY")}</Text>
          </Col>
        </Row>

        <Divider />
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item name="content">
            <TextArea
              variant="borderless"
              defaultValue={note.content}
              value={note.content}
              autoSize={{ minRows: 17, maxRows: 17 }}
            />
          </Form.Item>
        </Form>

        <Divider />
        <Row gutter={[8, 16]}>
          <Col span={4}>
            <Button className={styles.saveButton} onClick={() => form.submit()}>
              Save Note
            </Button>
          </Col>
          <Col span={4}>
            <Button className={styles.cancelButton} onClick={handleCancel}>
              Cancel
            </Button>
          </Col>
        </Row>
      </div>
    </Row>
  );
}

export default NoteDetail;
