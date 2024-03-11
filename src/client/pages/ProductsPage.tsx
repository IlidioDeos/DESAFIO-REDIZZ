import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api/products';
import { Product } from '../types';
import { formatDateForMySQL } from '../utils/dateUtils';

const ProductsPage = () => {
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
    // Se não houver produto, inicialize com um objeto com campos vazios ou valores padrão
    if (!product) {
      setCurrentProduct({
        nome: '',
        descricao: '',
        preco: 0, // Ou outro valor padrão
        estoque: 0, // Ou outro valor padrão
        // Não é necessário definir 'id' ou 'atualizado_em' para um novo produto
      });
    } else {
      setCurrentProduct(product);
    }
    setIsDialogOpen(true);
  };
  

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentProduct(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentProduct) {
      // Clone currentProduct para evitar a mutação direta do estado
      let productToSend = { ...currentProduct };
  
      // Aplicar formatação na data antes de enviar
      if (productToSend.atualizado_em) {
        productToSend.atualizado_em = formatDateForMySQL(productToSend.atualizado_em);
      }
  
      // Verifica se é uma atualização (productToSend.id) ou criação (sem id)
      if (productToSend.id) {
        await updateProduct(productToSend.id, productToSend);
      } else {
        await createProduct(productToSend);
      }
      loadProducts();
      handleCloseDialog();
    }
  };
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Inicializa currentProduct com um objeto que satisfaça completamente a interface Product
    setCurrentProduct((prev) => ({
      ...prev || { nome: '', descricao: '', preco: 0, estoque: 0, atualizado_em: '' },
      [name]: value
    }));
  };
  
  

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    loadProducts();
  };

  return (
    <div>
      <h1>Produtos</h1>
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
        Adicionar Produto
      </Button>
      {loading ? (
        <p>Carregando produtos...</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.nome} - {product.descricao} - R${product.preco} - Estoque: {product.estoque}
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
            <TextField
              margin="dense"
              name="estoque"
              label="Estoque"
              type="number"
              fullWidth
              variant="outlined"
              value={currentProduct?.estoque || ''}
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
