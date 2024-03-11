import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getOrders, createOrder, updateOrder, deleteOrder } from '../api/orders';
import { Order } from '../types';

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
                if (currentOrder.id) {
                    await updateOrder(currentOrder.id, currentOrder);
                    handleDialogClose();
                    loadOrders(); // Recarrega os pedidos após atualizar um pedido
                } else {
                    const newOrder = await createOrder(currentOrder);
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
        <div>
            <h1>Pedidos</h1>
            <Button variant="contained" onClick={() => handleDialogOpen()}>Adicionar Pedido</Button>
            <Button variant="contained" color="secondary" onClick={handleBackToPrivate}>Voltar</Button>
            {loading ? <p>Carregando pedidos...</p> : (
                <ul>
                    {orders.map(order => (
                        <li key={order.id}>
                            Pedido #{order.id} - Cliente #{order.cliente_id} - Status: {order.status_pedido} - Total: R${order.valor_pedido}
                            <Button onClick={() => handleDialogOpen(order)}>Editar</Button>
                            <Button onClick={() => handleDelete(order.id)}>Deletar</Button>
                        </li>
                    ))}
                </ul>
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
        </div>
    );
};

export default OrdersPage;
