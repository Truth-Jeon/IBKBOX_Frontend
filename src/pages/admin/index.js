import React,{ useContext, useEffect, useRef } from 'react';
import OrgChart from '@balkangraph/orgchart.js';
import { Chart } from "chart.js";
import {Container, Row, Col, Form, Button, Alert} from 'react-bootstrap';
import {
  CardHeader
} from "reactstrap";

const Index = (props) => {
    const org = useRef();
    useEffect(()=>{
        const orgchart = new OrgChart(org.current, {
            nodes: [
                    {id: 1, name: "Name1" , title: "Tytle1" },
                    {id: 2, pid: 1, name: "Name2" , title: "Tytle2" },
                    {id: 3, pid: 1, name: "Name3" , title: "Tytle3" }
            ],
            nodeBinding: {
                field_0: "name",
                field_1: "title"
            }
        });
    },[]);

    useEffect(() => {
        var config = {
            type: "line",
            data: {
            labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
            ],
            datasets: [
                {
                label: new Date().getFullYear(),
                backgroundColor: "#4c51bf",
                borderColor: "#4c51bf",
                data: [65, 78, 66, 44, 56, 67, 75],
                fill: false,
                },
                {
                label: new Date().getFullYear() - 1,
                fill: false,
                backgroundColor: "#fff",
                borderColor: "#fff",
                data: [40, 68, 86, 74, 56, 60, 87],
                },
            ],
            },
            options: {
            maintainAspectRatio: false,
            responsive: true,
            title: {
                display: false,
                text: "Sales Charts",
                fontColor: "white",
            },
            legend: {
                labels: {
                fontColor: "white",
                },
                align: "end",
                position: "bottom",
            },
            tooltips: {
                mode: "index",
                intersect: false,
            },
            hover: {
                mode: "nearest",
                intersect: true,
            },
            scales: {
                xAxes: [
                {
                    ticks: {
                    fontColor: "rgba(255,255,255,.7)",
                    },
                    display: true,
                    scaleLabel: {
                    display: false,
                    labelString: "Month",
                    fontColor: "white",
                    },
                    gridLines: {
                    display: false,
                    borderDash: [2],
                    borderDashOffset: [2],
                    color: "rgba(33, 37, 41, 0.3)",
                    zeroLineColor: "rgba(0, 0, 0, 0)",
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                    },
                },
                ],
                yAxes: [
                {
                    ticks: {
                    fontColor: "rgba(255,255,255,.7)",
                    },
                    display: true,
                    scaleLabel: {
                    display: false,
                    labelString: "Value",
                    fontColor: "white",
                    },
                    gridLines: {
                    borderDash: [3],
                    borderDashOffset: [3],
                    drawBorder: false,
                    color: "rgba(255, 255, 255, 0.15)",
                    zeroLineColor: "rgba(33, 37, 41, 0)",
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                    },
                },
                ],
            },
            },
        };

        let barconfig = {
            type: "bar",
            data: {
              labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
              ],
              datasets: [
                {
                  label: new Date().getFullYear(),
                  backgroundColor: "#ed64a6",
                  borderColor: "#ed64a6",
                  data: [30, 78, 56, 34, 100, 45, 13],
                  fill: false,
                  barThickness: 8,
                },
                {
                  label: new Date().getFullYear() - 1,
                  fill: false,
                  backgroundColor: "#4c51bf",
                  borderColor: "#4c51bf",
                  data: [27, 68, 86, 74, 10, 4, 87],
                  barThickness: 8,
                },
              ],
            },
            options: {
              maintainAspectRatio: false,
              responsive: true,
              title: {
                display: false,
                text: "Orders Chart",
              },
              tooltips: {
                mode: "index",
                intersect: false,
              },
              hover: {
                mode: "nearest",
                intersect: true,
              },
              legend: {
                labels: {
                  fontColor: "rgba(0,0,0,.4)",
                },
                align: "end",
                position: "bottom",
              },
              scales: {
                xAxes: [
                  {
                    display: false,
                    scaleLabel: {
                      display: true,
                      labelString: "Month",
                    },
                    gridLines: {
                      borderDash: [2],
                      borderDashOffset: [2],
                      color: "rgba(33, 37, 41, 0.3)",
                      zeroLineColor: "rgba(33, 37, 41, 0.3)",
                      zeroLineBorderDash: [2],
                      zeroLineBorderDashOffset: [2],
                    },
                  },
                ],
                yAxes: [
                  {
                    display: true,
                    scaleLabel: {
                      display: false,
                      labelString: "Value",
                    },
                    gridLines: {
                      borderDash: [2],
                      drawBorder: false,
                      borderDashOffset: [2],
                      color: "rgba(33, 37, 41, 0.2)",
                      zeroLineColor: "rgba(33, 37, 41, 0.15)",
                      zeroLineBorderDash: [2],
                      zeroLineBorderDashOffset: [2],
                    },
                  },
                ],
              },
            },
          };


        window.myLine = new Chart(document.getElementById("line-chart").getContext("2d"), config);
        window.myBar = new Chart(document.getElementById("bar-chart").getContext("2d"), barconfig);
    }, []);

    return (
        <>
          <Container>
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <Col>
                    <div className="col">
                      <h3 className="mb-0 table__title">대시보드</h3>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <div>
                <div style={{height: '500px'}} ref={org}></div>
              </div>


              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <Col>
                    <div className="col">
                      <h3 className="mb-0 table__title">곡선그래프</h3>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <div>
                <canvas id="line-chart"></canvas>
              </div>        


               <CardHeader className="border-0">
                <Row className="align-items-center">
                  <Col>
                    <div className="col">
                      <h3 className="mb-0 table__title">막대그래프</h3>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <div>
               <canvas id="bar-chart"></canvas>
              </div>           
          </Container>
        </>
    )
};
export default Index;