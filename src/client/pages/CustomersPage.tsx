import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from '../api/customers';
import { Customer } from '../types';
import { formatDateForMySQL } from '../utils/dateUtils';
import { formatPhoneNumber } from '../utils/formatPhoneNumber';

const CustomersPage = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
    const [formattedPhone, setFormattedPhone] = useState<string>('');
    const [phoneError, setPhoneError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const navigate = useNavigate();

    const handleBackToPrivate = () => {
        navigate('/private');
    };

    useEffect(() => {
        loadCustomers();
    }, []);

    useEffect(() => {
        if (currentCustomer?.telefone) {
            const formatted = formatPhoneNumber(currentCustomer.telefone);
            setFormattedPhone(formatted);
            setPhoneError(formatted.replace(/\D/g, '').length === 11 ? '' : 'O telefone deve seguir o formato XX XXXXX-XXXX e conter 11 dígitos.');
        } else {
            setFormattedPhone('');
        }
    }, [currentCustomer]);

    const loadCustomers = async () => {
        setLoading(true);
        try {
            const res = await getCustomers();
            setCustomers(res);
        } catch (error) {
            console.error("Failed to load customers", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDialog = (customer?: Customer) => {
        setCurrentCustomer(customer || { nome: '', email: '', telefone: '' });
        setEmailError('');
        setPhoneError('');
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setCurrentCustomer(null);
        setEmailError('');
        setPhoneError('');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formattedPhone.replace(/\D/g, '').length !== 11) {
            setPhoneError('O telefone deve seguir o formato XX XXXXX-XXXX e conter 11 dígitos.');
            return;
        }

        if (currentCustomer) {
            let customerToSend = {
                ...currentCustomer,
                telefone: formattedPhone.replace(/\D/g, ''),
                email: currentCustomer.email.trim(),
                nome: currentCustomer.nome.trim()
            };

            try {
                if (customerToSend.id) {
                    await updateCustomer(customerToSend.id, customerToSend);
                } else {
                    await createCustomer(customerToSend);
                }
                loadCustomers();
                handleCloseDialog();
            } catch (error) {
                if (error.response && error.response.status) {
                    setEmailError('Email inválido ou já cadastrado, tente outro.');
                } else {
                    console.error("Erro ao salvar o cliente", error);
                }
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCurrentCustomer(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'telefone') {
            const formatted = formatPhoneNumber(value);
            setFormattedPhone(formatted);
            setPhoneError(formatted.replace(/\D/g, '').length === 11 ? '' : 'O telefone deve seguir o formato XX XXXXX-XXXX e conter 11 dígitos.');
        }

        if (name === 'email') {
            setEmailError('');
        }
    };

    const handleDelete = async (id: number) => {
        await deleteCustomer(id);
        loadCustomers();
    };

    return (
        <div>
            <h1>Clientes</h1>
            <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
                Adicionar Cliente
            </Button>
            <Button variant="contained" color="secondary" onClick={() =>
                handleBackToPrivate()}>
                Voltar
            </Button>
            {loading ? (
                <p>Carregando clientes...</p>
            ) : (
                <ul>
                    {customers.map((customer) => (
                        <li key={customer.id}>
                            {customer.nome} - {customer.email} - {customer.telefone}
                            <Button onClick={() => handleOpenDialog(customer)}>Editar</Button>
                            <Button onClick={() => handleDelete(customer.id)}>Deletar</Button>
                        </li>
                    ))}
                </ul>
            )}
            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>{currentCustomer?.id ? 'Editar Cliente' : 'Novo Cliente'}</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="nome"
                            label="Nome do Cliente"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={currentCustomer?.nome || ''}
                            onChange={handleChange}
                        />
                        <TextField
                            error={emailError !== ''}
                            helperText={emailError}
                            margin="dense"
                            name="email"
                            label="Email"
                            type="email"
                            fullWidth
                            variant="outlined"
                            value={currentCustomer?.email || ''}
                            onChange={handleChange}
                        />
                        <TextField
                            error={phoneError !== ''}
                            helperText={phoneError}
                            margin="dense"
                            name="telefone"
                            label="Telefone"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={formattedPhone}
                            onChange={handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancelar</Button>
                        <Button type="submit" disabled={phoneError !== '' || emailError !== ''}>Salvar</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default CustomersPage;
