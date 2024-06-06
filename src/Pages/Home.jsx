import Logo from './../Components/Logo.jsx'
import Ecommerce from "../Components/Cart/Ecommerce"
import Offers from "../Components/Offers/Offers"
import { ToastContainer, toast } from 'react-toastify';
import * as NotifyHelper from "../helpers/notify"




import { useState } from 'react';
import { redirect } from 'react-router';
import { Link } from 'react-router-dom';

function Home({addItem}){



  return (
    <>
    <Logo />

    <main className="container-fluid  mx-0">
      
      <section className="row justify-content-center text-center">
        <article className="col-12 navbar-transition">
          <Offers />
          
        </article>
        <div>
        
        </div>
        <article className="col-12">

          <Ecommerce />

        </article>



    </section>

    <ToastContainer
                    position="bottom-center"
                    autoClose={200}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
          
    </main>
    </>
  )
}

export default Home