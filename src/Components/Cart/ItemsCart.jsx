import * as React from 'react';
import { useState } from 'react';

import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Switch from '@mui/joy/Switch';

export default function ItemsCart() {
  const [flex, setFlex] = React.useState(true);
  const [currentCart, setCurrentCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  const totalPrice = currentCart.reduce((total, item) => total + item.price, 0);

  // Función para eliminar un ítem del carrito
  const removeItem = (itemId) => {
    const updatedCart = currentCart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCurrentCart(updatedCart);
  };

  return (
    <>
    {currentCart.map(item => (<Stack spacing={2} alignItems="center">
      <Card
        orientation="horizontal"
        variant="outlined"
        className={'my-1'}
        sx={{ boxShadow: 'none', resize: 'horizontal', overflow: 'auto', width: 315, }}
      >
        <AspectRatio ratio="" flex={flex} sx={{ flexBasis: 120, width: '100%' }}>
          <img src={item.image} alt="" className='img-fluid' />
        </AspectRatio>
        <CardContent>
          <Typography level="body-xs">{item.category}</Typography>
          <Typography level="title-sm" component="div">
            {item.name}
          </Typography>
          <Typography level="body-lg">
              ${item.price}
          </Typography>
          <Typography level="body-sm">
              {item.level}
          </Typography>
          <CardActions buttonFlex="none">
            <Button  color="danger" size="sm"  onClick={() => removeItem(item.id)}>
              Eliminar
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </Stack>))}
    {currentCart.length === 0 || !currentCart ? <p>El carrito está vacío.</p> : null}
    
      {currentCart.length > 0 && (
        <>
            <div className='mt-5 pt-5'>

            </div>
            <div style={{ position: 'fixed', bottom: '0', left: '', height:'90px', width: '320px', backgroundColor: '#fff', textAlign: 'center', alignItems:'center',  margin:'auto', paddingTop: '5px', borderTop: '1px solid #ccc', zIndex: 2 }}>
              <p className="d-block marginCart">Total: ${totalPrice.toFixed(2)}</p>
              <button  className="btn BrandColor text-light marginCart">Comprar</button>
            </div>
            </> )}
      </>
  );
}