import moment from "moment";
import { Card, Typography, Tag, Row } from "antd";
import styles from "./NoteCard.module.css";

const { Title, Text } = Typography;

export default function NoteCard({ note }) {
  return (
    <div key={note.id} className={styles.noteCard}>
      <Title level={5} className={styles.title}>
        {note.title}
      </Title>

      <Row gutter={[8, 16]}>
        {note.tags?.map((tag) => (
          <Tag key={tag.id} bordered={false} className={styles.tag}>
            {tag.name}
          </Tag>
        )) || null}
      </Row>

      <Text className={styles.date}>
        {moment(note.createdAt).format("DD MMM YYYY")}
      </Text>
    </div>
  );
}
