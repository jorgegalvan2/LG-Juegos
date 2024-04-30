// ProductDetails.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ProductService from './../services/ProductService.jsx'
import * as NotifyHelper from "../helpers/notify.js"
import { ToastContainer, toast } from 'react-toastify';


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
      name: product.name,
      price: priceDinamic,
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
    console.log(currentCart)
  };

  return (
    <main className='container-fluid mt-5 pt-4'>
      {product && 
        <div className='row justify-content-center text-center p-0'>
        <img className='img-fluid col-12 p-0' src={product.imageDetails} alt={product.title} />
  
          {product.category === 'Playstation 3' ? (
            <div className="row justify-content-center mt-3">
              <div className='col-12 text-center'> 
                <div className="d-inline-block me-1 oldPriceNotOffer">${product.offerPrice ? product.price : product.offerPrice}</div>
                {product.offerPrice && <div className="d-inline-block ms-1">${product.offerPrice}</div>}
              </div>

            </div>
          ) : (
          <>
            <div className="btn-group mt-5" role="group" aria-label="Basic radio toggle button group">
              <input type="radio" className={`btn-check  ${selectedPriceType == 'primary' ? '' : 'btn-warning'}`} name="priceType" id="primaryRadio" value="primary" onChange={handleRadioChange} checked={selectedPriceType === 'primary'} />
              <label className={`btn ${selectedPriceType == 'primary' ? 'btn-warning' : 'border'}`} htmlFor="primaryRadio">Primaria</label>
    
              <input type="radio" className={`btn-check `} name="priceType" id="secondaryRadio" value="secondary" onChange={handleRadioChange} checked={selectedPriceType === 'secondary'} />
              <label className={`btn ${selectedPriceType == 'secondary' ? 'btn-warning' : 'border'}`} htmlFor="secondaryRadio">Secundaria</label>
            </div>
            
            <div className="row justify-content-center mt-3">
              {selectedPriceType === 'primary' ?
              <>
              <div className='col-12 text-center'>
                <div className={`d-inline-block me-1 ${product.offerPrice ? 'oldPriceNotOffer' : 'offerPrice'}`}>{'$' + ' ' + product.price}</div>
                {product.offerPrice && <div className={`d-inline-block ms-1 offerPrice`}>{'$' + ' ' + product.offerPrice}</div>}
              </div>

              <div className='col-9'>
                <button className='btn btn-warning  rounded-4 my-4 mx-2 px-4' onClick={() => addToCart(selectedPriceType)}>Agregar al carrito</button>
              </div>

              <div className='col-10 text-center ulDecoration'>
                <ul className='list-group list-group-flush'>
                  <li className='list-group-item'>Jugá con tu usuario</li>
                  <li className='list-group-item'>Recopilá logros</li>
                  <li className='list-group-item'> Jugá sin conexión a internet</li>
                </ul>
              </div>
              </>
              :
              <>
              <div className='col-12 text-center'>
                <div className={`d-inline-block me-1 ${product.offerSecondaryPrice ? 'oldPriceNotOffer' : 'offerPrice'}`}>{'$' + ' ' + product.secondaryPrice}</div>
                {product.offerSecondaryPrice && <div className={`d-inline-block ms-1 offerPrice`}>{'$' + ' ' + product.offerSecondaryPrice}</div>}
              </div>

              <div className='col-9'>
                <button className='btn btn-warning  rounded-4 my-4 mx-2 px-4' onClick={() => addToCart(selectedPriceType)}>Agregar al carrito</button>
              </div>

              <div className='col-10 text-center '>
                <ul className='list-group list-group-flush'>
                  <li className='list-group-item'>Jugá con el usuario de la cuenta</li>
                  <li className='list-group-item'>Los logros quedan en la cuenta</li>
                  <li className='list-group-item'>Siempre necesitás conexión a internet.</li>
                </ul>
              </div>
              </>

              }

            </div>
          </>
        )}

        <p className='mt-3 '>{product.description}</p>
        
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
