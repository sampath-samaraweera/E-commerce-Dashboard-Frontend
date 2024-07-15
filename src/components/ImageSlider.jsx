import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';

const items = [
    {
        img: 'https://res.cloudinary.com/ddevwsadh/image/upload/v1720989237/techstore/tkj67gbdqq1k9y3zvohh.jpg',
        title: 'Offer 1'
    },
    {
        img: 'https://res.cloudinary.com/ddevwsadh/image/upload/v1720989237/techstore/nrty1lzp3dvjqvcsv95f.jpg',
        title: 'Offer 2'
    },
    {
        img: 'https://res.cloudinary.com/ddevwsadh/image/upload/v1720989238/techstore/lkylpqv5gnj7hy62gp5u.jpg',
        title: 'Offer 3'
    },
    {
        img: 'https://res.cloudinary.com/ddevwsadh/image/upload/v1720989238/techstore/pyfzovsirygszifkt2cb.jpg',
        title: 'Offer 4'
    }
];

const ImageSlider = () => {
    return (
        <Carousel>
            {items.map((item, i) => (
                <Paper key={i}>
                    <img src={item.img} alt={item.title} style={{ width: '100%', height: 'auto' }} />
                </Paper>
            ))}
        </Carousel>
    );
};

export default ImageSlider;
