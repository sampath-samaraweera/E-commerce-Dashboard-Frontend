import React from 'react';
import Button from '@mui/material/Button';

const CustomButton = ({ children, onClick, size, color, ...props }) => {
  return (
    <Button
      sx={{
        backgroundColor: color, // default background color
        color: 'white', // default text color
        '&:hover': {
          backgroundColor: 'gray', // background color on hover
        }, // add some margin top
      }}
      size={size}
      variant="contained"
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
