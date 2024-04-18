import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Carrito() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Simular carga de productos desde algún servicio o localStorage
    const fetchedProducts = [
      { id: 1, name: 'Product 1', description: 'Description 1', price: 10, type:"Playstation 3" },
      { id: 2, name: 'Product 2', description: 'Description 2', price: 20, type:"Playstation 4" },
      { id: 3, name: 'Product 3', description: 'Description 3', price: 30, type:"Playstation 5" },
    ];
    setProducts(fetchedProducts);
  }, []);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <div className="container">
      <h1 className="mt-4 mb-4">Catalogo de juegos</h1>

      <div className="row">
        <div className="col-md-8">
          <h2>Products</h2>
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4 mb-3" key={product.id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">Price: ${product.price}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-4">
          <h2>Cart</h2>
          <ul className="list-group">
            {cartItems.map((item, index) => (
              <li className="list-group-item" key={index}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Carrito;
