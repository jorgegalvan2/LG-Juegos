import { Carousel } from 'primereact/carousel';
import ProductsService from './../../services/ProductService.jsx'
import ProductDetailsDialog from '../../Pages/ProductDetails.jsx';
import * as NotifyHelper from '../../helpers/notify.js'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Offers({ item }) {
  const [allProducts, setAllProducts] = useState([]);
  const [productsPs3, setProductsPs3] = useState([]);
  const [productsPs4, setProductsPs4] = useState([]);
  const [productsPs5, setProductsPs5] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setAllProducts(ProductsService);
    setProductsPs3(ProductsService.filter(product => product.category === 'PS3'));
    setProductsPs4(ProductsService.filter(product => product.category === 'PS4'));
    setProductsPs5(ProductsService.filter(product => product.category === 'PS5'));
  }, []);

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

  const productTemplate = (product) => {
    return (
      <div className="d-flex flex-column align-center m-3 stylesCardOffers" onClick={() => showProductDetails(product)}>
        <Link to={`/producto/${product.id}`} className='' key={product.id}>
          <div className="">
            <img src={product.image} alt={product.name} className="img-fluid  rounded-3" />
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div className="row justify-content-center mt-5">
      {productsPs3.length > 0 && (
        <div className='col-11 col-lg-8 mb-5'>
            <div className='row justify-content-center'>
              <h2 className='col-7 mb-0'>Ofertas PS3</h2>  
              <Link to="/ecommerce?category=PS3" className='col-5 m-auto'>Ver todos..</Link>
            </div>
          <Carousel
            value={productsPs3}
            showNavigators={false}
            responsiveOptions={responsiveOptions}
            itemTemplate={productTemplate}
            showIndicators={false}
            circular={true}
            autoplayInterval={1200}
          />
          
        </div>
      )}
      <div className='col-11 col-lg-8 mb-5'>
        <div className='row justify-content-center'>
          <h2 className='col-7 mb-0'>Ofertas PS4</h2>  
          <Link to="/ecommerce?category=PS4" className='col-5 m-auto'>Ver todos..</Link>
        </div>
        <Carousel
          value={productsPs4}
          showNavigators={false}
          responsiveOptions={responsiveOptions}
          itemTemplate={productTemplate}
          showIndicators={false}
          circular={true}
          autoplayInterval={1200}
        />
      </div>
      <div className='col-11 col-lg-8'>
        <div className='row justify-content-center'>
          <h2 className='col-7 mb-0'>Ofertas PS5</h2>  
          <Link to="/ecommerce?category=PS5" className='col-5 m-auto'>Ver todos..</Link>
        </div>
        <Carousel
          value={productsPs5}
          showNavigators={false}
          responsiveOptions={responsiveOptions}
          itemTemplate={productTemplate}
          showIndicators={false}
          circular={true}
          autoplayInterval={1200}
        />
      </div>
    </div>
  );
}

export default Offers;
