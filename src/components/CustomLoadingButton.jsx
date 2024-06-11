import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

const CustomLoadingButton = ({ children, onClick, size, color,loading,  ...props }) => {
  return (
    <LoadingButton 
    sx={{
      backgroundColor: color, // default background color
      color: 'white', // default text color
      '&:hover': {
        backgroundColor: 'darkred', // background color on hover
      }, // add some margin top
    }}
    size={size}
    onClick={onClick}
    loading={loading}
    loadingPosition="center"
    variant="contained"
  >
    <span>{children}</span>
  </LoadingButton>
  );
};

export default CustomLoadingButton;
