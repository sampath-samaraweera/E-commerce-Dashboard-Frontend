import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CustomButton from './CustomButton'


export default function CustomTable({rows, deleteProduct, updateProduct}) {
  return (
    <TableContainer sx={{ backgroundColor:"rgba(214, 214, 214, 0.4)",maxHeight: 410, maxWidth:'100%' }} component={Paper}>
      <Table aria-label="simple table">
        <TableHead sx={{height:"65px"}}>
          <TableRow sx={{ backgroundColor:"rgba(214, 214, 214, 1)"}}>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>No.</TableCell>
            <TableCell align="left" sx={{ fontWeight: 'bold' }}>Company</TableCell>
            <TableCell align="left" sx={{ fontWeight: 'bold' }}>Product Name</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Price</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Category</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Operation</TableCell>
          </TableRow>
        </TableHead>
        {rows?(
            <TableBody>
            {rows.map((row,index) => (
                <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="left">{row.company}</TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell sx={{ width:'3rem' }} align="right">{row.price}</TableCell>
              <TableCell align="center">{row.category}</TableCell>
              <TableCell sx={{ width:'10rem'  }} align="center">
                <div style={{gap: '10px',display:'flex', flexDirection:'row'}}>
                    <CustomButton size="small" color="red" onClick={() => deleteProduct(row._id)}>Delete</CustomButton>
                    <CustomButton size="small" color='green' onClick={() => updateProduct(row)}>Update</CustomButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        ): (
            <span>No Products Found</span>
        )}
      </Table>
    </TableContainer>
  );
}
