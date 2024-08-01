// ProductDetails.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ProductService from './../services/ProductService.jsx'
import * as NotifyHelper from "../helpers/notify.js"
import { ToastContainer, toast } from 'react-toastify';

import IconButton from '@mui/material/IconButton';
import GppGoodIcon from '@mui/icons-material/GppGood';
import SendIcon from '@mui/icons-material/Send';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import { Helmet } from 'react-helmet';

function ProductDetails() {
  const { id } = useParams();
  const productId = parseInt(id);

  const [game, setGame] = useState()
  const [product, setProduct] = useState()

  useEffect(() =>{
    console.log(productId)
    const product = ProductService.find(product => product.id === productId);
    if (product) {
      setProduct(product);
      console.log(product)
    }


  },[id]) // Asegúrate de que useEffect se ejecute cada vez que el ID cambie

  const [selectedPriceType, setSelectedPriceType] = useState('primary');

  const handleRadioChange = (event) => {
    setSelectedPriceType(event.target.value);
  };

  const addToCart = (levelGame) => {
    let priceDinamic
    if(levelGame == 'primary' && product.offerPrice){
      priceDinamic = product.offerPrice
    } else if (levelGame == 'primary' && !product.offerPrice){
      priceDinamic = product.price
    } else if (levelGame !== 'primary' && product.offerSecondaryPrice){
      priceDinamic = product.offerSecondaryPrice
    } else if (levelGame !== 'primary' && !product.offerSecondaryPrice){
      priceDinamic = product.secondaryPrice
    }

    const cartItem = {
      id: product.id, // Otra propiedad única para identificar el selectedProducto
      title: product.title,
      unit_price: priceDinamic,
      quantity: 1,
      image: product.image,
      level: levelGame == 'primary' ? 'Primaria' : 'Secundaria',
      category: product.category
    };
  
    // Obtener el carrito actual del localStorage o crear uno nuevo si no existe
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    currentCart.push(cartItem);
  
    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem('cart', JSON.stringify(currentCart));
    NotifyHelper.notifySuccess("Listo!")
  };

  return (
    <main className='container-fluid mt-5 pt-4'>
      {product && 
        <div className='row justify-content-center text-center p-0 marginDetails'>
        <img className='img-fluid col-12 col-lg-4 p-0 imgProductDetails' src={product.imageDetails} alt={product.title} />
        <div className='col-10 col-lg-6'>

          {product.category === 'PS3' ? (
            <div className="row justify-content-center mt-3">
            <div>
              {product.title}
            </div>
              <div className='mt-3'>
                <p>{product.category === 'PS3' ? 'Playstation 3' : null}</p>
              </div>
              <div className='col-12 text-center'> 
                <p className='d-block'>Precio</p>
                <div className={`d-inline-block me-1 ${product.offerPrice != 0 && 'oldPriceNotOffer'}`}>${product.price}</div>
                {product.offerPrice != 0 && <b className="d-inline-block ms-1">${product.offerPrice}</b>}
              </div>

              <div className='col-9'>
                <button className='btn btn-warning  rounded-4 my-4 mx-2 px-4' onClick={() => addToCart(selectedPriceType)}>Agregar al carrito</button>
              </div>

              
              <div className='col-12 p-0 text-center ulDecoration mb-3'>
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

            </div>
          ) :
          
          
          (
          <>
            <div className='mt-4'>
              <b>{product.title}</b>
            </div>
              <div className='mt-4'>
                <p >{product.category === 'PS4' ? 'Playstation 4' : 'Playstation 5'}</p>
              </div>

            <div className='col-12 align-items-center'>
              <div className="btn-group " role="group" aria-label="Basic radio toggle button group">
                <input type="radio" className={`btn-check  ${selectedPriceType == 'primary' ? '' : 'btn-warning'}`} name="priceType" id="primaryRadio" value="primary" onChange={handleRadioChange} checked={selectedPriceType === 'primary'} />
                <label className={`btn ${selectedPriceType == 'primary' ? 'btn-warning' : 'border'}`} htmlFor="primaryRadio">Primaria</label>
      
                <input type="radio" className={`btn-check `} name="priceType" id="secondaryRadio" value="secondary" onChange={handleRadioChange} checked={selectedPriceType === 'secondary'} />
                <label className={`btn ${selectedPriceType == 'secondary' ? 'btn-warning' : 'border'}`} htmlFor="secondaryRadio">Secundaria</label>
              </div>
            </div> 
         

            <div className="row justify-content-center mt-3">
              {selectedPriceType === 'primary' ?
              <>

              <div className='col-12 text-center'>
                <p className='d-block'>Precio</p>
                <div className={`d-inline-block me-1 ${product.offerPrice != 0 ? 'oldPriceNotOffer' : 'offerPrice'}`}>{'$' + ' ' + product.price}</div>
                {product.offerPrice != 0 && <b className={`d-inline-block ms-1 offerPrice`}>{'$' + ' ' + product.offerPrice}</b>}
              </div>

              <div className='col-9'>
                <button className='btn btn-warning  rounded-4 my-4 mx-2 px-4' onClick={() => addToCart(selectedPriceType)}>Agregar al carrito</button>
              </div>

              <p className='fontProductDetails'>
                <b className='d-block'>Licencia Primaria </b> Podes jugar sin conexión a internet, ademas de poder cosechar los logros desde tu perfil.
              </p>

              <div className='col-12 p-0 text-center ulDecoration mb-3'>
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
              </>
              :
              <>
              <div className='col-12 text-center'>
                <p className='d-block mb-1'>Precio</p>
                <div className={`d-inline-block me-1 mt-3 ${product.offerSecondaryPrice ? 'oldPriceNotOffer' : 'offerPrice'}`}>{'$' + ' ' + product.secondaryPrice}</div>
                {product.offerSecondaryPrice && <b className={`d-inline-block ms-1 offerPrice`}>{'$' + ' ' + product.offerSecondaryPrice}</b>}
              </div>

              <div className='col-9 '>
                <button className='btn btn-warning  rounded-4 my-4 mx-2 px-4' onClick={() => addToCart(selectedPriceType)}>Agregar al carrito</button>
              </div>

              <p className='fontProductDetails'>
                <b className='d-block'>Licencia Secundaria </b> Siempre necesitas conexión a internet. Jugás desde el perfil asignado, no podes jugar desde tu usuario.
              </p>

              <div className='col-12 p-0 text-center ulDecoration'>
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
              </>

              }

            </div>
          </>
        )}
          
        </div>
        <div className='col-10'>

          <p className='my-5'>{product.description}</p>
                 
        </div> 
      </div>}

      <ToastContainer
                    position="bottom-center"
                    autoClose={200}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
      
    </main>
  );
}

export default ProductDetails;
