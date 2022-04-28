const addProduct = (name, price, quantity) => ({
    type: "ADD_PRODUCT_TO_CART",
    payload: {
        name: name,
        price: price,
        quantity: quantity,
    },
});

const removeProduct = (id) => ({
    type: "REMOVE_PRODUCT_FROM_CART",
    payload: {
        id: id,
    },
});

const showProducts = (products) => ({
    type: "ADD_PRODUCTS",
    payload: {
        products: products,
    },
});

module.exports = {
    addProduct,
    removeProduct,
    showProducts,
};
