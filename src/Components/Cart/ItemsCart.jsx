import * as React from 'react';
import { useState, useEffect } from 'react';

import * as PaymentService from './../../services/payment.services.js'

import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useNavigate } from 'react-router-dom';


export default function ItemsCart() {
  const [flex, setFlex] = React.useState(true);
  const [currentCart, setCurrentCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const navigate = useNavigate()

  const totalPrice = currentCart.reduce((total, item) => total + item.unit_price, 0);

  // Función para eliminar un ítem del carrito
  const removeItem = (itemId) => {
    const updatedCart = currentCart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCurrentCart(updatedCart);
  };

  useEffect(() =>{
    console.log(currentCart)
  },[])

  const [preferenceId, setPreferenceId] = useState(null)
  initMercadoPago('TEST-0b51da36-a519-4986-a25d-f054723c52d5');

  const createPreference = () => {
    console.log(currentCart)
    PaymentService.payment(currentCart)
      .then((id) => {
        //setPreferenceId(id.id)

        navigate(`/payment/${id.id.id}`)
      })
  }

  /*const createPreference = () =>{
    navigate('/payment/1')
  }*/

  return (
    <>
    {currentCart.map(item => (<Stack spacing={2} alignItems="center">
      <Card
        orientation="horizontal"
        variant="outlined"
        className={'my-1'}
        sx={{ boxShadow: 'none', resize: 'horizontal', overflow: 'auto', width: 315, }}
      >

          <img src={item.image} alt="" className='img-fluid imgItemsCart rounded-4' />

        <CardContent>
          <Typography level="body-xs">{item.category}</Typography>
          <Typography level="title-sm" component="div">
            {item.title}
          </Typography>
          <Typography level="body-lg">
              ${item.unit_price}
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
              <p className="d-block marginCart"> 
                <button className='btn BrandColor text-light marginCart' onClick={createPreference}>Comprar</button>
                {preferenceId && 
                <Wallet initialization={{ preferenceId: preferenceId}} />
                }</p>
            </div>
            </> )}
      </>
  );
}