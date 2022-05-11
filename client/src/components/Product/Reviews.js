import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { AuthContext } from "../../Firebase/Auth";
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
    const { currentUser } = useContext(AuthContext);
    const { data } = useQuery(queries.GET_PRODUCT_REVIEW, { variables: { productId: product._id }, fetchPolicy: "cache-and-network" });
    const orders = useQuery(queries.GET_ALL_ORDERS);
    if (data && orders?.data) {
        let verified = false;
        const { productReview } = data;
        const buildCard = (review) => {
            for (let order of orders.data.getAllOrders) {
                if (order.userId === review.userId) {
                    for (let prod of order.products) {
                        if (prod._id === product._id) {
                            verified = true;
                        }
                    }
                }
            }
            let rating = [];
            for (let i = 1; i < review.rating + 1; i++) {
                rating.push(
                    <FaStar
                        key={i}
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
                        <i>User : {review.userName}</i>
                        {verified && (
                            <Badge bg="info" style={{ marginLeft: "5px" }}>
                                Verified User
                            </Badge>
                        )}
                    </Card.Header>
                    <Card.Body>
                        {currentUser && (
                            <Button size="sm" variant="outline-danger">
                                Report abuse
                            </Button>
                        )}
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
