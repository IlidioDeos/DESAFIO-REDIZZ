import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductsPageHelpers } from '../utils/productsPage/productsPageHelpers';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { red, yellow, green, blue } from '@mui/material/colors';

const ProductsPage: React.FC = () => {
    const {
        products,
        loading,
        isDialogOpen,
        currentProduct,
        handleOpenDialog,
        handleCloseDialog,
        handleSubmit,
        handleChange,
        handleDelete
    } = useProductsPageHelpers();

    const navigate = useNavigate();

    const handleBackToPrivate = () => {
        navigate('/private');
    };


    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box sx={{ width: '80%' }}>
                <img src="/assets/images/redizz_inteiro.png" alt="Logo da Empresa" style={{ width: '200px', marginBottom: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
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
