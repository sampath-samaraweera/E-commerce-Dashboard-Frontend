import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import CustomTextField from '../components/CustomTextField';
import CustomLoadingButton from "../components/CustomLoadingButton";
import FileUploadCom from "../components/FileUpload/FileUploadCom";
import { BASE_URL } from '../config';

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleAddProduct = async () => {
        setLoading(true);
        console.log(name, price, category, company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('company', company);
        formData.append('userId', userId);
        if (selectedFile) {
            formData.append('image', selectedFile);
        }

        try {
            let response = await fetch(`${BASE_URL}/products/add-product`, {
                method: 'POST',
                body: formData,
                headers: {
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            let result = await response.json();
            console.log(result);

            if (result.success) {
                setLoading(false);
                navigate('/');
            } else {
                throw new Error("Invalid response structure");
            }
        } catch (error) {
            console.error("There was an error with the fetch operation:", error);
        }finally{
            setLoading(false)
        }
    };

    const handleFileChange = (file) => {
        setSelectedFile(file);
    };

    return (
        <div className="container">
            <div className="productContainer">
                <div className="product">
                    <h1>Add Product</h1>
                    <div className="productRow">
                        <div className="imgField">
                            <FileUploadCom onFileUpload={handleFileChange} />
                        </div>
                        <div className="inputFieldSet">
                            <CustomTextField
                                label="Enter Company Name"
                                value={company} onChange={(e) => setCompany(e.target.value)}
                            />
                            <CustomTextField
                                label="Enter Product Name"
                                value={name} onChange={(e) => setName(e.target.value)}
                            />
                            <CustomTextField
                                label="Enter Price"
                                value={price} onChange={(e) => setPrice(e.target.value)}
                            />
                            <CustomTextField
                                label="Enter Category"
                                value={category} onChange={(e) => setCategory(e.target.value)}
                            />
                            <div style={{ marginTop: '2rem' }}>
                               <CustomLoadingButton size="medium" color="darkred" onClick={handleAddProduct} loading={loading}>Add Product</CustomLoadingButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
