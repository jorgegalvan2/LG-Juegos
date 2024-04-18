import { ToastContainer, toast } from 'react-toastify';
const TOASTID = "LOADER_ID"

const notifyA = (message) => {

  toast.loading(message, {
      position:           "bottom-center",
      toastId:            TOASTID, 
      autoClose:          false, 
      hideProgressBar:    true,
      pauseOnFocusLoss:   false,
      limit: 1 
  })
};

const updateToast = () => 

  toast.update(
      TOASTID, { 
      render:             "Listo!", 
      type:               toast.TYPE.SUCCESS, 
      autoClose:          1000, 
      isLoading:          false,
      pauseOnFocusLoss:   false,
      hideProgressBar:    true,
      limit:              1,
      className:          'rotateY animated'
      }
  );


  const notifySuccess = (message) => {
    toast.success(message, {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: true,
      pauseOnFocusLoss: false,
      limit: 1,
      className: 'rotateY animated'
    });
  }
   
  

  export {
    notifyA,
    updateToast,
    notifySuccess,
    ToastContainer
  }