import React from "react";
import { Form } from "react-bootstrap";

function SearchProducts({ setSearchTerm }) {
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };
    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    id="search-term"
                    placeholder="Search Products"
                    style={{ margin: "auto", width: "300px" }}
                    onChange={handleChange}
                />
            </Form.Group>
        </Form>
    );
}

export default SearchProducts;
