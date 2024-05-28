import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let response = await fetch('http://localhost:5000/products',{
            headers:{
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        let result = await response.json();
        setProducts(result.data);
    }

    const deleteProduct = async (id) => {
        console.log(id)
        let response = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete",
            headers:{
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        let result = await response.json();
        if (result) {
            getProducts();
        }
    }

    const searchHandle = async (event)=>{
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            });
            result = await result.json()
            if(result){
                setProducts(result.data)
            }
        }else{
            getProducts();
        }
        
    }

    const updateProduct = (item) =>{
        navigate('/update/'+item._id)
    }

    return (
        <div className="product-list">
            <h3>Product List</h3>
            <input type="" className='search-product-box' placeholder='Search Product'
            onChange={searchHandle}
             />
            <ul>
                <li>S. No.</li>
                <li>Company</li>
                <li>Product Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>

            </ul>
            {
                products.length>0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.company}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>
                            <button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <button onClick={() => updateProduct(item)}>Update</button>
                        </li>

                    </ul>
                )
                :<h1>No Result Found</h1>
            }
        </div>
    )
}

export default ProductList;