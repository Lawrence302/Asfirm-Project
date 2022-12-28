import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import './styles/PricingPage.css';

// function Pricing() {
//   return (
//     <div>
//       <NavBar />
//       <h1>Pricing page</h1>
//       <Footer />
//     </div>
//   );
// }

// export default Pricing;

const PricingPage = () => {
  return (
    <div className="pricing-page">
      <NavBar />
      <h1>Choose Your Subscription Plan</h1>

      <h2 className="title">Investor Subscriptions</h2>
      <div class="pricing-section">
        <div class="offer">
          <h2>Standard</h2>
          <div class="offer-price">$20</div>
          <div class="offer-details">
            <p>Includes access to one category</p>
            <button>Sign Up</button>
          </div>
        </div>
        <div class="offer">
          <h2>Premium</h2>
          <div class="offer-price">$50</div>
          <div class="offer-details">
            <p>Includes access to all categories</p>
            <button>Sign Up</button>
          </div>
        </div>
      </div>

      <h2 className="title">Proprietor Subscriptions</h2>
      <div class="pricing-section">
        <div class="offer">
          <h2>Standard</h2>
          <div class="offer-price">$20</div>
          <div class="offer-details">
            <p>Includes access to one category</p>
            <button>Sign Up</button>
          </div>
        </div>
        <div class="offer">
          <h2>Premium</h2>
          <div class="offer-price">$50</div>
          <div class="offer-details">
            <p>Includes access to all categories</p>
            <button>Sign Up</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PricingPage;
