import React from 'react';
import TextField from '@mui/material/TextField';

const CustomTextField = ({ label, value, onChange }) => {
  return (
    <TextField
      sx={{
        width: '25rem',
        marginTop: '1rem',
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: 'red', // border color when focused
          },
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: 'red', // label color when focused
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
