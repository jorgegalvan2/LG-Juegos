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
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '50px', overflowY: 'auto', flex: '1' }}>
        {currentCart.map(item => (
          <div key={item.id} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
            {/* Imagen del producto */}
            <img className="img-fluid h-100" src={item.image} alt={item.name} style={{ width: '100px', marginRight: '20px' }} />

            {/* Detalles del producto */}
            <div>
              <h4 className="fs-5">{item.name}</h4>
              <p><strong>Precio:</strong> ${item.price}</p>
              <p>{item.category}</p>
              {/* Botón para eliminar el ítem */}
              <button className="btn btn-danger" onClick={() => removeItem(item.id)}>Eliminar</button>
              {/* Agregar más detalles del producto aquí si es necesario */}
            </div>
          </div>
        ))}
        {/* Mostrar mensaje si el carrito está vacío */}
        {currentCart.length === 0 || !currentCart ? <p>El carrito está vacío.</p> : null}
      </div>
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
