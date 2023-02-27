import { forwardRef, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from '@emotion/styled';
import vacanteApi from '../api/vacanteApi';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DialogActions, DialogContentText, DialogContent, DialogTitle, Dialog, Alert, Slide, TextField, Snackbar, Select, MenuItem, InputLabel } from '@mui/material';



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

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export const Ciudadanos = () => {

    const [ciudadanos, setCiudadanos] = useState([]);
    const [formCiudadanos, setFormCiudadanos] = useState({
        tipo_documento_id: 0,
        documento: "",
        nombres: "",
        apellidos: "",
        fecha_nacimiento: "",
        profesion: "",
        aspiracion_salarial: 0,
        correo_electronico: ""
    })

    const { tipo_documento_id, documento, nombres, apellidos, fecha_nacimiento, profesion, aspiracion_salarial, correo_electronico } = formCiudadanos

    const [idCiudadanos, setIdCiudadanos] = useState([]);
    const [nombresCiudadano, setNombresCiudadano] = useState([])
    const [message, setMessage] = useState("")
    const [openCrearCiudadano, setOpenCrearUsuario] = useState(false);
    const [openEliminar, setOpenEliminar] = useState(false);
    const [openMessage, setOpenMessage] = useState(false)
    const [severity, setSeverity] = useState("success")
    const [tipoDocumento, setTipoDocumento] = useState([])

    useEffect(() => {
        async function fetchData() {
            // You can await here
            cargarDatos()
        }
        fetchData();
    }, []);

    const cargarDatos = async () => {
        const data = await vacanteApi.get('/ciudadanos');
        const dataTipoDocumento = await vacanteApi.get('/tipos-documento')
        setCiudadanos(data.data)
        setTipoDocumento(dataTipoDocumento.data)
    }

   
    const abrirAplicacionParaEliminarCiudadano = (id, nombres) => {
        setOpenEliminar(true)
        setIdCiudadanos(id)
        setNombresCiudadano(nombres)
    }


    const abrirAplicacionParaCrearCiudadano = () => {
        setOpenCrearUsuario(true)
    }

    const eliminarCiudadano = async () => {
        try {
            const dataEliminarCiudadano = await vacanteApi.delete(`/ciudadanos/${idCiudadanos}`)
            console.log(dataEliminarCiudadano);
            setMessage("Se elimino exitosamente el ciudadano");
            setSeverity("success");
            cargarDatos();
            setOpenMessage(true);
        } catch (error) {
            console.log(error);
            const mensaje = error.response.data.msg
            setMessage(mensaje);
            setSeverity("error")
            setOpenMessage(true)
        }

    }

    const crearCiudadano = async (event) => {
        event.preventDefault()

        if (documento !== null && nombres !== null && apellidos !== null && fecha_nacimiento !== null && profesion !== null && aspiracion_salarial !== null && correo_electronico !== null) {
            try {
                const dataCrearCiudadano = await vacanteApi.post('/ciudadanos', formCiudadanos)
                console.log(dataCrearCiudadano);
                setMessage("Se creo exitosamente el ciudadano");
                setSeverity("success");
                cargarDatos()
                setOpenMessage(true);
                setOpenCrearUsuario(false);
            } catch (error) {
                console.log(error);
                const mensaje = error.response.data.msg
                setMessage(mensaje);
                setSeverity("error")
                setOpenMessage(true)
            }
        }
    }

    const manejarTipoDocumento = ({ target }) => {
        const { name, value } = target;
        setFormCiudadanos({
            ...formCiudadanos,
            [name]: value
        })
    }

    const handleClose = () => {
        setOpenEliminar(false);
        setOpenCrearUsuario(false);
    };



    return (
        <TableContainer component={Paper} elevation={0} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Snackbar open={openMessage} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
                    {message}
                </Alert>
            </Snackbar>
            <Button sx={{ margin: 5, alignSelf: "end" }} variant="outlined" onClick={abrirAplicacionParaCrearCiudadano}>Crear</Button>
            <Table sx={{ maxWidth: 900, }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Numero de Documento</StyledTableCell>
                        <StyledTableCell>Nombres</StyledTableCell>
                        <StyledTableCell>Apellidos</StyledTableCell>
                        <StyledTableCell>Fecha de Nacimiento</StyledTableCell>
                        <StyledTableCell>Profesión</StyledTableCell>
                        <StyledTableCell>Aspiración Salarial</StyledTableCell>
                        <StyledTableCell>Correo Electronico</StyledTableCell>
                        <StyledTableCell>Tipo de Documento</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
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
                            <StyledTableCell>{row.nombre_tipo_documento}</StyledTableCell>
                            <StyledTableCell>
                                <DeleteIcon variant="outlined" sx={{cursor: 'pointer'}} onClick={() => abrirAplicacionParaEliminarCiudadano(row.id, row.nombres)} />
                                <EditIcon />
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
                <Dialog
                    open={openEliminar}
                    fullWidth={true}
                    maxWidth='sm'
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            ¿Estas seguro de que quieres eliminar a {nombresCiudadano}?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button onClick={eliminarCiudadano}>Confirmar</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={openCrearCiudadano} onClose={handleClose}>
                    <form onSubmit={crearCiudadano}>
                        <DialogTitle>Crear Ciudadano</DialogTitle>
                        <InputLabel htmlFor="tipo_documento">tipo documento</InputLabel>
                        <Select
                            labelId="tipo_documento"
                            id="tipo_documento"
                            type="select"
                            fullWidth
                            value={tipo_documento_id}
                            name='tipo_documento_id'
                            label="Tipo documento"
                            onChange={manejarTipoDocumento}
                            variant="outlined"
                        >
                            {
                                tipoDocumento.map((tipo) => (
                                    <MenuItem key={tipo.id} value={tipo.id}>{tipo.nombre}</MenuItem>
                                ))
                            }
                        </Select>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="documento"
                                label="N° de documento"
                                value={documento}
                                name='documento'
                                onChange={manejarTipoDocumento}
                                type="text"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="nombres"
                                label="Nombres"
                                value={nombres}
                                name='nombres'
                                onChange={manejarTipoDocumento}
                                type="text"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="apellidos"
                                value={apellidos}
                                name='apellidos'
                                onChange={manejarTipoDocumento}
                                label="Apellidos"
                                type="text"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="fecha_nacimiento"
                                value={fecha_nacimiento}
                                name='fecha_nacimiento'
                                onChange={manejarTipoDocumento}
                                type="date"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="profesion"
                                value={profesion}
                                name='profesion'
                                onChange={manejarTipoDocumento}
                                label="Profesión"
                                type="text"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="aspiracion_salarial"
                                value={aspiracion_salarial}
                                name='aspiracion_salarial'
                                onChange={manejarTipoDocumento}
                                label="Aspiración Salarial"
                                type="number"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="correo_electronico"
                                name='correo_electronico'
                                value={correo_electronico}
                                onChange={manejarTipoDocumento}
                                label="Correo electronico"
                                type="email"
                                fullWidth
                                variant="outlined"
                            />
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={handleClose}>Cancelar</Button>
                            <Button type='submit'>Registrar</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Table>
        </TableContainer>
    );
}
