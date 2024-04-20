import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';

function ProductDetailsDialog({ product, onClose, onAddToCart }) {
  const [selectedPriceType, setSelectedPriceType] = useState('primary');

  const handleRadioChange = (event) => {
    setSelectedPriceType(event.target.value);
  };

  return (
    <Dialog className='rounded-0' header={product.name} blockScroll={true} modal={false} visible={true} onHide={onClose} style={{ width: '100vw', maxHeight: 'calc(100vh - 60px)' }}>
      <div className='row justify-content-center text-center p-0'>
        <img className='img-fluid col-6' src={product.image} alt={product.title} />
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

        <p className='mt-3 mb-5'>{product.description}</p>
      </div>
      <div className="dialog-footer BrandColor">
        <button className='btn text-light' onClick={onAddToCart}>Agregar al carrito</button>
      </div>
    </Dialog>
  );
}

export default ProductDetailsDialog;
