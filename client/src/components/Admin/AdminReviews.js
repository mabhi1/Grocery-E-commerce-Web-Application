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
    const [sort, setSort] = useState(null);
    const { data } = useQuery(queries.ALL_REVIEWS, { fetchPolicy: "cache-and-network" });
    if (data && data.reviews) {
        const { reviews } = data;
        const buildCard = (review) => {
            console.log(review);
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
            return <UserReviewCard key={review._id} rating={rating} review={review} />;
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
                    <Form.Check inline name="group1" label="High to Low" type="radio" id="ordered" />
                    <Form.Check inline name="group1" label="Low to High" type="radio" id="dispatched" />
                    <Button size="sm">Clear Selection</Button>
                </div>
                {reviews?.map((review) => buildCard(review))}
            </Container>
        );
    }
}

export default AdminReviews;
