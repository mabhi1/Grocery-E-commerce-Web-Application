import { useQuery, useMutation } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Firebase/Auth";
import queries from "../../queries";
import { Card, Button, Col, Form, Row } from "react-bootstrap";
import EditModal from "./EditModal";

const styles = {
    pageHeader: {
        fontFamily: "inherit",
        fontWeight: 400,
        fontSize: "larger",
        marginBottom: "20px",
        width: "100%",
        padding: "15px",
    },
    heading: {
        borderBottom: 0,
        background: "#f8f9fabd",
    },
    input: {
        margin: "5px",
    },
};
function AdminProducts() {
    const [addProduct] = useMutation(queries.ADD_PRODUCT, {
        update(cache, { data: { addProduct } }) {
            let products = [];
            if (cache.readQuery({ query: queries.GET_ALL_PRODUCTS })) {
                products = cache.readQuery({ query: queries.GET_ALL_PRODUCTS }).products;
            } else {
                products = [];
            }
            cache.writeQuery({
                query: queries.GET_ALL_PRODUCTS,
                data: { products: products.concat([addProduct]) },
            });
        },
    });
    const [deleteProduct] = useMutation(queries.DELETE_PRODUCT, {
        update(cache, { data: { deleteProduct } }) {
            let products = cache.readQuery({ query: queries.GET_ALL_PRODUCTS }).products;
            products = products?.filter((product) => {
                return product._id !== deleteProduct._id;
            });
            cache.writeQuery({
                query: queries.GET_ALL_PRODUCTS,
                data: { products: products },
            });
        },
    });
    const [editModal, setEditModal] = useState(false);
    const [selectedProduct, setSelecetedProduct] = useState(null);
    let { loading, data, error } = useQuery(queries.GET_ALL_PRODUCTS, { fetchPolicy: "cache-and-network" });
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    useEffect(() => {
        if (currentUser.email !== "admin@asianmart.com") {
            navigate("/");
        }
    });
    if (error) {
        return <div>{error.message}</div>;
    } else if (loading) {
        return <div>Loading...</div>;
    } else if (data) {
        const { products } = data;
        console.log(products);
        const createCard = (product) => {
            return (
                <Col key={product.name}>
                    <Card style={{ textAlign: "center" }} className="product-card">
                        <Card.Img
                            src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z3JvY2VyeXxlbnwwfHwwfHw%3D&w=1000&q=80"
                            className="card-img-top"
                            alt={product.name}
                        />
                        <Card.Body>
                            <Card.Header className="mb-3" style={styles.heading}>
                                {product.name}
                            </Card.Header>
                            <Card.Text>
                                {product.category}
                                <br />
                                Price : {product.price}
                                <br />
                                Quantity : {product.quantity}
                            </Card.Text>
                            <Button
                                variant="light"
                                onClick={() => {
                                    setEditModal(true);
                                    setSelecetedProduct(product);
                                }}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="light"
                                onClick={() => {
                                    deleteProduct({
                                        variables: {
                                            id: product._id,
                                        },
                                    });
                                }}
                            >
                                Delete
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            );
        };
        const cards = products.map((product) => {
            return createCard(product);
        });
        const showForm = () => {
            const form = document.getElementById("product-form");
            form.style.display === "flex" ? (form.style.display = "none") : (form.style.display = "flex");
        };
        let name;
        let category;
        let price;
        let quantity;
        let description;
        return (
            <div>
                <Button style={{ width: "99%", marginBottom: "15px" }} onClick={showForm}>
                    Add Products
                </Button>
                <Form
                    style={{ display: "none" }}
                    className="mb-3"
                    id="product-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        addProduct({
                            variables: {
                                name: name.value.toString(),
                                description: description.value.toString(),
                                price: parseInt(price.value),
                                category: category.value.toString(),
                                quantity: parseInt(quantity.value),
                            },
                        });
                        name.value = "";
                        description.value = "";
                        price.value = "";
                        category.value = "";
                        quantity.value = "";
                    }}
                >
                    <Form.Label></Form.Label>
                    <Form.Control ref={(node) => (name = node)} type="text" placeholder="Enter Product name" style={styles.input} />

                    <Form.Label></Form.Label>
                    <Form.Control ref={(node) => (category = node)} type="text" placeholder="Enter Category" style={styles.input} />

                    <Form.Label></Form.Label>
                    <Form.Control ref={(node) => (price = node)} type="number" placeholder="Enter Price" style={styles.input} />

                    <Form.Label></Form.Label>
                    <Form.Control ref={(node) => (quantity = node)} type="number" placeholder="Enter Quantity" style={styles.input} />

                    <Form.Label></Form.Label>
                    <Form.Control ref={(node) => (description = node)} type="text" placeholder="Enter Description" style={styles.input} />

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <Row xs={2} md={4} lg={6}>
                    {cards}
                </Row>
                {editModal && <EditModal isOpen={editModal} handleClose={setEditModal} product={selectedProduct} />}
            </div>
        );
    }
}

export default AdminProducts;
