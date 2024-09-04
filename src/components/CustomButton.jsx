import React from 'react';
import Button from '@mui/material/Button';

const CustomButton = ({ children, onClick, size, color, width, ...props }) => {
  return (
    <Button
      sx={{
        width: width || 'auto',
        textTransform: 'none',
        backgroundColor: color, // Primary color (Mint Green)
        color: '#FFFFFF', // White text
        '&:hover': {
          backgroundColor: '#2C3E50', // Midnight Blue on hover
        },
        borderRadius: '4px',
        padding: '8px 16px',
        fontWeight: 500,
      }}
      size={size}
      variant="contained"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
