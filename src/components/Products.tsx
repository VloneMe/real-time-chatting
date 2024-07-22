"use client";

import React, { useEffect, useState } from 'react';
import { Container } from './Container';


interface productsProps {
    _id: any,
    name: string,
    price: number,
    description: string
}

export const Products = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const res = await fetch("http://localhost:3000/api/products");
        const data = await res.json();
        return data.products;
    }

    useEffect(() => {
        fetchProducts().then((products) => {
            setProducts(products);
        }).catch((error) => {
            console.error("Failed to fetch products:", error);
        });
    }, []);

    return (
        <section>
            <Container>
                {products.length > 0 ? (
                    products.map((product: productsProps) => (
                        <div key={product._id}>
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p>${product.price}</p>
                        </div>
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </Container>
        </section>
    );
};