import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material/Select';
import { getOrders, createOrder, updateOrder, deleteOrder, getOrderStatuses } from '../api/orders';
import { Order } from '../types';
import { formatDateForMySQL } from '../utils/dateUtils';

const OrdersPage = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [orderStatuses, setOrderStatuses] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
    const navigate = useNavigate();

    const handleBackToPrivate = () => {
        navigate('/private');
    };

    useEffect(() => {
        loadOrders();
        loadOrderStatuses();
    }, []);

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

    const loadOrderStatuses = async () => {
        try {
            const statuses = await getOrderStatuses();
            setOrderStatuses(statuses);
        } catch (error) {
            console.error("Failed to load order statuses", error);
        }
    };

    const handleDialogOpen = (order?: Order) => {
        setCurrentOrder(order || { cliente_id: 0, status_id: 0, total: 0 });
        setIsDialogOpen(true);
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
        const name = event.target.name;
        const value = event.target.value;

        setCurrentOrder(prev => ({ ...prev, [name]: value }));
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setCurrentOrder(null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (currentOrder) {
            const orderToSend = {
                ...currentOrder,
                cliente_id: Number(currentOrder.cliente_id),
                status_id: Number(currentOrder.status_id),
                total: Number(currentOrder.total),
                data_pedido: currentOrder.data_pedido ? formatDateForMySQL(currentOrder.data_pedido) : undefined,
            };
            try {
                if (orderToSend.id) {
                    await updateOrder(orderToSend.id, orderToSend);
                } else {
                    await createOrder(orderToSend);
                }
                loadOrders();
                handleDialogClose();
            } catch (error) {
                console.error("Error saving the order", error);
            }
        }
    };

    const handleChange = (event: ChangeEvent<{ name?: string; value: unknown }> | SelectChangeEvent) => {
        const name = 'name' in event.target ? event.target.name : undefined;
        const value = event.target.value;

        if (name) {
            setCurrentOrder(prev => ({ ...prev, [name]: String(value) }));
        }
    };



    return (
        <div>
            <h1>Pedidos</h1>
            <Button variant="contained" onClick={() => handleDialogOpen()}>Adicionar Pedido</Button>
            <Button variant="contained" color="secondary" onClick={() =>
                handleBackToPrivate()}>
                Voltar
            </Button>
            {loading ? <p>Carregando pedidos...</p> : (
                <ul>
                    {orders.map(order => (
                        <li key={order.id}>
                            Pedido #{order.id} - Cliente #{order.cliente_id} - Status #{order.status_id} - Total: {order.total}
                            <Button onClick={() => handleDialogOpen(order)}>Editar</Button>
                            <Button onClick={() => deleteOrder(order.id)}>Deletar</Button>
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
                            <InputLabel>Status</InputLabel>
                            <Select
                                name="status_id"
                                value={currentOrder?.status_id.toString() || ''}
                                label="Status"
                                onChange={handleSelectChange}
                            >
                                {orderStatuses.map((status) => (
                                    <MenuItem key={status.id} value={status.id.toString()}>
                                        {status.status}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            margin="dense"
                            name="total"
                            label="Total"
                            type="number"
                            fullWidth
                            variant="outlined"
                            value={currentOrder?.total || ''}
                            onChange={handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose}>Cancelar</Button>
                        <Button type="submit">Salvar</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default OrdersPage;
