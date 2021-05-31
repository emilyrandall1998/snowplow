import React, { useState } from 'react';
import './App.css';
import Products from './Products';
import Cart from './Cart';
import { newTracker, enableActivityTracking, trackPageView } from "@snowplow/browser-tracker";

newTracker('sp', '{{http://localhost:3000/snowplow}}', {
  appId: 'snowplow',
});

enableActivityTracking({
minimumVisitLength: 30,
heartbeatDelay: 10
});

const PAGE_PRODUCTS = 'products';
const PAGE_CART = 'cart';

function App() {
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState(PAGE_PRODUCTS);

  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

  const getCartTotal = () => {
    return cart.reduce(
      (sum, { quantity }) => sum + quantity,
      0
    );
  };

  trackPageView();

  return (
    <div className="App">
      <header>
        <button onClick={() => navigateTo(PAGE_CART)}>
          Go to Cart ({getCartTotal()})
        </button>

        <button onClick={() => navigateTo(PAGE_PRODUCTS)}>
          View Products
        </button>
      </header>
      {page === PAGE_PRODUCTS && (
        <Products cart={cart} setCart={setCart} />
      )}
      {page === PAGE_CART && (
        <Cart cart={cart} setCart={setCart} />
      )}
    </div>
  );
}

export default App;
