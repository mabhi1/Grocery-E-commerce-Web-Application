import { useMutation, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Firebase/Auth";
import { Badge, Button, Card, Container } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import queries from "../../queries";
import PostRating from "./Ratings";

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
    const [flagReview] = useMutation(queries.FLAG_REVIEW);
    const orders = useQuery(queries.GET_ALL_ORDERS);
    const [totalRating, setTotalRating] = useState(0);
    const [best, setBest] = useState(null);
    useEffect(() => {
        let ratings = 0;
        let totalReviews = 0;
        if (data && data.productReview) {
            for (let review of data?.productReview) {
                ratings += review.rating;
                totalReviews += 1;
            }
            setTotalRating(ratings / totalReviews);
        }
        if (data && data.productReview.length > 1) {
            let rev = [...data?.productReview];
            rev.sort((a, b) => {
                return b.rating - a.rating;
            });
            setBest(rev[0].review);
        } else if (data && data.productReview.length > 0) {
            setBest(data.productReview[0].review);
        }
    }, [data]);
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
            for (let i = 1; i < 6; i++) {
                rating.push(
                    <FaStar
                        key={i}
                        size={18}
                        color={review.rating >= i ? "rgb(252, 186, 3)" : "rgb(169, 169, 169)"}
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
                        {currentUser && review.flags.includes(currentUser.uid) ? (
                            <Button size="sm" variant="danger" disabled>
                                Already Reported
                            </Button>
                        ) : (
                            <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={() => {
                                    flagReview({
                                        variables: {
                                            id: review._id,
                                            userid: currentUser.uid,
                                        },
                                    });
                                }}
                            >
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
            <>
                <PostRating product={product} totalRating={totalRating} best={best} />
                <Container>
                    <div style={styles.reviews} variant="dark">
                        Reviews
                        <Badge bg="info" style={{ marginLeft: "5px" }}>
                            {productReview.length}
                        </Badge>
                    </div>
                    {productReview.map((review) => buildCard(review))}
                </Container>
            </>
        );
    }
}

export default Reviews;
