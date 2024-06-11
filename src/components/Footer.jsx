import React,{useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


export default function Footer() {

    const auth = localStorage.getItem('token');

    return (
        <div className="footer">
            {auth?(
                <Box >
                <AppBar position="static" color="transparent">
                    <Toolbar sx={{alignSelf: 'center'}}>
                    <Typography variant="h5"  sx={{display:"block", padding: '20px' }}>
                        Tech Store
                    </Typography>
                    </Toolbar>
                </AppBar>
                </Box>
            ):(null)}

        </div>
    );
}
