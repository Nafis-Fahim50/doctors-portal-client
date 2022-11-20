import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Loading from '../../Shared/Loading/Loading';

const Cheakout = ({booking}) => {
    const [cardError, setCardError] = useState('');
    const [success,setSuccess] = useState('');
    const [transationId,setTransationId] = useState('');
    const [processing, setProcessing] = useState(false);
    const {price,Patient,email,_id } = booking;
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem('accessToken')}`
        
    },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

    const handleSubmit = async (event) =>{
        event.preventDefault();

        if (!stripe || !elements) {
          return;
        }

        const card = elements.getElement(CardElement);

        if(card === null){
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        
        if(error){
            console.log(error);
            setCardError(error.message);
            toast.error(error.message)
        }
        else{
            setCardError('')
        }
        setSuccess('')
        setProcessing(true);
        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: Patient,
                  email: email
                },
              },
            },
          );
        
          if(confirmError){
            setCardError(confirmError.message)
            toast.error(confirmError.message)
            return;
          }

          if(paymentIntent.status === 'succeeded'){
            const payment = {
                price,
                transationId: paymentIntent.id,
                email,
                bookingId: _id
            }
            fetch('http://localhost:5000/payments',{
                method:'POST',
                headers:{
                    'content-type':'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment) 
            })
            .then(res => res.json())
            .then(data => {
                if(data.insertedId){
                    setSuccess('Congrats! Your payment is complement')
                    setTransationId(paymentIntent.id)
                    toast.success('Successfully paid')
                }
            })
          }
          setProcessing(false)
    }
    if(processing){
        <Loading></Loading>
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-sm btn-success mt-4' 
                type="submit" 
                disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            <p className='mt-2 text-red-500'>{cardError}</p>
            {
                success && <div>
                    <p className='text-orange-500 font-bold'>{success}</p>
                    <p>Your transationId: <span className='text-green-500 font-semibold'>{transationId}</span></p>
                </div>
            }
        </div>
    );
};
 
export default Cheakout;