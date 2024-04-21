import React, { useContext, useEffect, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
    const { categoryId } = props;  // Assume categoryId is passed as a prop
    const [products, setProducts] = useState([]);
    const { all_product } = useContext(ShopContext); // This could be used or removed depending on if you still use it elsewhere

    useEffect(() => {
        fetch(`${process.env.REACT_APP_PRODUCT_SERVICE_URL}/products/category/${categoryId}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            setProducts(data);
        })
        .catch(error => console.error('Failed to fetch category products:', error));
    }, [categoryId]);

    return (
        <div className='shop-category'>
            <img className='shop-category-banner' src={props.banner} alt="Category Banner" />
            <div className='shopcategory-indexSort'>
                <p><span>Showing 1-{products.length}</span></p>
                <div className="shopcategory-sort">
                    Sort by <img src={dropdown_icon} alt="Dropdown Icon" />
                </div>
            </div>
            <div className="shopcategory-products">
                {products.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
            <div className="shopcategory-loadmore">
                Explore More
            </div>
        </div>
    );
};

export default ShopCategory;
