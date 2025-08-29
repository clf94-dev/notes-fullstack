import { Menu, Row, Col, Tabs } from "antd";
import { Outlet } from "react-router-dom";
import { MEDIA_QUERIES } from "@/utils/constants";
import { useMediaQuery } from "@/utils/hooks";
import SideMenu from "@/components/SideMenu/SideMenu";

function AppLayout() {
  const isTablet = useMediaQuery(MEDIA_QUERIES.tablet);
  const isDesktop = useMediaQuery(MEDIA_QUERIES.desktop);
  return (
    <Row>
      {isDesktop && (
        <Col span={4}>
          <SideMenu />
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
