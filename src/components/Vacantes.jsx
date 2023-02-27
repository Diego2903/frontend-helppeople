
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from '@emotion/styled';
import vacanteApi from '../api/vacanteApi';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Alert, Snackbar } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const Vacantes = () => {

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("")
    const [severity, setSeverity] = useState("success")
    const [openMessage, setOpenMessage] = useState(false)
    const [vacantes, setVacantes] = useState([]);
    const [ciudadanos, setCiudadanos] = useState([]);
    const [idCiudadano, setIdCiudadano] = useState([]);
    const [idVacante, setIdVacante] = useState([]);


    useEffect(() => {
        async function fetchData() {
            // You can await here
            cargarDatos()
        }
        fetchData();
    }, []);

    const cargarDatos = async () => {
        const data = await vacanteApi.get('/vacantes');
        const dataCiudadanos = await vacanteApi.get('/ciudadanos');
        setVacantes(data.data)
        setCiudadanos(dataCiudadanos.data)
    }

    const abrirAplicacion = (id) => {
        setOpen(true)
        setIdVacante(id)
    }

    const handleClose = () => {
        setOpenMessage(false);
    };

    const manejarNombreCiudadano = (event) => {
        setIdCiudadano(event.target.value)
    }

    const guardarPostulacion = async () => {


        const id = idCiudadano.id
        if (idCiudadano === null && idVacante === null) return;
        try {
            const dataPostulacionVacante = await vacanteApi.post('/vacantes/aplicar', { idCiudadano: id, idVacante: idVacante })
            console.log(dataPostulacionVacante.data);
            setMessage("Se aplico exitosamente a la vacante");
            setSeverity("success");
            cargarDatos();
            setOpenMessage(true);
            setOpen(false);
        } catch (error) {
            console.log(error);
            const mensaje = error.response.data.msg
            setMessage(mensaje);
            setSeverity("error")
            setOpenMessage(true)
        }

    }


    return (
        <TableContainer component={Paper} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Snackbar open={openMessage} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
                    {message}
                </Alert>
            </Snackbar>
            <Table sx={{ maxWidth: 900, margin: 12}} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Código</StyledTableCell>
                        <StyledTableCell>Cargo</StyledTableCell>
                        <StyledTableCell>Descripción</StyledTableCell>
                        <StyledTableCell>Empresa</StyledTableCell>
                        <StyledTableCell>Salario</StyledTableCell>
                        <StyledTableCell>Estado</StyledTableCell>
                        <StyledTableCell>Aplicar</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {vacantes.map((row) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell>{row.codigo}</StyledTableCell>
                            <StyledTableCell>{row.cargo}</StyledTableCell>
                            <StyledTableCell>{row.descripcion}</StyledTableCell>
                            <StyledTableCell>{row.empresa}</StyledTableCell>
                            <StyledTableCell>{row.salario}</StyledTableCell>
                            <StyledTableCell>{row.disponible ? 'Disponible' : 'No Disponible'}</StyledTableCell>
                            <StyledTableCell>
                                <Button variant="outlined" onClick={() => abrirAplicacion(row.id)} disabled={!row.disponible}>
                                    Aplicar
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
            <>

                <Dialog
                    open={open}
                    fullWidth={true}
                    maxWidth='sm'
                >
                    <DialogTitle>Aplicar a ofertas</DialogTitle>
                    <DialogContent>
                        <Box
                            noValidate
                            component="form"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                m: 'auto',
                                width: 'fit-content',
                            }}
                        >
                            <FormControl sx={{ mt: 2, minWidth: 250 }}>
                                <InputLabel htmlFor="ciudadanos">ciudadanos</InputLabel>
                                <Select
                                    autoFocus
                                    value={idCiudadano}
                                    label="ciudadanos"
                                    onChange={manejarNombreCiudadano}
                                    inputProps={{
                                        name: 'ciudadanos',
                                        id: 'ciudadanos',
                                    }}
                                >
                                    {ciudadanos.map((ciudadano) => (
                                        <MenuItem key={ciudadano.id} value={ciudadano}>
                                            {ciudadano.nombres}
                                        </MenuItem>
                                    ))
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Cerrar</Button>
                        <Button onClick={guardarPostulacion}>Guardar</Button>
                    </DialogActions>
                </Dialog>
            </>
        </TableContainer>
    );
}