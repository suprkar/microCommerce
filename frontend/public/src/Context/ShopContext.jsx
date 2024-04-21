import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index <= 300; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}/allproducts`);
                const data = await res.json();
                setAll_Product(data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        const fetchCartItems = async () => {
            if (localStorage.getItem('auth-token')) {
                try {
                    const res = await fetch(`${process.env.REACT_APP_API_URL}/getcart`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'auth-token': localStorage.getItem('auth-token'),
                            'Content-Type': 'application/json'
                        },
                        body: ""
                    });
                    const data = await res.json();
                    setCartItems(data);
                } catch (error) {
                    console.error('Failed to fetch cart items:', error);
                }
            }
        };

        fetchProducts();
        fetchCartItems();
    }, []);

    const addToCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        if (localStorage.getItem('auth-token')) {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}/addtocart`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'auth-token': localStorage.getItem('auth-token'),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "itemId": itemId })
                });
                console.log(await res.json());
            } catch (error) {
                console.error('Failed to add to cart:', error);
            }
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (localStorage.getItem('auth-token')) {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}/removefromcart`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'auth-token': localStorage.getItem('auth-token'),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "itemId": itemId })
                });
                console.log(await res.json());
            } catch (error) {
                console.error('Failed to remove from cart:', error);
            }
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = all_product.find((product) => product.id === Number(item));
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[item];
                } else {
                    console.error(`Product with id ${item} not found.`);
                }
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    const contextValue = {
        getTotalCartItems,
        getTotalCartAmount,
        all_product,
        cartItems,
        addToCart,
        removeFromCart
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
