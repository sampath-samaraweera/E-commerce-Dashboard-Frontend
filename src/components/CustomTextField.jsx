import React from 'react';
import TextField from '@mui/material/TextField';

const CustomTextField = ({ label, value, onChange }) => {
  return (
    <TextField
      sx={{
        width: '100%',
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: '#2C3E50', 
          },
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: '#2C3E50',
        },
      }}
      size="small"
      variant="outlined"
      label={label}
      value={value}
      onChange={onChange}
    />
  );
};

export default CustomTextField;
