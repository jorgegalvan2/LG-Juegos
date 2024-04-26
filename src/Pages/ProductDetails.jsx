// ProductDetails.js
import { useEffect, useState } from 'react';
import ProductService from './../services/ProductService.jsx'
import { useParams } from 'react-router';

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

  return (
    <main className='container-fluid mt-5'>
      {product && 
        <div className='row justify-content-center text-center p-0'>
        <img className='img-fluid col-12 p-0' src={product.imageDetails} alt={product.title} />
        <p className='text-center fs-5 mt-3'>{product.category}</p>
        
          {product.category === 'Playstation 3' ? (
            <div className="row justify-content-center">
              <div className='col-12 text-center'> 
                <div className="d-inline-block me-1 oldPriceNotOffer">${product.offerPrice ? product.price : product.offerPrice}</div>
                {product.offerPrice && <div className="d-inline-block ms-1">${product.offerPrice}</div>}
              </div>

            </div>
          ) : (
          <>
            <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
              <input type="radio" className="btn-check" name="priceType" id="primaryRadio" value="primary" onChange={handleRadioChange} checked={selectedPriceType === 'primary'} />
              <label className="btn btn-outline-secondary" htmlFor="primaryRadio">Primaria</label>
    
              <input type="radio" className="btn-check" name="priceType" id="secondaryRadio" value="secondary" onChange={handleRadioChange} checked={selectedPriceType === 'secondary'} />
              <label className="btn btn-outline-secondary" htmlFor="secondaryRadio">Secundaria</label>
            </div>
            
            <div className="row justify-content-center mt-3">
              {selectedPriceType === 'primary' ?
              <>
              <div className='col-12 text-center'>
                <div className={`d-inline-block me-1 ${product.offerPrice ? 'oldPriceNotOffer' : 'offerPrice'}`}>{'$' + ' ' + product.price}</div>
                {product.offerPrice && <div className={`d-inline-block ms-1 offerPrice`}>{'$' + ' ' + product.offerPrice}</div>}
              </div>

              <div className='col-9'>
                <button className='btn BrandColor text-light rounded-4 my-4 mx-5' onClick={() => onAddToCart(selectedPriceType)}>Agregar al carrito</button>
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
                <button className='btn BrandColor text-light rounded-4 my-4 mx-5' onClick={() => onAddToCart(selectedPriceType)}>Agregar al carrito</button>
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
    </main>
  );
}

export default ProductDetails;
