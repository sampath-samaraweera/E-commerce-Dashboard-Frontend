import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

const CustomLoadingButton = ({ children, onClick, size, color, loading, width, ...props }) => {
  return (
    <LoadingButton 
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
      onClick={onClick}
      loading={loading}
      loadingPosition="center"
      variant="contained"
    >
      {children}
    </LoadingButton>
  );
};

export default CustomLoadingButton;
