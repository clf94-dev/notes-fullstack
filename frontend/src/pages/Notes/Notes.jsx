import { Row, Col, Button, Card, Typography, Tag, message } from "antd";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { requestNotes } from "@/services/dashboard";
import styles from "./Notes.module.css";

import NoteCard from "@/components/NoteCard/NoteCard";

const { Title, Text } = Typography;

function Notes() {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  const [notesList, setNotesList] = useState([]);

  useEffect(() => {
    requestNotes()
      .then((data) => {
        setNotesList(data);
      })
      .catch((error) => {
        message.error(error);
      });
  }, []);

  console.log({ notesList });

  return (
    <div>
      {contextHolder}
      <Row className={styles.notesPage} gutter={16}>
        <Col span={8} className={styles.notesList}>
          <Button className={styles.createNoteBtn}>{t("createBtn")}</Button>

          <Row>
            {notesList.length ? (
              notesList.map((note) => <NoteCard note={note} />)
            ) : (
              <div>No notes found</div>
            )}
          </Row>
        </Col>
        <Col span={16} className={styles.noteDetail}>
          <Row gutter={16}>
            <div> Note detail</div>
            {/* {notes.map((note) => (
              <Col span={8} key={note.id}>
                <NoteCard note={note} />
              </Col>
            ))} */}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Notes;
