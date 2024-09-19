import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import '../components/FileUpload/FileUpload.css';
import CustomTextField from '../components/CustomTextField';
import CustomMultilineTextField from '../components/CustomMultilineTextField';
import CustomLoadingButton from "../components/CustomLoadingButton";
import FileUploadCom from "../components/FileUpload/FileUploadCom";
import { BASE_URL } from '../config';
import { useCustomContext } from '../context/CustomContext';

const UpdateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    console.log("params", params)
    
    const { setOpen, setMessage} = useCustomContext();

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
        setDescription(data.description);
        setImage(data.imageUrl);
    }

    const handleUpdateProduct = async () => {
        setLoading(true)
        console.log(name, price, category, company, description );
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('company', company);
        formData.append('userId', userId);
        formData.append('description', description);
        if (selectedFile) {
            formData.append('image', selectedFile);
        }
        try {
            let response = await fetch(`${BASE_URL}/products/product/${params.id}`, {
                method: 'PUT',
                body:  formData,
                headers: {
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            });

            if (!response.ok) {
                if (response.status === 413) {
                    alert("Image is too large")
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            let result = await response.json();
            console.log(result);
            if (result.success) {
                navigate('/my_products');
                setMessage("Item updated successfully")
                setOpen(true);
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
        console.log("File changed", file)
        setSelectedFile(file);
    };

    return (
            <div className="productContainer">            
                <div className="product">
                    <h1 style={{fontSize: '30px'}}>Update Product</h1>
                    <div className="productRow">
                        {image ? (  
                            <div className="imgField">    
                                <div className="img">
                                    <div className="file">
                                        <img src={image} alt="preview" style={{ borderRadius: '6px', maxWidth: '100%', maxHeight: '100%' }} />
                                    </div>
                                </div> 
                                <div style={{marginTop: '50px'}}>
                                    <CustomLoadingButton size="medium" color="green" onClick={() => setImage(null)}>
                                        Change Image
                                    </CustomLoadingButton>
                                </div>
                            </div>
                        ):(
                           <div className="imgField">
                                <FileUploadCom onFileUpload={handleFileChange} />
                            </div>
                        )} 
                        <div className="inputFieldSet">
                            <CustomTextField
                                label="Enter Category"
                                value={category} onChange={(e) => setCategory(e.target.value)}
                            />
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
                                value={price} 
                                onChange={(e) => {
                                    const value = e.target.value;
                                    // Allow only numeric input, and ensure it doesn't include unwanted characters
                                    if (!isNaN(value) && /^[0-9]*\.?[0-9]*$/.test(value)) {
                                      setPrice(value);
                                    }
                                }}
                            />
                            <CustomMultilineTextField
                                label="Enter Description"
                                value={description} onChange={(e) => setDescription(e.target.value)}
                            />
                            <div style={{ marginTop: '2rem' }}>
                               <CustomLoadingButton size="medium" color="green" onClick={handleUpdateProduct} loading={loading}>Update Product</CustomLoadingButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default UpdateProduct;
