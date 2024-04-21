import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_PRODUCT_SERVICE_URL}/products/${productId}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Failed to fetch product details:', error);
            }
        };
        
        fetchProduct();
    }, [productId]);

    return (
        <div>
            {product ? (
                <>
                    <Breadcrum product={product} />
                    <ProductDisplay product={product} />
                    <DescriptionBox product={product} />
                    <RelatedProducts productId={productId} />
                </>
            ) : (
                <p>Loading product details...</p>
            )}
        </div>
    );
};

export default Product;
