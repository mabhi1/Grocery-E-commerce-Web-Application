import { useQuery } from "@apollo/client";
import queries from "../../queries";
import React, { useContext, useState } from "react";

const ProductReviews = (props) => {
    console.log(props.id);
    const id = props.id;
    let { loading, error, data } = useQuery(queries.GET_PRODUCT_REVIEWS, { variables: { id: id } });
    if (loading) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>{error.message}</div>;
    } else if (data) {
        console.log('Product Reviews',data.productReview)
        return(
            <h1>Product Reviews</h1>
        )
    }
}

export default ProductReviews;