import React, { useState } from "react";

function ItemsCart() {
  // Obtener el carrito actual del localStorage
  const [currentCart, setCurrentCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  const totalPrice = currentCart.reduce((total, item) => total + item.price, 0);

  // Función para eliminar un ítem del carrito
  const removeItem = (itemId) => {
    const updatedCart = currentCart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCurrentCart(updatedCart);
  };

  return (
    <div>
      {currentCart.map(item => (
      <div class="card mb-3   vv" >
        <div class="row">
          <div class="col-md-4">
            <img  src={item.image} alt={item.name} class="img-fluid rounded-start"  />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{item.name}</h5>
              <p class="card-text"><strong>Precio:</strong> ${item.price}</p>
              <p class="card-text"><small class="text-body-secondary">{item.category}</small></p>
            </div>
            <button className="btn btn-danger" onClick={() => removeItem(item.id)}>Eliminar</button>

          </div>
        </div>
      </div>))}
              {currentCart.length === 0 || !currentCart ? <p>El carrito está vacío.</p> : null}


        {/* Mostrar el precio total */}
        {currentCart.length > 0 && (
          <div style={{ position: 'fixed', bottom: '0', left: '', height:'90px', width: '320px', backgroundColor: '#fff', textAlign: 'center', alignItems:'center',  margin:'auto', paddingTop: '5px', borderTop: '1px solid #ccc' }}>
            <p className="d-block marginCart">Total: ${totalPrice.toFixed(2)}</p>
            <button  className="btn BrandColor text-light marginCart">Comprar</button>
          </div>
        )}
  </div>
  );
}

export default ItemsCart;
