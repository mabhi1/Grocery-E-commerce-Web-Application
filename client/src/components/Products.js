import React from "react";

function Products() {
    const products = [
        {
            url: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930",
            name: "Product 1",
            price: "$20",
        },
        {
            url: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930",
            name: "Product 2",
            price: "$30",
        },
        {
            url: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930",
            name: "product3",
            price: "$40",
        },
        {
            url: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930",
            name: "product4",
            price: "$50",
        },
        {
            url: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930",
            name: "product5",
            price: "$60",
        },
    ];
    const createCard = (product) => {
        let quantity = 0;
        return (
            <div key={product.name} className="card" style={{ width: "14rem", textAlign: "center" }}>
                <img src={product.url} className="card-img-top" alt={product.name} />
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.price}</p>
                    <button className="btn btn-primary btn-sm" onClick={() => (quantity -= 1)}>
                        -
                    </button>
                    <span>{quantity}</span>
                    <button className="btn btn-primary btn-sm" onClick={() => (quantity += 1)}>
                        +
                    </button>
                    <button className="btn btn-primary btn-sm">Add to Cart</button>
                </div>
            </div>
        );
    };
    const cards = products.map((product) => {
        return createCard(product);
    });
    return <div style={{ display: "flex" }}>{cards}</div>;
}

export default Products;
