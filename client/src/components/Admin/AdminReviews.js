import { useQuery } from "@apollo/client";
import { useState } from "react";
import { Badge, Container, Form, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import queries from "./../../queries";
import UserReviewCard from "./../UserReviewCard";

const styles = {
    reviews: {
        margin: "20px",
        fontFamily: "monospace",
        fontSize: "larger",
        textAlign: "left",
    },
};
function AdminReviews() {
    const [reviewList, setReviewList] = useState(null);
    const { data } = useQuery(queries.ALL_REVIEWS, { fetchPolicy: "cache-and-network" });
    if (data && data.reviews) {
        let reviews = data.reviews.filter((review) => {
            if (review.flags.length > 0) {
                return review;
            }
            return null;
        });
        const handleSort = (sort) => {
            if (sort === "ltoh") {
                let newReviews = reviews.sort((a, b) => {
                    return a.flags.length - b.flags.length;
                });
                setReviewList(newReviews);
            } else if (sort === "htol") {
                let newReviews = reviews.sort((a, b) => {
                    return b.flags.length - a.flags.length;
                });
                setReviewList(newReviews);
            } else if ((sort = "all")) {
                document.getElementById("htol").checked = false;
                document.getElementById("ltoh").checked = false;
                setReviewList(null);
            }
        };
        const buildCard = (review) => {
            
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
            return <UserReviewCard key={review._id} rating={rating} review={review} admin={true} />;
        };
        return (
            <Container fluid="true">
                <div style={styles.reviews} variant="dark">
                    Flagged Reviews
                    <Badge bg="info" style={{ marginLeft: "5px" }}>
                        {reviews?.length}
                    </Badge>
                </div>
                <div className="mb-3">
                    <span className="filter-order">Sort</span>
                    <Form.Check inline name="group1" label="High to Low" type="radio" id="htol" onChange={() => handleSort("htol")} />
                    <Form.Check inline name="group1" label="Low to High" type="radio" id="ltoh" onChange={() => handleSort("ltoh")} />
                    <Button size="sm" onClick={() => handleSort("all")}>
                        Clear Selection
                    </Button>
                </div>
                {reviewList ? reviewList.map((review) => buildCard(review)) : reviews.map((review) => buildCard(review))}
            </Container>
        );
    }
}

export default AdminReviews;
