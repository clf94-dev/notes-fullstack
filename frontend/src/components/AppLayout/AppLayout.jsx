import { Menu, Row, Col, Tabs } from "antd";
import Sider from "antd/es/layout/Sider";
import { Outlet } from "react-router-dom";
import { MEDIA_QUERIES } from "@/utils/constants";
import { useMediaQuery } from "@/utils/hooks";

function AppLayout() {
  const isTablet = useMediaQuery(MEDIA_QUERIES.tablet);
  const isDesktop = useMediaQuery(MEDIA_QUERIES.desktop);
  return (
    <Row>
      {isDesktop && (
        <Col span={4}>
          <Sider>
            <Menu
              items={[
                { label: "Notes", key: "notes" },
                { label: "Settings", key: "settings" },
              ]}
            />
          </Sider>
        </Col>
      )}
      <Col span={isDesktop ? 20 : 24}>
        <main className="main">
          <header className="topbar">Welcome!</header>

          <div className="content">
            <Outlet />
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
