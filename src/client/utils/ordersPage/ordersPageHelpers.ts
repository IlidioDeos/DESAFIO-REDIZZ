import React, { useState, useEffect } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { getOrders, createOrder, updateOrder, deleteOrder } from '../../api/orders';
import { getCustomers } from '../../api/customers';
import { Order } from '../../types';
import { Customer } from '../../types';
import { formatDateForMySQL } from '../../utils/dateUtils';

export const useOrdersPageHelpers = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [clients, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');


    const loadOrders = async () => {
        setLoading(true);
        try {
            const orders = await getOrders();
            const customers = await getCustomers();
            setOrders(orders);
            setCustomers(customers);
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

    const handleSelectChangeNameCustomer = (event: SelectChangeEvent) => {
        const { name, value } = event.target;
        setCurrentOrder(prev => ({
            ...prev,
            [name]: Number(value),
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

    return {
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
    };
};