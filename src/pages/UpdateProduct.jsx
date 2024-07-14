import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import CustomButton from "../components/CustomButton";
import { BASE_URL } from '../config';

const UpdateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const navigate = useNavigate();
    const params = useParams();
    console.log("params", params)

    useEffect(() => {
        getProductDetails();
    }, [navigate]);

    const getProductDetails = async () => {
        const id = params.id;
        let response = await fetch(`${BASE_URL}/products/product/${id}`,{
            headers:{
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        let result = await response.json();
        let data = result.data;
        setName(data.name);
        setPrice(data.price);
        setCategory(data.category);
        setCompany(data.company);
    }

    const handleUpdateProduct = async () => {
        console.log(name, price, category, company );
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        try {
            let response = await fetch(`${BASE_URL}/products/product/${params.id}`, {
                method: 'PUT',
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
            if (result.success) {
                navigate('/');
            } else {
                throw new Error("Invalid response structure");
            }
        } catch (error) {
            console.error("There was an error with the fetch operation:", error);
        }
    };

    return (
        <div className="container">
            <div className="productContainer">
                <div className="product">
                    <h1>Update Product</h1>
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
                    <div style={{ margin: "10px" }}>
                        <CustomButton size="small" color="green" onClick={() => handleUpdateProduct()}>Update Product</CustomButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;
