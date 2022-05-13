import { useQuery, useMutation } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../Firebase/Auth";
import queries from "../../queries";
import { Card, Button, Col, Form, Row, Container } from "react-bootstrap";
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
    input: {
        margin: "5px",
    },
    Container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "3px",
        height: "185px",
        padding: "0",
        margin: "0",
        overflow: "hidden",
    },
    Image: { width: "75%", height: "auto", margin: "auto" },
};
function AdminProducts() {
    const [addProduct] = useMutation(queries.ADD_PRODUCT, {
        update(cache, { data: { addProduct } }) {
            let adminProducts = [];
            if (cache.readQuery({ query: queries.GET_PRODUCTS_FOR_ADMIN })) {
                adminProducts = cache.readQuery({ query: queries.GET_PRODUCTS_FOR_ADMIN }).adminProducts;
            } else {
                adminProducts = [];
            }
            cache.writeQuery({
                query: queries.GET_PRODUCTS_FOR_ADMIN,
                data: { adminProducts: adminProducts.concat([addProduct]) },
            });
        },
    });
    const [deleteProduct] = useMutation(queries.DELETE_PRODUCT, {
        update(cache, { data: { deleteProduct } }) {
            let adminProducts = cache.readQuery({ query: queries.GET_PRODUCTS_FOR_ADMIN }).adminProducts;
            adminProducts = adminProducts?.filter((product) => {
                return product._id !== deleteProduct._id;
            });
            cache.writeQuery({
                query: queries.GET_PRODUCTS_FOR_ADMIN,
                data: { adminProducts: adminProducts },
            });
        },
    });
    const [editModal, setEditModal] = useState(false);
    const [selectedProduct, setSelecetedProduct] = useState(null);
    let { loading, data, error } = useQuery(queries.GET_PRODUCTS_FOR_ADMIN, { fetchPolicy: "cache-and-network" });
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
        const { adminProducts } = data;
        const createCard = (product) => {
            return (
                <Col key={product._id} style={{ marginBottom: "20px" }}>
                    <Card style={{ textAlign: "center" }} className="product-card">
                        <Container style={styles.Container}>
                            <Card.Img src={product.image} className="card-img-top" alt={product.name} style={styles.Image} />
                        </Container>
                        <Card.Body>
                            <Link className="btn btn-light" to={`/product/${product._id}`} role="button">
                                {product.name}
                            </Link>
                            <Card.Text>
                                {product.category}
                                <br />
                                Price : ${product.price}.00
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
        const cards = adminProducts.map((product) => {
            return createCard(product);
        });
        const showForm = () => {
            const form = document.getElementById("product-form");
            form.style.display === "block" ? (form.style.display = "none") : (form.style.display = "block");
        };
        let name;
        let image;
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
                                image: image.value.toString(),
                                description: description.value.toString(),
                                price: parseInt(price.value),
                                category: category.value.toString(),
                                quantity: parseInt(quantity.value),
                            },
                        });
                        name.value = "";
                        image.value = "";
                        description.value = "";
                        price.value = "";
                        category.value = "";
                        quantity.value = "";
                    }}
                >
                    <Form.Label></Form.Label>
                    <Form.Control ref={(node) => (name = node)} type="text" placeholder="Enter Product name" style={styles.input} required />

                    <Form.Label></Form.Label>
                    <Form.Control ref={(node) => (image = node)} type="text" placeholder="Enter image url" style={styles.input} required />

                    <Form.Label></Form.Label>
                    <Form.Select ref={(node) => (category = node)} type="text" style={styles.input} required>
                        <option>Select Category</option>
                        <option value="all">Show All</option>
                        <option value="fruits & vegetables">Fruits & Vegetables</option>
                        <option value="dairy & eggs">Dairy & Eggs</option>
                        <option value="frozen foods">Frozen Foods</option>
                        <option value="snacks & beverages">Snacks & Beverages</option>
                        <option value="ready to eat">Ready to Eat</option>
                        <option value="dry fruits">Dry Fruits</option>
                    </Form.Select>

                    <Form.Label></Form.Label>
                    <Form.Control ref={(node) => (price = node)} type="number" placeholder="Enter Price" style={styles.input} required />

                    <Form.Label></Form.Label>
                    <Form.Control ref={(node) => (quantity = node)} type="number" placeholder="Enter Quantity" style={styles.input} required />

                    <Form.Label></Form.Label>
                    <Form.Control ref={(node) => (description = node)} type="text" placeholder="Enter Description" style={styles.input} required />

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <Row xs={1} md={3} lg={6}>
                    {cards}
                </Row>
                {editModal && <EditModal isOpen={editModal} handleClose={setEditModal} product={selectedProduct} />}
            </div>
        );
    }
}

export default AdminProducts;
