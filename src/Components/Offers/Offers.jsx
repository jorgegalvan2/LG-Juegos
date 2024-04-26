import { Carousel } from 'primereact/carousel';

import ProductsService from './../../services/ProductService.jsx'
import ProductDetailsDialog from '../Cart/ProductDetailsDialog.jsx';
import * as NotifyHelper from '../../helpers/notify.js'
import { useEffect, useState } from 'react';


function Offers({item}) {
  const [products,setProducts] = useState()
  const [selectedProduct, setSelectedProduct] = useState(null);


  const responsiveOptions = [
    {
        breakpoint: '1400px',
        numVisible: 8,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 2,
        numScroll: 1
    }
];
  useEffect(() => {
    setProducts(ProductsService)
  })


  const productTemplate = (product) => {
    return (
      <div className="d-flex flex-column align-center m-3 stylesCardOffers "  onClick={() => showProductDetails(product)}>

        <div className="">
            <img src={product.image} alt={product.name} className="img-fluid  rounded-3"/>
        </div>


    </div>

  
  
    );
};

const showProductDetails = (product) => {
  setSelectedProduct(product);
};

const hideProductDetails = () => {
  setSelectedProduct(null);
};

const addToCart = () => {
  const cartItem = {
    id: selectedProduct.id, // Otra propiedad única para identificar el selectedProducto
    name: selectedProduct.name,
    price: selectedProduct.secondaryPrice ? selectedProduct.secondaryPrice : selectedProduct.price,
    image: selectedProduct.image,
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

    <div className="">
      <h2 className='my-5'>Juegos en oferta</h2>
      <Carousel 
        value={products} 
        numScroll={1} 
        numVisible={3} 
        showNavigators={false}
        responsiveOptions={responsiveOptions} 
        itemTemplate={productTemplate} 
        circular={true}
        autoplayInterval={1200}
        />

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

export default Offers;
