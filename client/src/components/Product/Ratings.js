import { useState, useContext } from "react";
import "../../App.css";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import "../../queries";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../../Firebase/Auth";
import queries from "../../queries";
import { Button, Col, Row } from "react-bootstrap";

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    stars: {
        display: "flex",
        flexDirection: "row",
    },
    textarea: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        padding: 10,
        margin: "20px 0",
        minHeight: 100,
        width: 300,
        resize: "none",
    },
    button: {
        borderRadius: 5,
        width: 300,
        padding: 10,
    },
};

const colors = {
    yellow: "#fcba03",
    grey: "#a9a9a9",
};

function App({ product, totalRating, best }) {
    let ratings = [];
    for (let i = 1; i < 6; i++) {
        if (totalRating >= 1) {
            ratings.push(
                <FaStar
                    key={i}
                    size={18}
                    color={colors.yellow}
                    style={{
                        marginRight: 10,
                    }}
                />
            );
        } else if (totalRating < 1 && totalRating > 0) {
            ratings.push(
                <FaStarHalfAlt
                    key={i}
                    size={18}
                    color={colors.yellow}
                    style={{
                        marginRight: 10,
                    }}
                />
            );
        } else {
            ratings.push(
                <FaStar
                    key={i}
                    size={18}
                    color={colors.grey}
                    style={{
                        marginRight: 10,
                    }}
                />
            );
        }
        totalRating -= 1;
    }

    const [rating, setRating] = useState(undefined);
    const [hoverValue, setHoverValue] = useState(undefined);
    const [addReview] = useMutation(queries.ADD_REVIEW, {
        update(cache, { data: { addReview } }) {
            let productReview = [];
            if (cache.readQuery({ query: queries.GET_PRODUCT_REVIEW, variables: { productId: product._id } }))
                productReview = cache.readQuery({ query: queries.GET_PRODUCT_REVIEW, variables: { productId: product._id } }).productReview;
            cache.writeQuery({
                query: queries.GET_PRODUCT_REVIEW,
                variables: { productId: product._id },
                data: { productReview: productReview.concat([addReview]) },
            });
        },
    });
    const { currentUser } = useContext(AuthContext);
    const stars = Array(5).fill(0);

    const handleClick = (value) => {
        setRating(value);
    };

    const handleMouseOver = (newHoverValue) => {
        setHoverValue(newHoverValue);
    };

    const handleMouseLeave = () => {
        setHoverValue(null);
    };

    const handleSubmit = () => {
        const review = document.getElementById("review").value.toString();
        if (!review || !rating) return;
        addReview({
            variables: {
                productId: product._id,
                userName: currentUser?.displayName,
                userId: currentUser?.uid,
                review: review,
                rating: rating,
            },
        });
        setRating(0);
        document.getElementById("review").value = "";
    };
    if (currentUser) {
        return (
            <Row style={{ justifyContent: "center", margin: "auto" }}>
                <Col md="auto" style={styles.container}>
                    <h1
                        style={{
                            margin: "20px",
                            fontFamily: "monospace",
                            fontSize: "larger",
                            textAlign: "left",
                        }}
                    >
                        Customer Ratings
                    </h1>
                    <span>{ratings}</span>
                    <h2
                        style={{
                            margin: "20px",
                            fontFamily: "monospace",
                            fontSize: "larger",
                            textAlign: "left",
                        }}
                    >
                        Best Review
                    </h2>
                    {best ? best : <i>No reviews</i>}
                </Col>
                <Col md="auto" style={styles.container}>
                    <h2
                        style={{
                            margin: "20px",
                            fontFamily: "monospace",
                            fontSize: "larger",
                            textAlign: "left",
                        }}
                    >
                        Post a review for the product
                    </h2>
                    <div style={styles.stars}>
                        {stars.map((_, index) => {
                            return (
                                <label key={index}>
                                    <input type="radio" name="rating" value={rating} onClick={() => setRating(rating)} style={{ display: "none" }} />

                                    <FaStar
                                        size={24}
                                        onClick={() => handleClick(index + 1)}
                                        onMouseOver={() => handleMouseOver(index + 1)}
                                        onMouseLeave={handleMouseLeave}
                                        color={(hoverValue || rating) > index ? colors.yellow : colors.grey}
                                        style={{
                                            marginRight: 10,
                                            cursor: "pointer",
                                        }}
                                    />
                                </label>
                            );
                        })}
                    </div>
                    <label htmlFor="review"></label>
                    <textarea placeholder="How was your experience?" style={styles.textarea} id="review" />

                    <Button style={styles.button} onClick={handleSubmit}>
                        Submit
                    </Button>
                </Col>
            </Row>
        );
    } else {
        return (
            <div style={styles.container}>
                <h2
                    style={{
                        margin: "20px",
                        fontFamily: "monospace",
                        fontSize: "larger",
                        textAlign: "left",
                    }}
                >
                    Login to post a review
                </h2>
            </div>
        );
    }
}

export default App;
