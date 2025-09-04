import { Row, Col, Button, message } from "antd";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  requestNotes,
  requestArchiveNote,
  requestDeleteNote,
  requestRestoreNote,
} from "@/services/dashboard";
import styles from "./Notes.module.css";

import NoteDetail from "@/components/NoteDetail/NoteDetail";
import NoteCard from "@/components/NoteCard/NoteCard";

function Notes() {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  const [notesList, setNotesList] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  const requestNotesList = () => {
    requestNotes()
      .then((data) => {
        setNotesList(data);
        setSelectedNote(data[0] || null);
      })
      .catch((error) => {
        message.error(error);
      });
  };

  useEffect(() => {
    requestNotesList();
  }, []);

  const handleUnarchive = (id) => {
    requestRestoreNote(id)
      .then(() => {
        messageApi.success("Note restored successfully");
        requestNotesList();
      })
      .catch((error) => {
        messageApi.error("Failed to restore note");
        console.error("Error restoring note:", error);
      });
  };

  const handleArchive = (id) => {
    requestArchiveNote(id)
      .then(() => {
        messageApi.success("Note archived successfully");
        requestNotesList();
      })
      .catch((error) => {
        messageApi.error("Failed to archive note");
        console.error("Error archiving note:", error);
      });
  };

  const handleDelete = (id) => {
    requestDeleteNote(id)
      .then(() => {
        messageApi.success("Note deleted successfully");
        requestNotesList();
      })
      .catch((error) => {
        messageApi.error("Failed to delete note");
        console.error("Error deleting note:", error);
      });
  };

  console.log({ notesList });

  return (
    <div>
      {contextHolder}
      <Row className={styles.notesPage} gutter={16}>
        <Col span={6} className={styles.notesList}>
          <Button className={styles.createNoteBtn}>{t("createBtn")}</Button>

          <Row>
            {notesList.length ? (
              notesList.map((note) => (
                <NoteCard
                  note={note}
                  setSelectedNote={setSelectedNote}
                  selectedNote={selectedNote}
                />
              ))
            ) : (
              <div>No notes found</div>
            )}
          </Row>
        </Col>
        {selectedNote ? (
          <>
            <Col span={14} className={styles.noteDetail}>
              {selectedNote ? <NoteDetail note={selectedNote} /> : null}
            </Col>
            <Col span={4} className={styles.actionsCol}>
              {selectedNote.status === "active" ? (
                <Button
                  className={styles.archiveButton}
                  onClick={() => handleArchive(selectedNote.id)}
                >
                  Archive Note
                </Button>
              ) : (
                <Button
                  className={styles.unarchiveButton}
                  onClick={() => handleUnarchive(selectedNote.id)}
                >
                  Restore Note
                </Button>
              )}
              <Button
                className={styles.deleteButton}
                onClick={() => handleDelete(selectedNote.id)}
              >
                Delete Note
              </Button>
            </Col>
          </>
        ) : null}
      </Row>
    </div>
  );
}

export default Notes;
