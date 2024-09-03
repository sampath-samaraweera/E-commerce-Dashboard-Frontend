import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Footer() {    

  return (
    <div className='footer'>
        <Box sx={{ display: 'flex', flexDirection: 'column',alignItems: 'center', marginInline: 3, padding: '30px'}}>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ paddingLeft: '10px' }}>
              Tech Store
            </Typography>
          </Box>          
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Typography variant="h7" sx={{ paddingLeft: '10px' }}>
              Powered By Google
            </Typography>
          </Box>
        </Box>
    </div>
  );
}
