/* import styles from "./SideMenu.module.css"; */
import { Menu, message } from "antd";
import Sider from "antd/es/layout/Sider";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTagsData } from "@/services/dashboard";
import Home from "@/assets/home.svg";
import ArchiveNotes from "@/assets/archive_notes.svg";
import TagIcon from "@/assets/tag.svg";
import NotesIcon from "@/assets/notes_logo.svg";

import styles from "./SideMenu.module.css";
import { useTranslation } from "react-i18next";

function SideMenu() {
  const [currentKey, setCurrentKey] = useState("notes");
  const { t } = useTranslation();
  const [tagsList, setTagsList] = useState([]);
  const navigate = useNavigate();

  const handleMenuChange = (item) => {
    setCurrentKey(item.key);
    navigate(`/${item.key}`);
  };

  useEffect(() => {
    fetchTagsData()
      .then((data) => {
        setTagsList(data);
      })
      .catch((error) => {
        message.error(error);
      });
  }, []);

  console.log({ tagsList, currentKey });

  const menuItems = useMemo(
    () => [
      {
        label: <img src={NotesIcon} alt="Notes Logo" className={styles.logo} />,
        key: "logo",
        icon: null,
        disabled: true,
      },
      {
        label: t("sideMenu.notes"),
        key: "notes",
        icon: (
          <img
            className={currentKey === "notes" ? styles.selectedIcon : ""}
            src={Home}
            alt="Home"
          />
        ),
      },
      {
        label: t("sideMenu.archivedNotes"),
        key: "archive",
        icon: (
          <img
            className={currentKey === "archive" ? styles.selectedIcon : ""}
            src={ArchiveNotes}
            alt="Archive Notes"
          />
        ),
      },
      {
        label: t("sideMenu.tags"),
        key: "tags",
        children: tagsList.map((tag) => ({
          label: tag.name,
          icon: (
            <img
              className={currentKey === "archive" ? styles.selectedIcon : ""}
              src={TagIcon}
              alt="Tag"
            />
          ),
          key: `tag-${tag.id}`,
        })),
      },
    ],
    [tagsList]
  );

  return (
    <Sider>
      <Menu
        defaultSelectedKeys={[currentKey]}
        onClick={handleMenuChange}
        items={menuItems}
        value={[currentKey]}
        defaultOpenKeys={["tags"]}
        mode="inline"
        className={styles.sideMenu}
      />
    </Sider>
  );
}

export default SideMenu;
