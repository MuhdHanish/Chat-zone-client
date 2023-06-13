import { Col, Row } from "react-bootstrap";
import AuthVarification from "../components/AuthVarification/AuthVarification";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      navigate("/chats");
    }
  }, [navigate]);
  return (
    <section className="container">
      <Row className="home-page">
        <Col xs={12} md={6} xl={7}>
          <span className="tagline">Chat - Zone</span>
        </Col>
      </Row>
      <Row>
        <AuthVarification />
      </Row>
    </section>
  );
};

export default HomePage;
