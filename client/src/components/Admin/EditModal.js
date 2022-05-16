import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReactModal from "react-modal";
import { useMutation } from "@apollo/client";
import queries from "../../queries";

ReactModal.setAppElement("#root");
const styles = {
    content: {
        height: "540px",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "90px",
    },
};
function EditModal(props) {
    let name;
    let image;
    let category;
    let price;
    let quantity;
    let description;
    const [showModal, setShowModal] = useState(props.isOpen);
    const product = props.product;
    const [editProduct] = useMutation(queries.EDIT_PRODUCT, {
        update(cache, { data: { editProduct } }) {
            let adminProducts = cache.readQuery({ query: queries.GET_PRODUCTS_FOR_ADMIN }).adminProducts;
            adminProducts = adminProducts?.filter((product) => {
                return product._id !== editProduct._id;
            });
            cache.writeQuery({
                query: queries.GET_PRODUCTS_FOR_ADMIN,
                data: { adminProducts: adminProducts.concat([editProduct]) },
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
                        
                        editProduct({
                            variables: {
                                id: product._id.toString(),
                                name: name.value.toString(),
                                image: image.value.toString(),
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
                    <Form.Label htmlFor="image">Enter Image URL</Form.Label>
                    <Form.Control ref={(node) => (image = node)} type="text" placeholder="Enter image url" defaultValue={product.image} />
                    <br />
                    <Form.Label htmlFor="category">Enter Category</Form.Label>
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
