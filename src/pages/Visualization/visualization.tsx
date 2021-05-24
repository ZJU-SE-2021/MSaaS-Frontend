// @ts-ignore
import GridLayout from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import TopX from "./components/TopX";
import ProvinceGDP from "./components/ProvinceGDP";
import GlobalTrend from "./components/GlobalTrend";
import AgePatients from "./components/AgePatients";
import ProvinceCase from "./components/ProvinceCase";
import {Card} from "antd";

import './visualization.less'
import "antd/dist/antd.css";
import styles from "./styles/Home.module.css";

export default () => {
  const layout = [
    {i: "a", x: 10, y: 0, w: 6, h: 13},
    {i: "c", x: 0, y: 20, w: 6, h: 13},
    {i: "d", x: 6, y: 20, w: 4, h: 13},
    {i: "e", x: 8, y: 22, w: 8, h: 10},
    {i: "f", x: 0, y: 22, w: 8, h: 10},
  ];

  const bodyStyle = {
    margin: 0,
    padding: 0,
    width: "100%",
    height: "100%",
    // position: "absolute",
  };

  const cardStyle = {
    height: "calc(100% - 55px)",
    background: "#242a38"
  }

  return (
    <div className={styles.container}>
        <div style={bodyStyle}>
          <GridLayout
            className="layout"
            layout={layout}
            cols={30}
            rowHeight={30}
            width={3000}
          >
            <div key="a">
              <Card
                title="世界累计感染人数"
                style={{height: "100%"}}
                bodyStyle={cardStyle}
              >
                <p style={{height: "100%"}}>
                  <TopX/>
                </p>
              </Card>
            </div>
            <div key="c" style={{height: "100%"}}>
              <Card
                title="各省份产业结构转变"
                style={{height: "100%"}}
                bodyStyle={cardStyle}
              >
                <p style={{height: "100%"}}>
                  <ProvinceGDP/>
                </p>
              </Card>
            </div>
            <div key="d">
              <Card
                title="全球疫情趋势"
                style={{height: "100%"}}
                bodyStyle={cardStyle}
              >
                <p style={{height: "100%"}}>
                  <GlobalTrend/>
                </p>
              </Card>
            </div>
            <div key="e">
              <Card
                title="患者随时间的年龄段比例"
                style={{height: "100%"}}
                bodyStyle={cardStyle}
              >
                <p style={{height: "100%"}}>
                  <AgePatients/>
                </p>
              </Card>
            </div>
            <div key="f">
              <Card
                title="各地区感染人数"
                style={{height: "100%"}}
                bodyStyle={cardStyle}
              >
                <p style={{height: "100%"}}>
                  <ProvinceCase/>
                </p>
              </Card>
            </div>
          </GridLayout>
        </div>
    </div>
  );
};
