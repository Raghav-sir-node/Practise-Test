import React from 'react';
import Home from './Home';
function Success() {
        return (
            <div className="success">
                <h1>Payment Successful!</h1>
                <p>Thank you for your purchase. Your payment has been processed successfully.</p>
                <div>
                    <Home />
                </div>
            </div>
        );
    }
    
    export default Success; 