import * as React from 'react';
import { useState, useEffect } from 'react';

import * as PaymentService from './../services/payment.services.js'

import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useParams } from 'react-router';

import IconButton from '@mui/material/IconButton';
import GppGoodIcon from '@mui/icons-material/GppGood';
import SendIcon from '@mui/icons-material/Send';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';


function PaymentPage() {

  const {id} = useParams()
  const [flex, setFlex] = React.useState(true);
  const [currentCart, setCurrentCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [preferenceId, setPreferenceId] = useState(null)

  const totalPrice = currentCart.reduce((total, item) => total + item.price, 0);

  // Función para eliminar un ítem del carrito
  const removeItem = (itemId) => {
    const updatedCart = currentCart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCurrentCart(updatedCart);
  };

  useEffect(() =>{
    setPreferenceId(id)
    console.log(id)
  },[])



  initMercadoPago('TEST-0b51da36-a519-4986-a25d-f054723c52d5');


  return (

    <main className='container-fluid marginNavBar'>

    {currentCart.map(item => (<Stack spacing={2} alignItems="center" className={''}>
      <Card
        orientation="horizontal"
        variant="outlined"
        className={'mb-4'}
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

    <div className='col-10 text-center'>
      <p>Para continuar con la compra, comunicate a nuestro whatsapp para ultimar detalles!</p>
    </div>

    <p className="d-block marginCart text-center"> 
                <a href={'https://wa.me/message/5SDP3NRIKTN6H1'} className='btn btn-success'>Whatsapp</a>
              </p>

    <div className='col-12 p-0 text-center ulDecoration my-5'>
                <ul className='list-group list-group-flush'>
                  <li className='list-group-item fontListIcons text-center styleIconButton'>
                  <IconButton aria-label="Example " className=''>
                    <GppGoodIcon className='' />
                  </IconButton>
                  Garantía de por vida por el juego que compraste.
                  </li>
                  <li className='list-group-item text-center fontListIcons styleIconButton '>
                    <IconButton aria-label="Example">
                      <SendIcon />
                    </IconButton>
                    Entrega en el día. Una vez realizada la compra, uno de nuestros vendedores se contactará mediante whatsapp.
                  </li>
                  <li className='list-group-item text-center fontListIcons styleIconButton '>          
                    <IconButton aria-label="Example">
                      <WhatsAppIcon />
                    </IconButton>
                    Soporte 24/7. Ante cualquier duda, nuestro equipo de soporte responderá cualquier pregunta que tengas.
                    </li>
                </ul>
              </div>
              


                
                {/*{preferenceId && 
                <Wallet initialization={{ preferenceId: id}} />
                }  */}

    </main>
  );
}


export default PaymentPage