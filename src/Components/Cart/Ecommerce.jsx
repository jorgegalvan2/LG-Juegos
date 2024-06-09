import { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import ProductService from './../../services/ProductService.jsx';
import * as NotifyHelper from '../../helpers/notify.js';
import { ToastContainer } from '../../helpers/notify.js';
import { Dialog } from 'primereact/dialog';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Logo.jsx';

function Ecommerce({ item }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category'); // Predeterminado a PS4
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(); // Predeterminado a PS4
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortOrder, setSortOrder] = useState(''); // Estado para el orden de precios
  const [showOfferOptions, setShowOfferOptions] = useState(false); // Estado para mostrar opciones de ofertas

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, searchTerm, sortOrder]); // Añade sortOrder al useEffect

  useEffect(() => {
      setProducts(ProductService);
      setFilteredProducts(ProductService.filter(product => product.category === 'PS4'));
      const categoriesData = [...new Set(ProductService.map(product => product.category))];
      setCategories(categoriesData);

  }, [ProductService, initialCategory]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [location, initialCategory]);

  const filterProducts = () => {
    let filtered = products;

    if (selectedCategory) {
      if (selectedCategory.endsWith(' - Ofertas')) {
        const category = selectedCategory.replace(' - Ofertas', '');
        filtered = products.filter(product => product.category === category && product.offerPrice);
      } else {
        filtered = products.filter(product => product.category === selectedCategory);
      }
    }

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder) {
      filtered.sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);
    }

    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSidebarVisible(false);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
    setSidebarVisible(false);
  };

  const openSidebar = () => {
    setSidebarVisible(true);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  const toggleOfferOptions = () => {
    setShowOfferOptions(!showOfferOptions);
  };

  return (
    <>
      {queryParams.size !== 0 && <Logo />}

      <div className="container-fluid mt-5 pt-5">
        <div className="row justify-content-center">
          <div className="row justify-content-center align-items-center mb-3">
            <div className="col-12 text-center mb-4 mt-2">
              <Button label="Filtros" icon="pi pi-filter" className="p-button-raised p-button-secondary" onClick={openSidebar} />
            </div>
            <div className="col-12 col-lg-8 text-center">
              <InputText placeholder="Buscar producto" value={searchTerm} onChange={handleSearch} />
            </div>
          </div>
          <div className='col-2 categorysWeb'>
            <div className="">
              <h2>Categorías</h2>
              <ul className="list-group list-group-flush no-bullets">
                {categories.map(category => (
                  <li key={category}>
                    <div
                      className={`list-group-item ${selectedCategory === category && 'active'}`}
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category}
                    </div>
                  </li>
                ))}
                <li>
                  <div className={`list-group-item ${showOfferOptions && 'active'}`} onClick={toggleOfferOptions}>
                    Ofertas
                  </div>
                  {showOfferOptions && (
                    <ul className="list-group list-group-flush">
                      {categories.map(category => (
                        <li key={category}>
                          <div
                            className={`list-group-item ${selectedCategory === `${category} - Ofertas` && 'active'}`}
                            onClick={() => handleCategoryChange(`${category} - Ofertas`)}
                          >
                            {category} - Ofertas
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              </ul>
            </div>
            <div className="mt-4">
              <h2>Ordenar por Precio</h2>
              <ul className="list-group">
                <li className={`list-group-item ${sortOrder === 'asc' && 'active'}`} onClick={() => handleSortOrderChange('asc')}>Precio: Menor a Mayor</li>
                <li className={`list-group-item ${sortOrder === 'desc' && 'active'}`} onClick={() => handleSortOrderChange('desc')}>Precio: Mayor a Menor</li>
              </ul>
            </div>
          </div>
          <div className='col-12 col-lg-8'>
            <div className="row justify-content-center ">
              <h3 className='text-center mb-4 mt-2'>{selectedCategory}</h3>
              {filteredProducts.map(product => (
                <Link to={`/producto/${product.id}`} className='col-5 col-lg-2 mb-3 rounded-start-2 p-0 mx-2 rounded-3 decorationLinks' key={product.id}>
                  <div key={product.id} style={{ cursor: 'pointer' }}>
                    <div className="card border-0 h-100">
                      <div className='position-relative'>
                        <div className="position-absolute bottom-0 start-0 badgeStyle p-1 ms-2 mb-1"><span className=''>{product.category}</span></div>
                        <img src={product.image} className="img-fluid rounded-2 stylesCardOffers" alt={product.title} />
                      </div>
                      <div className="card-body p-0 mt-1">
                        <div className='text-start'>
                          <span className='genderStyle'>{product.gender}</span>
                        </div>
                        {product.offerPrice ? (
                          <div className='row text-start'>
                            <div className='col-12'>
                              <p className="d-inline-block me-1 mb-0 oldPriceNotOffer">${product.price}</p>
                              <p className="d-inline-block ms-1 mb-0"><strong>${product.offerPrice}</strong></p>
                              <span className='d-block'>3 o 6 cuotas sin interés</span>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="card-text text-start mb-0">${product.price}</p>
                            <span className='d-block cuoteStyle'>3 o 6 cuotas sin interés</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Sidebar visible={sidebarVisible} onHide={closeSidebar}>
          <div className="">
            <h2>Categorías</h2>
            <ul className="list-group">
              {categories.map(category => (
                <li key={category}>
                  <div
                    className={`list-group-item ${selectedCategory === category && 'active'}`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </div>
                </li>
              ))}
              <li>
                <div className={`list-group-item ${showOfferOptions && 'active'}`} onClick={toggleOfferOptions}>
                  Ofertas
                </div>
                {showOfferOptions && (
                  <ul className="list-group list-group-flush">
                    {categories.map(category => (
                      <li key={category}>
                        <div
                          className={`list-group-item ${selectedCategory === `${category} - Ofertas` && 'active'}`}
                          onClick={() => handleCategoryChange(`${category} - Ofertas`)}
                        >
                          {category} - Ofertas
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          </div>
          <div className="mt-4">
            <h2>Ordenar por Precio</h2>
            <ul className="list-group">
              <li className={`list-group-item ${sortOrder === 'asc' && 'active'}`} onClick={() => handleSortOrderChange('asc')}>Precio: Menor a Mayor</li>
              <li className={`list-group-item ${sortOrder === 'desc' && 'active'}`} onClick={() => handleSortOrderChange('desc')}>Precio: Mayor a Menor</li>
            </ul>
          </div>
        </Sidebar>
      </div>
    </>
  );
}

export default Ecommerce;
