import { Container, Row, Col, Card } from "react-bootstrap";

const AboutUs = () => {
  return (
    <div className="about-us">
      <Container>
        <h1 className="section-title">About Us</h1>
        <p className="section-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel ex
          vel leo congue consequat sed a lacus. Proin euismod tortor nec lacus
          lobortis, sed tempus urna sagittis.
        </p>
        <Row>
          <Col md={4}>
            <Card className="team-member-card">
              <Card.Img variant="top" src="src/assets/images/image1.jpg" />
              <Card.Body>
                <Card.Title>Lorem ipsum dolor</Card.Title>
                <Card.Text>Lorem ipsum dolor amet, consectetur</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="team-member-card">
              <Card.Img variant="top" src="src/assets/images/image2.jpg" />
              <Card.Body>
                <Card.Title>Lorem ipsum dolor</Card.Title>
                <Card.Text>Lorem ipsum dolor amet, consectetur</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="team-member-card">
              <Card.Img variant="top" src="src/assets/images/image3.jpg" />
              <Card.Body>
                <Card.Title>Lorem ipsum dolor</Card.Title>
                <Card.Text>Lorem ipsum dolor amet, consectetur</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutUs;
