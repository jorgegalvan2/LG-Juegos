import { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import ProductService from './../../services/ProductService.jsx';
import ProductDetailsDialog from './ProductDetailsDialog.jsx';


import * as NotifyHelper from '../../helpers/notify.js'
import { ToastContainer } from '../../helpers/notify.js';
import { Dialog } from 'primereact/dialog';

function Ecommerce({item}) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setProducts(ProductService);
    setFilteredProducts(ProductService);
    const categoriesData = [...new Set(ProductService.map(product => product.category))];
    setCategories(['Todos', ...categoriesData]);
    setSelectedCategory('Todos')
  }, []);

  useEffect(() => {
    filterProductsByCategory(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    filterProductsBySearchTerm(searchTerm);
  }, [searchTerm]);

  const filterProductsByCategory = (category) => {
    const filteredProducts = category === 'Todos' ? products : products.filter(product => product.category === category);
    setFilteredProducts(filteredProducts);
  };

  const filterProductsBySearchTerm = (term) => {
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSidebarVisible(false);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const openSidebar = () => {
    setSidebarVisible(true);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  const showProductDetails = (product) => {
    setSelectedProduct(product);
  };

  const hideProductDetails = () => {
    setSelectedProduct(null);
  };

  /*    "price": 19900,
    "offerPrice": 11500,
    "secondaryPrice": 9900,
    "offerSecondaryPrice": 8000,*/

  const addToCart = (levelGame) => {
    let priceDinamic
    if(levelGame == 'primary' && selectedProduct.offerPrice){
      priceDinamic = selectedProduct.offerPrice
    } else if (levelGame == 'primary' && !selectedProduct.offerPrice){
      priceDinamic = selectedProduct.price
    } else if (levelGame !== 'primary' && selectedProduct.offerSecondaryPrice){
      priceDinamic = selectedProduct.offerSecondaryPrice
    } else if (levelGame !== 'primary' && !selectedProduct.offerSecondaryPrice){
      priceDinamic = selectedProduct.secondaryPrice
    }

    const cartItem = {
      id: selectedProduct.id, // Otra propiedad única para identificar el selectedProducto
      name: selectedProduct.name,
      price: priceDinamic,
      image: selectedProduct.image,
      level: levelGame == 'primary' ? 'Primaria' : 'Secundaria',
      category: selectedProduct.category
    };
  
    // Obtener el carrito actual del localStorage o crear uno nuevo si no existe
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    currentCart.push(cartItem);
  
    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem('cart', JSON.stringify(currentCart));
    NotifyHelper.notifySuccess("Listo!")
    setSelectedProduct(null);
    item(cartItem)
  };
  

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12">
          <h2>Productos</h2>
          <div className="row justify-content-center align-items-center mb-3">
            <div className="col-12 text-center mb-4 mt-2">
              <Button label="Filtros" icon="pi pi-filter" className="p-button-raised p-button-secondary" onClick={openSidebar} />
            </div>
            <div className="col-12 col-lg-8">
              <InputText placeholder="Buscar producto" value={searchTerm} onChange={handleSearch} />
            </div>
          </div>
          <div className="row justify-content-center  ">
          {filteredProducts.map(product => (
            <div key={product.id} className="col-5 col-lg-2 mb-3 rounded-start-2 p-0 stylesCardOffers mx-2 rounded-3"  onClick={() => showProductDetails(product)} style={{ cursor: 'pointer',   }}>
              <div className="card border-0 h-100">
                <div className='position-relative'>
                  <div className="position-absolute bottom-0 start-0 badgeStyle p-1  ms-2 mb-1"><span className=''>{product.category}</span></div>
                  <img src={product.image} className="img-fluid" alt={product.name}  />                  
                </div>
                <div className="card-body">
                  {product.offerPrice ? (
                    <div  className='row justify-content-center'>
                      <div className='col-12'>
                        <p className="d-inline-block me-1 oldPriceNotOffer">${product.price}</p>
                        <p className="d-inline-block ms-1"><strong>${product.offerPrice}</strong></p>
                      </div>
                    </div>
                  ) : (
                    <p className="card-text">${product.price}</p>
                  )}
                </div>
              </div>
            </div>
          
          
          ))}
          </div>
        </div>
      </div>

      <Sidebar visible={sidebarVisible} onHide={closeSidebar}>
        <div className="">
          <h2>Categorías</h2>
          <ul className="list-group">
            {categories.map(category => (
              <li key={category} className={`list-group-item ${selectedCategory === category && 'active'}`} onClick={() => handleCategoryChange(category)}>{category}</li>
            ))}
          </ul>
        </div>
      </Sidebar>

      {selectedProduct && 
        <ProductDetailsDialog 
          product={selectedProduct} 
          onClose={hideProductDetails} 
          onAddToCart={addToCart} 
        />
      }


    </div>
  );
}

export default Ecommerce;

