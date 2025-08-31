import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Check, Crown, Star, Truck, Shield, Calendar, Gift, Zap, Sparkles } from 'lucide-react';
import { membershipApi, MembershipPlan, CreateSubscriptionRequest } from '../services/api';

const MembershipSignupPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  // Payment form state
  const [paymentMethod, setPaymentMethod] = useState<{
    id: string;
    type: 'CREDIT_CARD' | 'PAYPAL' | 'APPLE_PAY' | 'GOOGLE_PAY';
    displayName: string;
  }>({
    id: 'card_demo_123',
    type: 'CREDIT_CARD',
    displayName: 'Credit Card'
  });
  const [cardNumber, setCardNumber] = useState('4111 1111 1111 1111');
  const [expiryDate, setExpiryDate] = useState('12/28');
  const [cvv, setCvv] = useState('123');
  const [cardName, setCardName] = useState(user?.name || 'Demo User');

  const paymentMethods = [
    { id: 'card_demo_123', type: 'CREDIT_CARD' as const, displayName: 'Credit Card' },
    { id: 'paypal_demo_456', type: 'PAYPAL' as const, displayName: 'PayPal' },
    { id: 'apple_pay_789', type: 'APPLE_PAY' as const, displayName: 'Apple Pay' },
    { id: 'google_pay_012', type: 'GOOGLE_PAY' as const, displayName: 'Google Pay' }
  ];

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const fetchedPlans = await membershipApi.getPlans();
      // Filter to only show paid plans (not the free trial plan)
      const paidPlans = fetchedPlans.filter(plan => plan.planType !== 'TRIAL');
      setPlans(paidPlans);
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
      navigate('/');
      
    } catch (error: any) {
      console.error('Failed to create subscription:', error);
      alert(`Failed to create subscription: ${error.message}`);
    } finally {
      setSubscribing(false);
    }
  };

  const getAnnualSavings = (monthlyPlan: MembershipPlan, annualPlan: MembershipPlan) => {
    const monthlyYearlyTotal = monthlyPlan.price * 12;
    const savings = monthlyYearlyTotal - annualPlan.price;
    const percentSavings = Math.round((savings / monthlyYearlyTotal) * 100);
    return { savings, percentSavings };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading Shopster+ plans...</p>
        </div>
      </div>
    );
  }

  const monthlyPlan = plans.find(plan => plan.planType === 'STANDARD');
  const annualPlan = plans.find(plan => plan.planType === 'PREMIUM');
  const savings = monthlyPlan && annualPlan ? getAnnualSavings(monthlyPlan, annualPlan) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-gray-900">Shopster</Link>
              <div className="ml-3 flex items-center">
                <Crown className="w-6 h-6 text-purple-600" />
                <span className="ml-1 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Plus
                </span>
              </div>
            </div>
            <nav className="flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
              {isAuthenticated ? (
                <span className="text-sm text-gray-700">Hello, {user?.name}</span>
              ) : (
                <Link to="/login" className="text-purple-600 hover:text-purple-700 font-medium">Login</Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Payment Form Modal */}
      {showPaymentForm && selectedPlan && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Subscribe to {selectedPlan.name}</h3>
                <button 
                  onClick={() => setShowPaymentForm(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-xl mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{selectedPlan.name}</h4>
                    <p className="text-sm text-gray-600">{selectedPlan.trialDescription}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{selectedPlan.formattedPrice}</div>
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  {subscribing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                      Starting Your Trial...
                    </div>
                  ) : (
                    `Start ${selectedPlan.trialDescription}`
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Crown className="w-16 h-16 text-purple-600" />
            <Sparkles className="w-8 h-8 text-blue-500 ml-2 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Shopster+
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4 leading-relaxed">
            Unlock exclusive benefits and premium shopping experience
          </p>
          <p className="text-lg text-gray-500 mb-8">
            Start with a <span className="font-semibold text-purple-600">7-day free trial</span>, then choose your plan
          </p>
          <div className="flex justify-center items-center space-x-8 text-gray-600">
            <div className="flex items-center">
              <Truck className="w-8 h-8 mr-2 text-purple-500" />
              <span className="font-medium">Free Shipping</span>
            </div>
            <div className="flex items-center">
              <Shield className="w-8 h-8 mr-2 text-blue-500" />
              <span className="font-medium">Priority Support</span>
            </div>
            <div className="flex items-center">
              <Zap className="w-8 h-8 mr-2 text-purple-500" />
              <span className="font-medium">Early Access</span>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-lg text-gray-600">All plans include a 7-day free trial</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Monthly Plan */}
            {monthlyPlan && (
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transform hover:scale-105 transition-all duration-300">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <Star className="w-8 h-8 text-blue-500 mr-3" />
                      <h3 className="text-2xl font-bold text-gray-900">Monthly</h3>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-5xl font-bold text-gray-900">${monthlyPlan.price}</span>
                      <span className="text-xl text-gray-500 ml-2">/month</span>
                    </div>
                    <p className="text-blue-600 font-semibold mt-2">{monthlyPlan.trialDescription}</p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {monthlyPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSelectPlan(monthlyPlan)}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    Start Free Trial
                  </button>
                </div>
              </div>
            )}

            {/* Annual Plan */}
            {annualPlan && (
              <div className="bg-white rounded-3xl shadow-2xl border-2 border-purple-200 overflow-hidden transform hover:scale-105 transition-all duration-300 relative">
                {/* Best Value Badge */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    🏆 Best Value
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-1">
                  <div className="bg-white rounded-3xl p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <Crown className="w-8 h-8 text-purple-600 mr-3" />
                        <h3 className="text-2xl font-bold text-gray-900">Annual</h3>
                      </div>
                      {savings && (
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          Save {savings.percentSavings}%
                        </div>
                      )}
                    </div>

                    <div className="mb-6">
                      <div className="flex items-baseline">
                        <span className="text-5xl font-bold text-gray-900">${annualPlan.price}</span>
                        <span className="text-xl text-gray-500 ml-2">/year</span>
                      </div>
                      {savings && (
                        <p className="text-sm text-gray-500 mt-1">
                          That's just <span className="font-semibold text-purple-600">
                            ${(annualPlan.price / 12).toFixed(2)}/month
                          </span>
                        </p>
                      )}
                      <p className="text-purple-600 font-semibold mt-2">{annualPlan.trialDescription}</p>
                      {savings && (
                        <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-green-700 font-medium text-sm">
                            💰 You save <span className="font-bold">${savings.savings.toFixed(2)}</span> compared to monthly billing
                          </p>
                        </div>
                      )}
                    </div>

                    <ul className="space-y-4 mb-8">
                      {annualPlan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleSelectPlan(annualPlan)}
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-xl"
                    >
                      Start Free Trial
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 max-w-2xl mx-auto">
              Questions about Shopster+? 
              <Link to="/contact" className="text-purple-600 hover:text-purple-700 ml-1 font-medium">
                Contact our team
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MembershipSignupPage;