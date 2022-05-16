const cartReducer = (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case "ADD_PRODUCT_TO_CART":
            let found = false;
            for (let product of state) {
                if (product.name === payload.name && product.price === payload.price) {
                    product.quantity += payload.quantity;
                    found = true;
                    break;
                }
            }
            if (!found) state.push({ _id: payload.id, name: payload.name, price: payload.price, quantity: payload.quantity });
            return [...state];

        case "REMOVE_PRODUCT_FROM_CART":
            let newCart = [];
            for (let product of state) {
                if (product._id !== payload.id) newCart.push(product);
            }
            return [...newCart];

        default:
            return [...state];
    }
};

export default cartReducer;
