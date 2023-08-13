import React,{useState,useEffect} from 'react'


function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        getProducts();
    },[])
    const getProducts = async ()=>{
        let result = await fetch('http://localhost:8000/products')
        result = await result.json()
        setProducts(result);
    }
    console.log('products',products);
  return (
    <div className='product-list'>
        <h1>Product List</h1>
        <ul>
            <li>S. No</li>
            <li>Name</li>
            <li>Price</li>
            <li>Category</li>
        </ul>
        {
            products.map((i,index)=>
        <ul>
            <li>{index+1}</li>
            <li>{i.name}</li>
            <li>${i.price}</li>
            <li>{i.category}</li>
        </ul>
            )
        }
    </div>
  )
}

export default ProductList