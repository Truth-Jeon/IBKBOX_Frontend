import React, { useEffect, useRef } from "react";
import OrgChart from "@balkangraph/orgchart.js";
import { Container, Row, Col } from "react-bootstrap";
import { CardHeader } from "reactstrap";

const Index = (props) => {
  const org = useRef();
  useEffect(() => {
    OrgChart.templates.grey = Object.assign({}, OrgChart.templates.olivia);
    OrgChart.templates.grey.size = [250, 150];
    OrgChart.templates.grey.field_0 =
      '<text style="font-size: 12px;" x="110" y="55" text-anchor="left">{val}</text>';
    OrgChart.templates.grey.field_1 =
      '<text style="font-size: 16px;" x="110" y="80" text-anchor="left">{val}</text>';
    OrgChart.templates.grey.field_2 =
      '<text style="font-size: 12px;" x="110" y="105" text-anchor="left">{val}</text>';
    OrgChart.templates.grey.img_0 =
      '<clipPath id="ulaImg">' +
      '<circle cx="60" cy="75" r="40"></circle>' +
      "</clipPath>" +
      '<image preserveAspectRatio="xMidYMid slice" clip-path="url(#ulaImg)" xlink:href="{val}" x="20" y="35" width="80" height="80">' +
      "</image>";
    OrgChart.templates.grey.nodeMenuButton = "";

    var orgchart = new OrgChart(org.current, {
      mouseScrool: OrgChart.action.none,
      enableSearch: false,
      template: "grey",
      nodeMouseClick: OrgChart.action.none,
      nodeMenu: OrgChart.action.none,
      nodeBinding: {
        field_0: "name",
        field_1: "title",
        field_2: "email",
        img_0: "img",
      },
      nodes: [
        {
          id: 1,
          name: "Amber McKenzie",
          title: "CEO",
          img: "https://cdn.balkan.app/shared/1.jpg",
          email: "dolpario@boomco.org",
        },
        {
          id: 2,
          pid: 1,
          name: "Ava Field",
          title: "IT Manager",
          img: "https://cdn.balkan.app/shared/2.jpg",
          email: "dolpario@boomco.org",
        },
        {
          id: 3,
          pid: 1,
          name: "Peter Stevens",
          title: "HR Manager",
          img: "https://cdn.balkan.app/shared/3.jpg",
          email: "dolpario@boomco.org",
        },
        {
          id: 4,
          pid: 2,
          name: "Ava Field",
          title: "IT Manager",
          img: "https://cdn.balkan.app/shared/2.jpg",
          email: "dolpario@boomco.org",
        },
        {
          id: 5,
          pid: 2,
          name: "Peter Stevens",
          title: "HR Manager",
          img: "https://cdn.balkan.app/shared/3.jpg",
          email: "dolpario@boomco.org",
        },
        {
          id: 6,
          pid: 4,
          name: "Ava Field",
          title: "IT Manager",
          img: "https://cdn.balkan.app/shared/2.jpg",
          email: "dolpario@boomco.org",
        },
        {
          id: 7,
          pid: 6,
          name: "Peter Stevens",
          title: "HR Manager",
          img: "https://cdn.balkan.app/shared/3.jpg",
          email: "dolpario@boomco.org",
        },
        {
          id: 8,
          pid: 2,
          name: "Ava Field",
          title: "IT Manager",
          img: "https://cdn.balkan.app/shared/2.jpg",
          email: "dolpario@boomco.org",
        },
        {
          id: 9,
          pid: 2,
          name: "Peter Stevens",
          title: "HR Manager",
          img: "https://cdn.balkan.app/shared/3.jpg",
          email: "dolpario@boomco.org",
        },
        {
          id: 10,
          pid: 3,
          name: "Ava Field",
          title: "IT Manager",
          img: "https://cdn.balkan.app/shared/2.jpg",
          email: "dolpario@boomco.org",
        },
        {
          id: 11,
          pid: 3,
          name: "Peter Stevens",
          title: "HR Manager",
          img: "https://cdn.balkan.app/shared/3.jpg",
          email: "dolpario@boomco.org",
        },
      ],
    });
  }, []);

  return (
    <>
      <Container>
        <CardHeader className="border-0">
          <Row className="align-items-center">
            <Col>
              <div className="col">
                <h3 className="mb-0 table__title">조직도</h3>
              </div>
            </Col>
          </Row>
        </CardHeader>
        <div>
          <div style={{ height: "900px" }} ref={org}></div>
        </div>
      </Container>
    </>
  );
};
export default Index;
