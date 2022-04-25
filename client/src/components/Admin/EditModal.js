import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReactModal from "react-modal";
import { useMutation } from "@apollo/client";
import queries from "../../queries";

ReactModal.setAppElement("#root");
const styles = {
    content: {
        width: "40%",
        marginLeft: "auto",
        marginRight: "auto",
        height: "500px",
    },
};
function EditModal(props) {
    let name;
    let category;
    let price;
    let quantity;
    let description;
    const [showModal, setShowModal] = useState(props.isOpen);
    const product = props.product;
    const [editProduct] = useMutation(queries.EDIT_PRODUCT, {
        update(cache, { data: { editProduct } }) {
            let products = cache.readQuery({ query: queries.GET_ALL_PRODUCTS }).products;
            products = products?.filter((product) => {
                return product._id !== editProduct._id;
            });
            cache.writeQuery({
                query: queries.GET_ALL_PRODUCTS,
                data: { products: products.concat([editProduct]) },
            });
        },
    });
    const handleCloseModal = () => {
        setShowModal(false);
        props.handleClose(false);
    };
    return (
        <div>
            <ReactModal isOpen={showModal} name="editModal" contentLabel="Edit Modal" style={styles}>
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        console.log(product._id, name.value, description.value, price.value, category.value, quantity.value);
                        editProduct({
                            variables: {
                                id: product._id.toString(),
                                name: name.value.toString(),
                                description: description.value.toString(),
                                price: parseInt(price.value),
                                category: category.value.toString(),
                                quantity: parseInt(quantity.value),
                            },
                        });
                        handleCloseModal();
                    }}
                >
                    <Form.Label htmlFor="name">Enter Product name</Form.Label>
                    <Form.Control ref={(node) => (name = node)} type="text" placeholder="Enter Product name" defaultValue={product.name} />
                    <br />
                    <Form.Label htmlFor="description">Enter Category</Form.Label>
                    <Form.Control ref={(node) => (category = node)} type="text" placeholder="Enter Category" defaultValue={product.category} />
                    <br />
                    <Form.Label htmlFor="price">Enter Price</Form.Label>
                    <Form.Control ref={(node) => (price = node)} type="number" placeholder="Enter Price" defaultValue={product.price} />
                    <br />
                    <Form.Label htmlFor="quantity">Enter Quantity</Form.Label>
                    <Form.Control ref={(node) => (quantity = node)} type="number" placeholder="Enter Quantity" defaultValue={product.quantity} />
                    <br />
                    <Form.Label htmlFor="description">Enter Description</Form.Label>
                    <Form.Control
                        ref={(node) => (description = node)}
                        type="text"
                        placeholder="Enter Description"
                        defaultValue={product.description}
                    />

                    <Button variant="primary" type="submit" style={{ marginTop: "15px", width: "100%" }}>
                        Submit
                    </Button>
                </Form>
                <Button onClick={handleCloseModal} style={{ width: "100%" }}>
                    Cancel
                </Button>
            </ReactModal>
        </div>
    );
}

export default EditModal;
