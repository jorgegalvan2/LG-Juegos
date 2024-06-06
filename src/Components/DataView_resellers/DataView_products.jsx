import React, { useState, useEffect } from 'react';
import ProductService from './../../services/ProductService.jsx';
import Logo from '../Logo.jsx';

const DataView_products = () => {
  const [sortOption, setSortOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(ProductService);
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOption === 'priceLowHigh') {
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
          <div className="col-md-4 mb-4">
            <select className="form-select" onChange={(e) => setSortOption(e.target.value)}>
              <option value="">Ordenar por</option>
              <option value="priceLowHigh">Precio: Menor a Mayor</option>
              <option value="priceHighLow">Precio: Mayor a Menor</option>
            </select>
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar producto"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <table className="table table-striped align-middle text-center">
          <thead>
            <tr>
              <th></th>
              <th>Título</th>
              <th>Categoría</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product) => (
              <tr key={product.id}>
                <td><img src={product.image} alt={product.title} className="imgStyleReseller me-3" style={{ width: '50px' }} /></td>
                <td>{product.title}</td>
                <td>{product.category}</td>
                <td>${product.precioReventa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataView_products;

