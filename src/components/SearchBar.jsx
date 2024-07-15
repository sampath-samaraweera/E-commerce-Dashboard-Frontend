import React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import { Search } from '@mui/icons-material';

const ariaLabel = { 'aria-label': 'description' };

const SearchBar = ({ onSearch }) => {

    return (
        <Box
            component="form"
            sx={{
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center" ,
                backgroundColor: "white",
                borderRadius: "25px",
                paddingBlock: "3px",
                paddingInline: "15px",
            }}
            noValidate
            autoComplete="off"
        >
            <Search sx={{ paddingRight: "5px", color: 'gray'}}/>
            <Input 
                placeholder="Search Product" 
                inputProps={ariaLabel} 
                onChange={(event) => onSearch(event)}
                disableUnderline
            />
        </Box>

    );
};

export default SearchBar;
