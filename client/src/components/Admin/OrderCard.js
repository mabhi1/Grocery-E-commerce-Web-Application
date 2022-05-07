import { Card, Col, ListGroupItem, Row, ListGroup } from "react-bootstrap";

function OrderCard(props) {
    const order = props.order;
    return (
        <Card key={order._id} className="mb-4">
            <Card.Header>
                <Row>
                    <Col md="4">User : {order.userEmail}</Col>
                    <Col>Total : {order.total}</Col>
                    <Col>Status : {order.status}</Col>
                    <Col>Change Status : status</Col>
                </Row>
            </Card.Header>
            <ListGroup>
                {order.products.map((product) => {
                    console.log(product);
                    return (
                        <ListGroupItem key={product._id}>
                            <Row>
                                <Col md="1">
                                    <Card.Img src={product.image} alt={product.name} style={{ height: "72px", width: "auto" }} />
                                </Col>
                                <Col>
                                    {product.name}
                                    <br />
                                    price : ${product.price}.00
                                    <br />
                                    quantity : {product.orderedQuantity}
                                </Col>
                            </Row>
                        </ListGroupItem>
                    );
                })}
            </ListGroup>
        </Card>
    );
}

export default OrderCard;
