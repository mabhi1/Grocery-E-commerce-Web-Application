const productReducer = (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case "ADD_PRODUCTS":
            return [...payload.products];

        default:
            return [...state];
    }
};

export default productReducer;
