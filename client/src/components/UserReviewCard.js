import React from "react";
import { useMutation, useQuery } from "@apollo/client";
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
function UserReviewCard({ review, rating, userId }) {
    let { data } = useQuery(queries.GET_PRODUCTS_BY_ID, { variables: { id: review.productId } });
    let [deleteReview] = useMutation(queries.DEL_REVIEW, {
        update(cache, { data: { deleteReview } }) {
            let userReview = [];
            if (cache.readQuery({ query: queries.REVIEW_BY_USERID, variables: { userId: userId } }))
                userReview = cache.readQuery({ query: queries.REVIEW_BY_USERID, variables: { userId: userId } }).userReview;
            cache.writeQuery({
                query: queries.REVIEW_BY_USERID,
                variables: { userId: userId },
                data: {
                    userReview: userReview.filter((review) => {
                        return review._id !== deleteReview._id;
                    }),
                },
            });
        },
    });
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
                    <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => {
                            deleteReview({
                                variables: {
                                    id: review._id,
                                },
                            });
                        }}
                    >
                        Delete
                    </Button>
                </i>
            </Card.Header>
        </Card>
    );
}

export default UserReviewCard;
