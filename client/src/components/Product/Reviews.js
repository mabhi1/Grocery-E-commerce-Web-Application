import { useQuery } from "@apollo/client";
import React from "react";
import { Badge, Button, Card, Container } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import queries from "../../queries";

const styles = {
    card: {
        textAlign: "left",
        marginBottom: "5px",
    },
    reviews: {
        margin: "20px",
        fontFamily: "monospace",
        fontSize: "larger",
        textAlign: "left",
    },
};
function Reviews({ product }) {
    const { data } = useQuery(queries.GET_PRODUCT_REVIEW, { variables: { productId: product._id }, fetchPolicy: "cache-and-network" });
    if (data) {
        const { productReview } = data;
        const buildCard = (review) => {
            let rating = [];
            for (let i = 1; i < review.rating + 1; i++) {
                rating.push(
                    <FaStar
                        size={18}
                        color={"rgb(252, 186, 3)"}
                        style={{
                            marginRight: 10,
                        }}
                    />
                );
            }
            return (
                <Card key={review._id} style={styles.card}>
                    <Card.Header>
                        <i>User : {review.userId}</i>
                    </Card.Header>
                    <Card.Body>
                        <Button size="sm" variant="danger">
                            Report abuse
                        </Button>
                        <Card.Text>{rating}</Card.Text>
                        <Card.Text>{review.review}</Card.Text>
                    </Card.Body>
                </Card>
            );
        };
        return (
            <Container>
                <div style={styles.reviews} variant="dark">
                    Reviews
                    <Badge bg="info" style={{ marginLeft: "5px" }}>
                        {productReview.length}
                    </Badge>
                </div>
                {productReview.map((review) => buildCard(review))}
            </Container>
        );
    }
}

export default Reviews;
