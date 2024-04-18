import LogoLG from './../assets/img/logo-lg.png'
import imgd from  './../assets/img/messi.png'

const Logo = () => {

  return( 

    <div className="main-container row m-0 p-0">
      <div className="main-logo-container text-center col-10 col-sm-6 col-lg-4 m-0 p-0 rounded-2 mb-5">
        <h1 className="visually-hidden">LG Juegos Digitales</h1>
        
        <img className="img-fluid navbar-transition" src={LogoLG} alt=" " />
        
      </div>

      
      <div className="background-image">

        <img src={imgd} alt="" className=' img-fluid' />
              
      </div>


    </div>

)
}

export default Logo