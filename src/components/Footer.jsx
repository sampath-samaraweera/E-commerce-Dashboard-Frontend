import * as React from 'react';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { GitHub, LinkedIn, Twitter } from '@mui/icons-material';

export default function Footer() {    
  return (
    <Box className='footer' sx={{backgroundColor: '#2C3E50', color: '#ECF0F1', padding: '20px 0', marginTop: "50px" }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Branding */}
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#ECF0F1' }}>
          Tech Store
        </Typography>
        <Typography variant="subtitle1" sx={{ marginTop: 1, color: '#ECF0F1' }}>
          Your one-stop shop for all tech needs
        </Typography>

        {/* Additional Links or Information */}
        <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
          <Link href="#" sx={{ color: '#ECF0F1', fontSize: '0.9rem' }}>
            About Us
          </Link>
          <Link href="#" sx={{ color: '#ECF0F1', fontSize: '0.9rem' }}>
            Contact
          </Link>
          <Link href="#" sx={{ color: '#ECF0F1', fontSize: '0.9rem' }}>
            Privacy Policy
          </Link>
        </Box>

        {/* Social Media Icons */}
        <Box sx={{ display: 'flex', gap: 1.5, marginTop: 2 }}>
          <IconButton href="#" sx={{ color: '#ECF0F1' }}>
            <LinkedIn />
          </IconButton>
          <IconButton href="#" sx={{ color: '#ECF0F1' }}>
            <GitHub />
          </IconButton>
          <IconButton href="#" sx={{ color: '#ECF0F1' }}>
            <Twitter />
          </IconButton>
        </Box>

        {/* Footer Bottom */}
        <Typography variant="body2" sx={{ marginTop: 3, fontSize: '0.8rem' }}>
          © {new Date().getFullYear()} Tech Store. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
