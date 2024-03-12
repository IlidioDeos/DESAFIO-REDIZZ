import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { red, yellow, green, blue } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { getOrders, createOrder, updateOrder, deleteOrder } from '../api/orders';
import { Order } from '../types';
import { formatDateForMySQL } from '../utils/dateUtils';

const OrdersPage = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const navigate = useNavigate();

    const handleBackToPrivate = () => {
        navigate('/private');
    };

    const loadOrders = async () => {
        setLoading(true);
        try {
            const orders = await getOrders();
            setOrders(orders);
        } catch (error) {
            console.error("Failed to load orders", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const handleDialogOpen = (order?: Order) => {
        setCurrentOrder(order || { cliente_id: 0, status_pedido: 'Pendente', valor_pedido: 0 });
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setCurrentOrder(null);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCurrentOrder(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const name = event.target.name;
        const value = event.target.value;

        setCurrentOrder(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage(''); // Limpa a mensagem de erro anterior
        if (currentOrder) {
            try {
                let orderToSend = { ...currentOrder };

                
                if (currentOrder.data_pedido) {
                    orderToSend = {
                        ...orderToSend,
                        data_pedido: formatDateForMySQL(currentOrder.data_pedido),
                    };
                }

                if (orderToSend.id) {
                    await updateOrder(orderToSend.id, orderToSend);
                    handleDialogClose();
                    loadOrders(); // Recarrega os pedidos após atualizar um pedido
                } else {
                    const newOrder = await createOrder(orderToSend);
                    handleDialogClose();
                    loadOrders(); // Recarrega os pedidos após criar um novo pedido
                }
            } catch (error) {
                console.error("Error saving the order", error);
                setErrorMessage('Falha ao criar o pedido. Verifique se o ID do cliente existe.');
            }
        }
    };



    const handleDelete = async (id: number) => {
        try {
            await deleteOrder(id); // Chama a função para deletar o pedido do servidor
            await loadOrders(); // Recarrega a lista de pedidos para refletir a mudança
        } catch (error) {
            console.error("Error deleting the order", error);
        }
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
                            <TextField
                                margin="dense"
                                name="cliente_id"
                                label="ID do Cliente"
                                type="number"
                                fullWidth
                                variant="outlined"
                                value={currentOrder?.cliente_id || ''}
                                onChange={handleChange}
                            />
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
