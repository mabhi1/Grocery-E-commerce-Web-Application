import { useState, useContext } from "react";
import "../../App.css";
import { FaStar } from "react-icons/fa";
import "../../queries";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../../Firebase/Auth";
import queries from "../../queries";
import { Button } from "react-bootstrap";

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

function App({ product }) {
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
        if (!review) return;
        addReview({
            variables: {
                productId: product._id,
                userId: currentUser?.displayName,
                review: review,
                rating: rating,
            },
        });
        setRating(0);
        document.getElementById("review").value = "";
    };

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
                Post a review for the product
            </h2>
            <div style={styles.stars}>
                {stars.map((_, index) => {
                    return (
                        <label key={index}>
                            <input type="radio" name="rating" value={rating} onClick={() => setRating(rating)} />

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
            <textarea placeholder="How was your experience?" style={styles.textarea} id="review" />

            <Button style={styles.button} onClick={handleSubmit}>
                Submit
            </Button>
        </div>
    );
}

export default App;
