import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../api/products';
import { Product } from '../../types';


export const useProductsPageHelpers = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    



    const loadProducts = async () => {
        setLoading(true);
        try {
            const res = await getProducts();
            setProducts(res);
        } catch (error) {
            console.error("Failed to load products", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);


    const handleOpenDialog = (product?: Product) => {
        setCurrentProduct(product || { nome: '', descricao: '', preco: 0 });
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setCurrentProduct(null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (currentProduct) {
            let updatedProduct;
            try {
                if (currentProduct.id) {
                    // Crie um objeto contendo apenas os campos necessários para atualizar o produto
                    const productToUpdate = {
                        id: currentProduct.id,
                        nome: currentProduct.nome,
                        descricao: currentProduct.descricao,
                        preco: currentProduct.preco
                    };
                    updatedProduct = await updateProduct(currentProduct.id, productToUpdate);
                    // Atualiza o produto na lista
                    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
                } else {
                    // Se não houver um ID, criamos um novo produto com os campos fornecidos
                    updatedProduct = await createProduct(currentProduct);
                    // Adiciona o novo produto à lista
                    setProducts(prev => [...prev, updatedProduct]);
                }
                handleCloseDialog();
            } catch (error) {
                console.error("Error saving the product", error);
            }
        }
    };



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCurrentProduct((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteProduct(id);
            // Remove o produto deletado da lista
            setProducts(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            console.error("Error deleting the product", error);
        }
    };

    return {
        products,
        loading,
        isDialogOpen,
        currentProduct,
        handleOpenDialog,
        handleCloseDialog,
        handleSubmit,
        handleChange,
        handleDelete
    };
    
};