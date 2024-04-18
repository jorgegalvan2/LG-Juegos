import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';

import * as NotifyHelper from '../../helpers/notify.js'

function ProductDetailsDialog({ product, onClose, onAddToCart, item }) {

  const [selectedPriceType, setSelectedPriceType] = useState('primary');

  const handleRadioChange = (event) => {
    setSelectedPriceType(event.target.value);
  };

  return (
    <Dialog className='rounded-0' header={product.name} blockScroll={true} modal={false} visible={true} onHide={onClose} style={{ width: '100vw', maxHeight: 'calc(100vh - 60px)' }}>
    <div className='row justify-content-center p-0'>
      <img className='img-fluid col-6' src={product.image} alt={product.title} />
      <p className='text-center fs-5 mt-3'>{product.category}</p>

      {!product.secondaryPrice  && <p className='text-center fs-5'><strong>Precio:</strong> ${product.price}</p>}

      {product.secondaryPrice  && <>
        {selectedPriceType === 'primary' && <p className='text-center fs-5'><strong>Precio:</strong> ${product.price}</p>}
        {selectedPriceType === 'secondary' && <p className='text-center fs-5'><strong>Precio:</strong> ${product.secondaryPrice}</p>}
      
      <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
        <input type="radio" className="btn-check" name="priceType" id="primaryRadio" value="primary" onChange={handleRadioChange} checked={selectedPriceType === 'primary'} />
        <label className="btn btn-outline-primary" htmlFor="primaryRadio">Primaria</label>

        <input type="radio" className="btn-check" name="priceType" id="secondaryRadio" value="secondary" onChange={handleRadioChange} checked={selectedPriceType === 'secondary'} />
        <label className="btn btn-outline-primary" htmlFor="secondaryRadio">Secundaria</label>
      </div>
      </>}
      <p className='mt-3 mb-5'>{product.description}</p>
    </div>
    <div className="dialog-footer BrandColor">
      <button className='btn text-light' onClick={onAddToCart}>Agregar al carrito</button>
    </div>
  </Dialog>
  );
}

export default ProductDetailsDialog;

