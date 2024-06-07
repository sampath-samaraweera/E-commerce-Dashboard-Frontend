import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const navigate = useNavigate();

    const handleAddProduct = async () => {
        console.log(name, price, category, company );
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        try {
            let response = await fetch("http://localhost:5000/api/products/add-product", {
                method: 'POST',
                body: JSON.stringify({ name, price, category, userId, company }),
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            });

            // Check if the response is OK
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            let result = await response.json();
            console.log(result);
            // Ensure result.result and result.auth are not undefined
            if (result.success) {
                // localStorage.setItem("user", JSON.stringify(result));
                // localStorage.setItem("token", JSON.stringify(result.auth));
                navigate('/');
            } else {
                throw new Error("Invalid response structure");
            }
        } catch (error) {
            console.error("There was an error with the fetch operation:", error);
            // Handle the error appropriately in the UI
        }
    };

    return (
        <div className="product">
            <h1>Add Product</h1>
            <input className="inputBox" type="text" placeholder="Enter Product Name"
                value={name} onChange={(e) => setName(e.target.value)}
            />
            <input className="inputBox" type="text" placeholder="Enter Price"
                value={price} onChange={(e) => setPrice(e.target.value)}
            />
            <input className="inputBox" type="text" placeholder="Enter Category"
                value={category} onChange={(e) => setCategory(e.target.value)}
            />
            <input className="inputBox" type="text" placeholder="Enter Company"
                value={company} onChange={(e) => setCompany(e.target.value)}
            />
            <button onClick={handleAddProduct} className="appButton" type="button">Add Product</button>
        </div>
    );
};

export default AddProduct;
