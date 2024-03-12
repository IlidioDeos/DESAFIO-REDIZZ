import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomersPageHelpers } from '../utils/customersPage/customersPageHelpers';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { red, yellow, green, blue } from '@mui/material/colors';


const CustomersPage: React.FC = () => {
    const {
        customers,
        loading,
        isDialogOpen,
        currentCustomer,
        formattedPhone,
        phoneError,
        emailError,
        handleOpenDialog,
        handleCloseDialog,
        handleSubmit,
        handleChange,
        handleDelete
    } = useCustomersPageHelpers();

    const navigate = useNavigate();

    const handleBackToPrivate = () => {
        navigate('/private');
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box sx={{ width: '80%' }}>
                <img src="/assets/images/redizz_inteiro.png" alt="Logo da Empresa" style={{ width: '200px', marginBottom: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                <h1>Clientes</h1>
                <Button variant="contained" sx={{ backgroundColor: green[500], color: 'white', marginRight: '10px' }} onClick={() => handleOpenDialog()}>
                    Adicionar Cliente
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
                                <TableCell>Email</TableCell>
                                <TableCell>Telefone</TableCell>
                                <TableCell>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers.map((customer) => (
                                <TableRow key={customer.id}>
                                    <TableCell>{customer.nome}</TableCell>
                                    <TableCell>{customer.email}</TableCell>
                                    <TableCell>{customer.telefone}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" sx={{ backgroundColor: yellow[700], color: 'white', marginRight: '5px' }} onClick={() => handleOpenDialog(customer)}>
                                            Editar
                                        </Button>
                                        <Button variant="contained" sx={{ backgroundColor: red[700], color: 'white' }} onClick={() => handleDelete(customer.id)}>
                                            Deletar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
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
            </Box>
        </Box>
    );
};

export default CustomersPage;
