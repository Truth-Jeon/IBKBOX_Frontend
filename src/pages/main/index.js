import React, { useEffect } from 'react';
import {Link} from "react-router-dom";
import { Jumbotron, Col, Button, Row, Container, Card ,Image } from "react-bootstrap";
import { updateTitle } from 'modules/utils/Common'

const Index = (props) => {
    useEffect(()=>updateTitle("BOX"), []);

    return (
        <>
        <section>
            <Container fluid="md">
                <Row>
                    <Col>
                       <Image src="images/loginbg.png" fluid />
                    </Col>
                </Row>
                <Row className="my-3 justify-content-md-center">
                    <Col lg={true}>
                        <Card>
                            <Card.Img variant="top" src="images/loginbg.png" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={true}>
                        <Card>
                            <Card.Img variant="top" src="images/loginbg.png" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={true}>
                        <Card>
                            <Card.Img variant="top" src="images/loginbg.png" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={true}>
                        <Card>
                            <Card.Img variant="top" src="images/loginbg.png" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col lg={true}>
                        <Link to={"/"}>
                        <Jumbotron>
                            <h1>Hello, world!</h1>
                            <p>
                                This is a simple hero unit, a simple jumbotron-style component for calling
                                extra attention to featured content or information.
                            </p>
                            <p>
                                <Button variant="primary">Learn more</Button>
                            </p>
                            </Jumbotron>
                        </Link>
                    </Col>
                    <Col>
                    <Link to={"/"}>
                        <Jumbotron>
                            <h1>Hello, world!</h1>
                            <p>
                                This is a simple hero unit, a simple jumbotron-style component for calling
                                extra attention to featured content or information.
                            </p>
                            <p>
                                <Button variant="primary">Learn more</Button>
                            </p>
                            </Jumbotron>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </section>
        </>
    )
};
export default Index;