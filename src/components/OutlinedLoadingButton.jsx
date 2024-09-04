import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

const OutlinedLoadingButton = ({ children, onClick, size, color,borderColor, loading, width, ...props }) => {
  return (
    <LoadingButton 
      sx={{
        width: width || 'auto',
        textTransform: 'none',
        borderColor: borderColor || 'black',
        color: color || 'black',
        '&:hover': {
          backgroundColor: '#2C3E50',
          color: 'white',
        },
        borderRadius: '4px',
        padding: '8px 16px',
        fontWeight: 500,
      }}
      size={size}
      onClick={onClick}
      loading={loading}
      loadingPosition="center"
      variant="outlined"
    >
      {children}
    </LoadingButton>
  );
};

export default OutlinedLoadingButton;
