import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Check, Star, Crown, Shield, Truck, Calendar, Gift } from 'lucide-react';
import { membershipApi, MembershipPlan, CreateSubscriptionRequest } from '../services/api';


interface PaymentMethod {
  id: string;
  type: 'CREDIT_CARD' | 'DEBIT_CARD' | 'PAYPAL' | 'APPLE_PAY' | 'GOOGLE_PAY';
  displayName: string;
}

const ShopsterPlusPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  
  // Payment form state
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    id: 'card_demo_123',
    type: 'CREDIT_CARD',
    displayName: 'Credit Card'
  });
  const [cardNumber, setCardNumber] = useState('4111 1111 1111 1111');
  const [expiryDate, setExpiryDate] = useState('12/28');
  const [cvv, setCvv] = useState('123');
  const [cardName, setCardName] = useState(user?.name || 'Demo User');

  const paymentMethods: PaymentMethod[] = [
    { id: 'card_demo_123', type: 'CREDIT_CARD', displayName: 'Credit Card' },
    { id: 'paypal_demo_456', type: 'PAYPAL', displayName: 'PayPal' },
    { id: 'apple_pay_789', type: 'APPLE_PAY', displayName: 'Apple Pay' },
    { id: 'google_pay_012', type: 'GOOGLE_PAY', displayName: 'Google Pay' }
  ];

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const fetchedPlans = await membershipApi.getPlans();
      setPlans(fetchedPlans);
    } catch (error) {
      console.error('Failed to fetch plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPlan = (plan: MembershipPlan) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    setSelectedPlan(plan);
    setShowPaymentForm(true);
  };

  const handleSubscribe = async () => {
    if (!selectedPlan || !user) return;

    try {
      setSubscribing(true);
      
      const subscriptionRequest: CreateSubscriptionRequest = {
        userId: parseInt(user.id),
        planCode: selectedPlan.planCode,
        paymentMethodId: paymentMethod.id,
        paymentMethodType: paymentMethod.type,
        autoRenew: true
      };

      await membershipApi.createSubscription(subscriptionRequest);
      
      alert(`🎉 Welcome to Shopster+! Your ${selectedPlan.trialDescription} starts now!`);
      setShowPaymentForm(false);
      
    } catch (error: any) {
      console.error('Failed to create subscription:', error);
      alert(`Failed to create subscription: ${error.message}`);
    } finally {
      setSubscribing(false);
    }
  };

  const getPlanIcon = (planType: string) => {
    switch (planType) {
      case 'PREMIUM':
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 'STANDARD':
        return <Star className="w-6 h-6 text-blue-500" />;
      default:
        return <Gift className="w-6 h-6 text-green-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading Shopster+ plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-gray-900">Shopster</Link>
              <span className="ml-2 text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">PLUS</span>
            </div>
            <nav className="flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
              {isAuthenticated ? (
                <span className="text-sm text-gray-700">Hello, {user?.name}</span>
              ) : (
                <Link to="/login" className="text-blue-600 hover:text-blue-800">Login</Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to Shopster+
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-blue-100">
              Unlock exclusive benefits and premium shopping experience
            </p>
            <div className="flex justify-center items-center space-x-8 mt-8">
              <div className="flex items-center">
                <Truck className="w-8 h-8 mr-2" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-8 h-8 mr-2" />
                <span>Priority Support</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-8 h-8 mr-2" />
                <span>Early Access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Form Modal */}
      {showPaymentForm && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Subscribe to {selectedPlan.name}</h3>
                <button 
                  onClick={() => setShowPaymentForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{selectedPlan.name}</h4>
                    <p className="text-sm text-gray-600">{selectedPlan.trialDescription}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{selectedPlan.formattedPrice}</div>
                    <div className="text-sm text-gray-600">{selectedPlan.billingCycleDisplay}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method
                  </label>
                  <select 
                    value={paymentMethod.id}
                    onChange={(e) => {
                      const method = paymentMethods.find(m => m.id === e.target.value);
                      if (method) setPaymentMethod(method);
                    }}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    {paymentMethods.map(method => (
                      <option key={method.id} value={method.id}>
                        {method.displayName}
                      </option>
                    ))}
                  </select>
                </div>

                {paymentMethod.type === 'CREDIT_CARD' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="4111 1111 1111 1111"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          placeholder="123"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="John Doe"
                      />
                    </div>
                  </>
                )}

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Trial Period:</strong> Your {selectedPlan.trialDescription} starts immediately. 
                    You won't be charged until the trial ends. Cancel anytime during the trial.
                  </p>
                </div>

                <button
                  onClick={handleSubscribe}
                  disabled={subscribing}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-3 px-4 rounded-md transition-colors"
                >
                  {subscribing ? 'Starting Your Trial...' : `Start ${selectedPlan.trialDescription}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Plans Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Shopster+ Plan</h2>
            <p className="text-lg text-gray-600">All plans include a 7-day free trial</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map(plan => (
              <div 
                key={plan.id}
                className={`bg-white rounded-lg shadow-lg p-8 relative ${
                  plan.planType === 'PREMIUM' ? 'border-2 border-yellow-400' : 'border border-gray-200'
                }`}
              >
                {plan.planType === 'PREMIUM' && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {getPlanIcon(plan.planType)}
                    <h3 className="text-xl font-bold ml-2">{plan.name}</h3>
                  </div>
                  {plan.planType === 'PREMIUM' && (
                    <div className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                      Save 20%
                    </div>
                  )}
                </div>

                <p className="text-gray-600 mb-6">{plan.description}</p>

                <div className="mb-6">
                  <div className="text-3xl font-bold text-gray-900">
                    {plan.formattedPrice}
                    <span className="text-lg font-normal text-gray-600">
                      /{plan.billingCycle.toLowerCase()}
                    </span>
                  </div>
                  <div className="text-sm text-blue-600 font-medium">
                    {plan.trialDescription}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                    plan.planType === 'PREMIUM'
                      ? 'bg-yellow-400 hover:bg-yellow-500 text-black'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  Start Free Trial
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600">
              Questions about Shopster+? 
              <Link to="/contact" className="text-blue-600 hover:text-blue-800 ml-1">
                Contact our team
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopsterPlusPage;