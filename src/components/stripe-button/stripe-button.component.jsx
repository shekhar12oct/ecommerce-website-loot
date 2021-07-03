import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton=({price})=>{
    const priceForStripe=price*100;
    const publishableKey="pk_test_51J6bdhSHENQFuB4jYz9sGJ01u5R12MxBUZ3XvDYokR1LbuaUvSjTlY3z17pkbdHq0kvdYuZs6mj6lufrar635I6S00i6dcsoqd";

    const onToken=(token)=>{
        console.log(token);
        alert("Payment Successful");
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