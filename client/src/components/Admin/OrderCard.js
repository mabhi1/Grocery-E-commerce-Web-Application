import { useMutation } from "@apollo/client";
import { Card, Col, ListGroupItem, Row, ListGroup, Button } from "react-bootstrap";
import queries from "../../queries";

function OrderCard(props) {
    const order = props.order;
    const filter = props.filter;
    const [changeStatusToDispatched] = useMutation(queries.DISPATCH_STATUS);
    const [changeStatusToCompleted] = useMutation(queries.COMPLETE_STATUS);
    const handleDispatch = () => {
        changeStatusToDispatched({
            variables: {
                id: order._id,
            },
        });
        window.location.reload(false);
    };
    const handleComplete = () => {
        changeStatusToCompleted({
            variables: {
                id: order._id,
            },
        });
        window.location.reload(false);
    };
    return (
        <Card className="mb-4" style={{ display: filter === order.status || filter === "all" ? "flex" : "none" }}>
            <Card.Header style={{ padding: 0 }}>
                <Row style={{ lineHeight: "2.5em", textAlign: "center", "--bs-gutter-x": "0" }} xs={1} md={3} lg={4} className={order.status}>
                    <Col>User : {order.userEmail}</Col>
                    <Col>Total Price : ${order.total}.00</Col>
                    <Col style={{ textTransform: "capitalize" }}>Status : {order.status}</Col>
                    <Col>
                        {order.status === "ordered" ? (
                            <Button size="sm" className="ms-4" variant="light" onClick={handleDispatch}>
                                Dispatch Order
                            </Button>
                        ) : undefined}
                        {order.status === "dispatched" ? (
                            <Button size="sm" className="ms-4" variant="light" onClick={handleComplete}>
                                Complete Order
                            </Button>
                        ) : undefined}
                    </Col>
                </Row>
            </Card.Header>

            <ListGroup style={{ borderRadius: "0" }}>
                {order.products.map((product) => {
                    return (
                        <ListGroupItem key={product._id} style={{ border: "0", borderBottom: "1px solid #e9e9e9" }}>
                            <Row>
                                <Col sm="3" md="2" lg="2" style={{ textAlign: "center" }}>
                                    <Card.Img src={product.image} alt={product.name} style={{ height: "72px", width: "auto" }} />
                                </Col>
                                <Col>
                                    {product.name}
                                    <br />
                                    Price : ${product.price}.00
                                    <br />
                                    Quantity : {product.orderedQuantity}
                                </Col>
                            </Row>
                        </ListGroupItem>
                    );
                })}
            </ListGroup>
            <Card.Body style={{ padding: "0px 0px 0px 10px", color: "#6f6f6f" }}>
                <Card.Text>
                    <i>Address : {order.apt + " " + order.addressStreet + " " + order.city + " " + order.state + " " + order.zip}</i>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default OrderCard;
