import Row from "react-bootstrap/Row";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

function ProductList(props) {
    let products = useSelector((state) => state.products);
    console.log(products);
    if (props.filterValue) {
        if (props.filterValue !== "all") {
            products = products.filter((product) => {
                return product.category === props.filterValue;
            });
        }
    }
    let sortedProducts = [];
    for (let product of products) {
        sortedProducts.push(product);
    }
    sortedProducts.sort((a, b) => a.price - b.price);
    const createCard = (product) => {
        return <ProductCard product={product} key={product._id} />;
    };
    const cards = products.map((product) => {
        return createCard(product);
    });
    const sortedCards = sortedProducts.map((product) => {
        return createCard(product);
    });
    return (
        <Row xs={2} md={4} lg={6} xl={12} className="m-1">
            {props.sort ? sortedCards : cards}
        </Row>
    );
}

export default ProductList;
