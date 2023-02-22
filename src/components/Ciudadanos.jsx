
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
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


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


export const Ciudadanos = () => {

    const [ciudadanos, setCiudadanos] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            // You can await here
            cargarDatos()
        }
        fetchData();
    }, []);

    const cargarDatos = async () => {
        const data = await vacanteApi.get('/ciudadanos');
        setCiudadanos(data.data)
    }

    const abrirAplicacion = () => {
        setOpen(true)
    }



    return (
        <TableContainer component={Paper} elevation={0} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <Button sx={{margin: 5, alignSelf : "end"}}>Crear</Button>
            <Table sx={{ maxWidth: 900,  }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Documento</StyledTableCell>
                        <StyledTableCell>Nombres</StyledTableCell>
                        <StyledTableCell>Apellidos</StyledTableCell>
                        <StyledTableCell>Fecha de Nacimiento</StyledTableCell>
                        <StyledTableCell>Profesión</StyledTableCell>
                        <StyledTableCell>Aspiración Salarial</StyledTableCell>
                        <StyledTableCell>Correo Electronico</StyledTableCell>
                        <StyledTableCell>Crear ciudadano</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ciudadanos.map((row) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell>{row.documento}</StyledTableCell>
                            <StyledTableCell>{row.nombres}</StyledTableCell>
                            <StyledTableCell>{row.apellidos}</StyledTableCell>
                            <StyledTableCell>{row.fecha_nacimiento}</StyledTableCell>
                            <StyledTableCell>{row.profesion}</StyledTableCell>
                            <StyledTableCell>{row.aspiracion_salarial}</StyledTableCell>
                            <StyledTableCell>{row.correo_electronico}</StyledTableCell>
                            <StyledTableCell>
                               <DeleteIcon />
                               <EditIcon />
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
