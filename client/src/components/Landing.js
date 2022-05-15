import React from "react";
import { Container, Row } from "react-bootstrap";
import "../App.css";

function Landing() {
    return (
        <>
            <header style={{ position: "relative", textAlign: "center" }}>
                <img
                    className="d-block w-100"
                    src="https://food.ubc.ca/wp-content/uploads/2020/02/Save-Money-On-Groceries_UBC-Food-Services.jpg"
                    alt="banner"
                    style={{ opacity: "0.8", marginTop: "-35px" }}
                />
                <div className="site-title">Welcome To, Asian Mart</div>
            </header>
            <Container>
                <Row>
                    <div
                        style={{
                            fontFamily: "'Bebas Neue', cursive",
                            paddingTop: "30px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                        className="col-md-6"
                    >
                        <h1 style={{ fontSize: "64px" }}>Asian Mart's Promise</h1>
                        <p style={{ fontSize: "25px" }}>Spice up your lives with some Traditional produce straight from Asia.</p>
                        <p style={{ fontSize: "25px" }}>
                            All Our products are 100% asian so you can get the authentic taste and product just like you used to get while shopping
                            with your mom. you can also get the best price for your products. We have a wide variety of products from different
                            regions of asia.
                        </p>
                    </div>
                    <div className="col-md-6" style={{ paddingTop: "20px", display: "flex", alignItems: "center" }}>
                        <img
                            src="https://images.theconversation.com/files/282104/original/file-20190701-105182-1q7a7ji.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop"
                            alt="market"
                            style={{ width: "100%", height: "80%" }}
                        />
                    </div>
                </Row>
                <Row>
                    <div className="col-md-6" style={{ display: "flex", alignItems: "center" }}>
                        <img
                            src="https://cdn.apartmenttherapy.info/image/upload/v1595460511/k/Photo/Series/2020-07-South-Indian-Chritra-Agrawal/Pantry%20/South_Indian_grocery_items.jpg"
                            alt="spice_Image"
                            style={{ width: "100%", height: "auto", paddingTop: "20px" }}
                        />
                    </div>
                    <div
                        style={{ fontFamily: "'Bebas Neue', cursive", display: "flex", flexDirection: "column", justifyContent: "center" }}
                        className="col-md-6"
                    >
                        <h1 style={{ fontSize: "64px" }}>About Asian Mart</h1>
                        <p style={{ fontSize: "22px", lineBreak: "auto" }}>
                            Asian Mart opened up in the Fall of 2021, with one goal and purpose in mind to give peoples tastebud's what they have
                            missed most about their home country or to encourage people to explore the various produce which are offerd by the south
                            Asian Countries. We appreaciate every single member that has supported us and we thank all of them for their love and
                            supprt. We hope you enjoy our products and we look forward to seeing you soon.
                        </p>
                    </div>
                </Row>
            </Container>
        </>
    );
}

export default Landing;
