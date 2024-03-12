import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { red, yellow, green, blue } from '@mui/material/colors';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api/products';
import { Product } from '../types';
import { useNavigate } from 'react-router-dom';

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
    

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box sx={{ width: '80%' }}>
                <h1>Produtos</h1>
                <Button variant="contained" sx={{ backgroundColor: green[500], color: 'white', marginRight: '10px' }} onClick={() => handleOpenDialog()}>
                    Adicionar Produto
                </Button>
                <Button variant="contained" sx={{ backgroundColor: blue[500], color: 'white' }} onClick={() =>
                    handleBackToPrivate()}>
                    Voltar
                </Button>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>Descrição</TableCell>
                                <TableCell>Preço</TableCell>
                                <TableCell>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.nome}</TableCell>
                                    <TableCell>{product.descricao}</TableCell>
                                    <TableCell>{product.preco}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" sx={{ backgroundColor: yellow[700], color: 'white', marginRight: '5px' }} onClick={() => handleOpenDialog(product)}>
                                            Editar
                                        </Button>
                                        <Button variant="contained" sx={{ backgroundColor: red[700], color: 'white' }} onClick={() => handleDelete(product.id)}>
                                            Deletar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
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
            </Box>
        </Box>
    );
};

export default ProductsPage;
