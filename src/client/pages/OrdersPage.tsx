import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrdersPageHelpers } from '../utils/ordersPage/ordersPageHelpers';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, FormControl, InputLabel,  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { red, yellow, green, blue } from '@mui/material/colors';

const OrdersPage: React.FC = () => {
    const {
        orders,
        clients,
        loading,
        isDialogOpen,
        currentOrder,
        errorMessage,
        handleDialogOpen,
        handleDialogClose,
        handleChange,
        handleSelectChange,
        handleSelectChangeNameCustomer,
        handleSubmit,
        handleDelete
    } = useOrdersPageHelpers();

    const navigate = useNavigate();

    const handleBackToPrivate = () => {
        navigate('/private');
    };


    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box sx={{ width: '80%' }}>
                <img src="/assets/images/redizz_inteiro.png" alt="Logo da Empresa" style={{ width: '200px', marginBottom: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                <h1>Pedidos</h1>
                <Button variant="contained" sx={{ backgroundColor: green[500], color: 'white', marginRight: '10px' }} onClick={() => handleDialogOpen()}>
                    Adicionar Pedido
                </Button>
                <Button variant="contained" sx={{ backgroundColor: blue[500], color: 'white' }} onClick={handleBackToPrivate}>
                    Voltar
                </Button>
                {loading ? <p>Carregando pedidos...</p> : (
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID do Pedido</TableCell>
                                    <TableCell>ID do Cliente</TableCell>
                                    <TableCell>Cliente</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Total</TableCell>
                                    <TableCell>Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map(order => (
                                    <TableRow key={order.id}>
                                        <TableCell>{order.id}</TableCell>
                                        <TableCell>{order.cliente_id}</TableCell>
                                        <TableCell>{clients.find(client => client.id === order.cliente_id)?.nome}</TableCell>
                                        <TableCell>{order.status_pedido}</TableCell>
                                        <TableCell>R${order.valor_pedido}</TableCell>
                                        <TableCell>
                                            <Button variant="contained" sx={{ backgroundColor: yellow[700], color: 'white', marginRight: '5px' }} onClick={() => handleDialogOpen(order)}>
                                                Editar
                                            </Button>
                                            <Button variant="contained" sx={{ backgroundColor: red[700], color: 'white' }} onClick={() => handleDelete(order.id)}>
                                                Deletar
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                    <DialogTitle>{currentOrder?.id ? 'Editar Pedido' : 'Novo Pedido'}</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <FormControl fullWidth margin="dense">
                                <InputLabel id="cliente_id-label">Cliente</InputLabel>
                                <Select
                                    labelId="cliente_id-label"
                                    id="cliente_id"
                                    name="cliente_id"
                                    value={currentOrder?.cliente_id.toString() || ''}
                                    label="Cliente"
                                    onChange={handleSelectChangeNameCustomer}
                                >
                                    {clients.map((client) => (
                                        <MenuItem key={client.id} value={client.id.toString()}>
                                            {client.nome}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>


                            <FormControl fullWidth margin="dense">
                                <InputLabel id="status_pedido-label">Status</InputLabel>
                                <Select
                                    labelId="status_pedido-label"
                                    name="status_pedido"
                                    value={currentOrder?.status_pedido || ''}
                                    label="Status"
                                    onChange={handleSelectChange}
                                >
                                    {['Pendente', 'Em processamento', 'Enviado', 'Entregue', 'Cancelado', 'Devolvido'].map((status) => (
                                        <MenuItem key={status} value={status}>
                                            {status}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                margin="dense"
                                name="valor_pedido"
                                label="Total"
                                type="number"
                                fullWidth
                                variant="outlined"
                                value={currentOrder?.valor_pedido || ''}
                                onChange={handleChange}
                            />
                        </DialogContent>
                        <DialogActions>
                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                            <Button onClick={handleDialogClose}>Cancelar</Button>
                            <Button type="submit">Salvar</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Box>
        </Box>
    );
};

export default OrdersPage;