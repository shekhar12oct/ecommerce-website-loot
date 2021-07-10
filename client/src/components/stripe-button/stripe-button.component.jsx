import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'
import { response } from 'express';

const StripeCheckoutButton=({price})=>{
    const priceForStripe=price*100;
    const publishableKey='pk_test_b7a3hFL5nC3qlBCZ6bQACpez00gyMMP52H';
    console.log(publishableKey);

    const onToken=(token)=>{
        axios({
            url:'payment',
            method:'post',
            data:{
                amount:priceForStripe,
                token:token
            }
        }).then(response=>{
            alert("Payment Successful")
        }).catch(error=>{
            console.log('Payment Error',JSON.parse(error));
            alert('There was an issue with your payment.Pease sure use the provided credit cart')
        })
    }
    return (
        <StripeCheckout
         label="Pay Now"
         name="Dubey Clothing"
         billingAddress
         shippingAddress
         image="https://sendeyo.com/up/d/f3eb2117da"
         description={`Your total is $${price}`}
         amount={priceForStripe}
         panelLabel="Pay Now"
         token={onToken}
         stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;