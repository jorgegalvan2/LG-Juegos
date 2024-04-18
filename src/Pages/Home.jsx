
import Ecommerce from "../Components/Cart/Ecommerce"
import Offers from "../Components/Offers/Offers"
import { ToastContainer, toast } from 'react-toastify';
import * as NotifyHelper from "../helpers/notify"


function Home({addItem}){


  const item = (aa) => {
    addItem(aa)
  }
  return (
    <main className="container-fluid">

      <section className="row justify-content-center text-center">
        <article className="col-12 px-0 navbar-transition">
          <Offers selectedItem={item}/>
        </article>
        <article className="col-12 mt-4">

          <Ecommerce item={item}  />

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
  )
}

export default Home