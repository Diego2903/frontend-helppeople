import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export const Navbar = () => {

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'space-beetwen', background: '#000', color: '#fff', padding: '15px' }}>
                <Typography component="h1">
                    <Link to="/" style={{ color: "#fff", textDecoration: 'none' }}>HELPPEOPLE</Link>
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'center', background: '#000', color: '#fff', padding: '15px' }}>
                    <Typography sx={{ minWidth: 100 }} component="a">
                        <Link to="/ciudadanos" style={{ color: "#fff", textDecoration: 'none' }}>Ciudadanos</Link>
                    </Typography>
                </Box>
            </Box>
        </>
    );
}