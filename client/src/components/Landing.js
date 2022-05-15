import React from "react";
import { Container, Row } from "react-bootstrap";
import "../App.css";

function Landing() {
  return (
    <>
      <header style={{ position: "relative", textAlign: "center" }}>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt="banner"
          style={{ opacity: "0.6", marginTop: "-35px" }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: " 50%",
            transform: "translate(-50%, -50%)",
            fontSize: "90px",
            fontFamily: "'Bebas Neue', cursive",
            color: "white",
            backgroundColor:"Black",
            padding: "5px",
            opacity: "0.8",
          }}
        >
          Welcome To, Asian Mart
        </div>
      </header>
      <Container>
        <Row>
          <div style={{ fontFamily: "'Bebas Neue', cursive", paddingTop:"30px" }} className="col-md-6">
            <h1 style={{ fontSize: "64px" }}>Asian Mart's Promise</h1>
            <p style={{ fontSize: "25px" }}>Spice up your lives with some Traditional produce straight from Asia.</p>
            <p style={{ fontSize: "25px" }}>All Our products are 100% asian so you can get the authentic taste and product just like you used to get while shopping with your mom.
            you can also get the best price for your products. We have a wide variety of products from different regions of asia. 
            </p>
          </div>
          <div className="col-md-6" style={{ paddingTop: "20px" }}>
            <img
              src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt="market"
              style={{ width: "100%", height: "80%" }}
            />
          </div>
        </Row>
        <Row>
          <div className="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1547332226-395d746d139a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8c3BpY2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
              alt="spice_Image"
              style={{ width: "80%", height: "80%", paddingTop: "20px" }}
            />
          </div>
          <div style={{ fontFamily: "'Bebas Neue', cursive" }} className="col-md-6">
            <h1 style={{ fontSize: "64px" }}>About Asian Mart</h1>
            <p style={{ fontSize: "22px", lineBreak:"auto"}}>
              Asian Mart opened up in the Fall of 2021, with one goal and purpose in mind to give peoples tastebud's what they have missed most about
              their home country or to encourage people to explore the various produce which are offerd by the south Asian Countries. We appreaciate
              every single member that has supported us and we thank all of them for their love and supprt. We hope you enjoy our products and we look forward to seeing you soon.</p>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default Landing;
