import React from "react";
import { useQuery } from "@apollo/client";
import Card from "react-bootstrap/Card";
import queries from "../queries";
import { Button, Col, Row } from "react-bootstrap";

const styles = {
    card: {
        textAlign: "left",
    },
    img: {
        width: "auto",
        height: "80px",
    },
    imgCol: {
        width: "15%",
        margin: "auto",
    },
    bodyCol: {
        width: "85%",
    },
};
function UserReviewCard({ review, rating }) {
    let { data } = useQuery(queries.GET_PRODUCTS_BY_ID, { variables: { id: review.productId } });
    const product = data?.product;
    return (
        <Card style={styles.card}>
            <Card.Body>
                <Row xs={4} md={4} lg={6}>
                    <Col style={styles.imgCol}>
                        <Card.Img src={product?.image} alt={product?.name} style={styles.img} />
                    </Col>
                    <Col style={styles.bodyCol}>
                        <Card.Text>{product?.name}</Card.Text>
                        <Card.Text>{rating}</Card.Text>
                        <Card.Text>{review.review}</Card.Text>
                    </Col>
                </Row>
            </Card.Body>
            <Card.Header>
                <i>
                    Posted On : {review.createdAt}
                    <Button variant="outline-danger" size="sm">
                        Delete
                    </Button>
                </i>
            </Card.Header>
        </Card>
    );
}

export default UserReviewCard;
