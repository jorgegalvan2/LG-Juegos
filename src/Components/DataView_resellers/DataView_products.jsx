import React, { useState, useEffect } from 'react';
import ProductService from './../../services/ProductService.jsx';
import Logo from '../Logo.jsx';

const DataView_products = () => {
  const [sortOption, setSortOption] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(ProductService);
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === 'dateAsc') {
      return new Date(a.date) - new Date(b.date);
    } else if (sortOption === 'dateDesc') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortOption === 'priceLowHigh') {
      return a.precioReventa - b.precioReventa;
    } else if (sortOption === 'priceHighLow') {
      return b.precioReventa - a.precioReventa;
    }
    return 0;
  });

  return (
<>


    <div className="container">
    
      <div className="row mb-3">
        <div className="col-md-4">
          <select className="form-select" onChange={(e) => setSortOption(e.target.value)}>
            <option value="">Ordenar por</option>
            <option value="dateAsc">Fecha: Antiguo a Nuevo</option>
            <option value="dateDesc">Fecha: Nuevo a Antiguo</option>
            <option value="priceLowHigh">Precio: Menor a Mayor</option>
            <option value="priceHighLow">Precio: Mayor a Menor</option>
          </select>
        </div>
      </div>
      <ul className="list-group list-group-flush">
        {sortedProducts.map((product) => (
          <li className="list-group-item listResellerStyles" key={product.id}>
            <div className="d-flex align-items-center">
              <img src={product.image} alt={product.title} className="imgStyleReseller me-3"  />
              <div>
                <p >{product.title} - Categoría: {product.category} - Precio: ${product.precioReventa} </p>

              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default DataView_products;