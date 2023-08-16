import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, [])
    const getProducts = async () => {
        let result = await fetch('http://localhost:8000/products')
        result = await result.json()
        setProducts(result);
    }
    // console.log('products',products);


    const deleteProduct = async (id) => {
        // console.warn(id);
        let result = await fetch(`http://localhost:8000/product/${id}`, {
            method: 'Delete'
        })
        result = await result.json()
        if (result) {
            getProducts();
        }
    }

    const searchhandle = async (event) => {
        // console.log(event.target.value);
        let key = event.target.value;
        if(key) {
            let result = await fetch(`http://localhost:8000/search/${key}`)
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        }
        else{
            getProducts();
        }
    }
    return (
        <div className='product-list'>
            <h1>Product List</h1>
            <input type="text" className='search' onChange={searchhandle} placeholder='Search Product' />
            <ul>
                <li>S. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Actions</li>
            </ul>
            {
                products.length>0 ? products.map((i, index) =>
                    <ul key={i._id}>
                        <li>{index + 1}</li>
                        <li>{i.name}</li>
                        <li>${i.price}</li>
                        <li>{i.category}</li>
                        <li>{i.company}</li>
                        {/*Here delete button is functioned by giving it onclick function and passing id in it*/}
                        <li><button type="button" onClick={() => deleteProduct(i._id)} className="btn btn-danger">Delete</button>
                            {/*Here update link is added*/}
                            <Link to={`/update/${i._id}`}><button type="button" className="btn btn-warning">Update</button></Link>
                        </li>
                    </ul>
                )
                :<h1>No Result Found</h1>
            }
        </div>
    )

}

export default ProductList