import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api/products';
import { Product } from '../types';

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const navigate = useNavigate();

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

    const handleBackToPrivate = () => {
        navigate('/private');
    };

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
                    updatedProduct = await updateProduct(currentProduct.id, currentProduct);
                    // Atualiza o produto na lista
                    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
                } else {
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
    

    return (
        <div>
            <h1>Produtos</h1>
            <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
                Adicionar Produto
            </Button>
            <Button variant="contained" color="secondary" onClick={handleBackToPrivate}>
                Voltar
            </Button>
            {loading ? (
                <p>Carregando produtos...</p>
            ) : (
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            {product.nome} - {product.descricao} - R${product.preco}
                            <Button onClick={() => handleOpenDialog(product)}>Editar</Button>
                            <Button onClick={() => handleDelete(product.id)}>Deletar</Button>
                        </li>
                    ))}
                </ul>
            )}
            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>{currentProduct?.id ? 'Editar Produto' : 'Novo Produto'}</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="nome"
                            label="Nome do Produto"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={currentProduct?.nome || ''}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="descricao"
                            label="Descrição"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={currentProduct?.descricao || ''}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="preco"
                            label="Preço"
                            type="number"
                            fullWidth
                            variant="outlined"
                            value={currentProduct?.preco || ''}
                            onChange={handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancelar</Button>
                        <Button type="submit">Salvar</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default ProductsPage;
