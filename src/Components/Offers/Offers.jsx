import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Offers() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  const offersData = [
    {
      id: 1,
      image_web: 'src/assets/img/Games/NBA2K23.jpeg',
      image_phone: 'src/assets/img/Games/NBA2K23-mobile.jpg',
      title: 'Nba 2k23',
      description: 'Descripción de la oferta 1',
      buttonText: 'Ver más'
    },
    {
      id: 2,
      image_web: 'src/assets/img/Games/FIFA-23.jpg',
      image_phone: 'src/assets/img/Games/FIFA-23-mobile.jpg',
      title: 'Fifa 23',
      description: 'Descripción de la oferta 2',
      buttonText: 'Ver más'
    },
    // Añade más ofertas según sea necesario
  ];

  return (

    <div className="offer-slider-container">
      <h2 className='my-5'>Juegos en oferta</h2>
      <Slider {...settings}>
        {offersData.map(offer => (
          <div key={offer.id} className="offer-slide">
            <div className="offer-content  rounded-0 p-4">
              <h2>{offer.title}</h2>
              <button className='btn BrandColor px-4'>Ver</button>
            </div>
            <picture>
              <source srcSet={`${offer.image_web}`} media="(min-width: 768px)" />
              <source srcSet={`${offer.image_phone}`} media="(min-width: 300px)" />
              <img src={offer.image} alt={offer.title} />
            </picture>
          </div>
        ))}
      </Slider>
    </div>

  );
}

export default Offers;
