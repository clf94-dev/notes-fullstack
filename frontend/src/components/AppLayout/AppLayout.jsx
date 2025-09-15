import { Menu, Row, Col, Tabs } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { MEDIA_QUERIES } from "@/utils/constants";
import { useMediaQuery } from "@/utils/hooks";
import SideMenu from "@/components/SideMenu/SideMenu";
import Header from "@/components/Header/Header";
import styles from "./AppLayout.module.css";

function AppLayout() {
  const isTablet = useMediaQuery(MEDIA_QUERIES.tablet);
  const isDesktop = useMediaQuery(MEDIA_QUERIES.desktop);

  const [currentTag, setCurrentTag] = useState(null);
  const [currentSearchString, setCurrentSearchString] = useState("");

  return (
    <Row className={styles.appLayout} gutter={16}>
      {isDesktop && (
        <Col span={5} className={styles.sideMenuCol}>
          <SideMenu setCurrentTag={setCurrentTag} />
        </Col>
      )}
      <Col className={styles.mainContent} span={isDesktop ? 19 : 24}>
        <main>
          {isDesktop && (
            <Header setCurrentSearchString={setCurrentSearchString} />
          )}

          <div className="content">
            <Outlet context={{ currentTag, currentSearchString }} />
          </div>
        </main>
      </Col>
      {isTablet ? (
        <Col span={24}>
          <Tabs
            tabPosition="bottom"
            items={Array.from({ length: 3 }).map((_, i) => {
              const id = String(i + 1);
              return {
                label: `Tab ${id}`,
                key: id,
                children: `Content of Tab ${id}`,
              };
            })}
          />
        </Col>
      ) : null}
    </Row>
  );
}

export default AppLayout;
