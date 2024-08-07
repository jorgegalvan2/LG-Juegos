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

    const ordenarPorFechaReciente = (a, b) => {
      const fechaA = new Date(a.Date);
      const fechaB = new Date(b.Date);
      return fechaB - fechaA; // Para ordenar de la más reciente a la más antigua
    };

    const productosOrdenados = ProductService.sort(ordenarPorFechaReciente);

      setProducts(productosOrdenados);
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
      filtered.sort((a, b) => {
        // Obtener el precio que se utilizará para la comparación
        const priceA = a.offerPrice > 0 ? a.offerPrice : a.price;
        const priceB = b.offerPrice > 0 ? b.offerPrice : b.price;
    
        // Realizar la comparación según el orden
        if (sortOrder === 'asc') {
          return priceA - priceB;
        } else {
          return priceB - priceA;
        }
      });
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
      {queryParams.category !== 'PS3' || queryParams.category !== 'PS4' || queryParams.category !== 'PS5' && <Logo />}

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
                  <li className='cursorPointer' key={category}>
                    <div
                      className={`list-group-item ${selectedCategory === category && 'active'} `}
                      onClick={() => handleCategoryChange(category)}
                      id={category}
                    >
                      {category}
                    </div>
                  </li>
                ))}
                <li>
                  <div className={`list-group-item cursorPointer ${showOfferOptions && 'active'}`} onClick={toggleOfferOptions}>
                    Ofertas
                  </div>
                  {showOfferOptions && (
                    <ul className="list-group list-group-flush no-bullets">
                      {categories.map(category => (
                        <li className='cursorPointer' key={category}>
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
            <div className="row justify-content-center">
              <h3 className='text-center mb-4 mt-2'>{selectedCategory}</h3>
              {filteredProducts.map(product => (
                <Link to={`/producto/${product.id}`} className='col-5 col-lg-3 col-xxl-2 mb-3 rounded-start-2 p-0 mx-2 rounded-3 decorationLinks' key={product.id}>
                  <div key={product.id} style={{ cursor: 'pointer' }}>
                    <div className="card border-0 h-100 ">
                      <div className='position-relative sizeImgs'>
                        <div className="position-absolute bottom-0 start-0 badgeStyle p-1 ms-2 mb-1"><span className=''>{product.category}</span></div>
                        <img src={product.image} className="img-fluid rounded-2 stylesCardOffers sizeImgs2 m-auto" alt={product.title} />
                      </div>
                      <div className="card-body p-0 mt-1">
                        <div className='text-start'>
                          <span className='genderStyle'>{product.gender}</span>
                        </div>
                        {product.offerPrice != 0 ? (
                          <div className='row text-start'>
                            <div className='col-12 text-start'>
                              <p className="d-inline-block me-1 mb-0 oldPriceNotOffer ">${product.price}</p>
                              <p className="d-inline-block ms-1 mb-0 "><strong>${product.offerPrice}</strong></p>
                              <span className='d-block cuoteStyle'>Cuota simple  3x ${Math.round(product.offerPrice * 1.20 / 3)}</span>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="card-text text-start mb-0">${product.price}</p>
                            <span className='d-block  text-start cuoteStyle'>Cuota simple  3x ${Math.round(product.price * 1.20 / 3)}</span>
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
          <div className="">
              <h2>Categorías</h2>
              <ul className="list-group list-group-flush no-bullets">
                {categories.map(category => (
                  <li className='cursorPointer' key={category}>
                    <div
                      className={`list-group-item ${selectedCategory === category && 'active'} cursorPointer`}
                      onClick={() => handleCategoryChange(category)}
                      id={category}
                    >
                      {category}
                    </div>
                  </li>
                ))}
                <li>
                  <div className={`list-group-item cursorPointer ${showOfferOptions && 'active'}`} onClick={toggleOfferOptions}>
                    Ofertas
                  </div>
                  {showOfferOptions && (
                    <ul className="list-group list-group-flush no-bullets">
                      {categories.map(category => (
                        <li className='cursorPointer' key={category}>
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
                <li className={`list-group-item cursorPointer ${sortOrder === 'asc' && 'active'}`} onClick={() => handleSortOrderChange('asc')}>Precio: Menor a Mayor</li>
                <li className={`list-group-item cursorPointer ${sortOrder === 'desc' && 'active'}`} onClick={() => handleSortOrderChange('desc')}>Precio: Mayor a Menor</li>
              </ul>
            </div>
          </div>
        </Sidebar>
      </div>
    </>
  );
}

export default Ecommerce;
