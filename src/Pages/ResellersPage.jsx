import * as React from 'react';
import { useState, useEffect } from 'react';

import * as PaymentService from './../services/payment.services.js'
import DataView_products from '../Components/DataView_resellers/DataView_products.jsx';
import Logo from '../Components/Logo.jsx';


function ResellersPage() {


  return (
    <>
    
    <Logo />

    <main className='container-fluid marginNavBar'>
      
      <DataView_products />
    </main>
    </>

  );
}


export default ResellersPage