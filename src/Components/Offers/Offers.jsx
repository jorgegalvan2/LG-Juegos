import { Carousel } from 'primereact/carousel';

import ProductsService from './../../services/ProductService.jsx'
import ProductDetailsDialog from '../../Pages/ProductDetails.jsx';
import * as NotifyHelper from '../../helpers/notify.js'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function Offers({item}) {
  const [products,setProducts] = useState()
  const [selectedProduct, setSelectedProduct] = useState(null);


  const responsiveOptions = [
    {
        breakpoint: '2000px',
        numVisible: 6,
        numScroll: 2
    },
    {
        breakpoint: '1199px',
        numVisible: 5,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 4,
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
        <Link to={`/producto/${product.id}`} className='' key={product.id}>
                <div className="">
                    <img src={product.image} alt={product.name} className="img-fluid  rounded-3"/>
                </div>
        </Link>

            </div>
            );
        };


  return (

    <div className="row justify-content-center">
      <h2 className='my-5 '>Juegos en oferta</h2>
      <div className='col-11 col-lg-8'>

      <Carousel 
        value={products} 
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
    </div>

    

  );
}

export default Offers;
