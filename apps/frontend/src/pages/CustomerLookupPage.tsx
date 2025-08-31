import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Crown, Star, Calendar, CreditCard, AlertCircle, CheckCircle } from 'lucide-react';
import { membershipApi, MembershipSubscription } from '../services/api';

const CustomerLookupPage: React.FC = () => {
  const [customerId, setCustomerId] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState<MembershipSubscription | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const userId = parseInt(customerId.trim());
    if (!userId || userId <= 0) {
      setError('Please enter a valid customer ID number');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSearchPerformed(false);
      
      const activeSubscription = await membershipApi.getUserActiveSubscription(userId);
      setSubscription(activeSubscription);
      setSearchPerformed(true);
    } catch (err: any) {
      console.error('Search error:', err);
      setError(err.message || 'Failed to lookup customer subscription');
      setSubscription(null);
      setSearchPerformed(true);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'text-green-600 bg-green-100';
      case 'TRIALING':
        return 'text-blue-600 bg-blue-100';
      case 'CANCELLED':
        return 'text-red-600 bg-red-100';
      case 'EXPIRED':
        return 'text-gray-600 bg-gray-100';
      case 'SUSPENDED':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPlanIcon = (planType: string) => {
    switch (planType) {
      case 'PREMIUM':
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 'STANDARD':
        return <Star className="w-5 h-5 text-blue-500" />;
      default:
        return <User className="w-5 h-5 text-green-500" />;
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-gray-900">Shopster</Link>
              <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">ADMIN</span>
            </div>
            <nav className="flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
              <Link to="/shopster-plus" className="text-gray-700 hover:text-gray-900">Shopster+</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Membership Lookup</h1>
          <p className="text-gray-600">Enter a customer ID to view their Shopster+ subscription details</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="customerId" className="block text-sm font-medium text-gray-700 mb-2">
                Customer ID
              </label>
              <input
                type="number"
                id="customerId"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                placeholder="Enter customer ID number"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="1"
                required
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading || !customerId.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-md font-medium flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Search
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-700">{error}</span>
            </div>
          </div>
        )}

        {/* No Subscription Found */}
        {searchPerformed && !subscription && !error && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-6 text-center">
            <User className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-yellow-800 mb-2">No Active Subscription</h3>
            <p className="text-yellow-700">Customer ID {customerId} does not have an active Shopster+ subscription.</p>
          </div>
        )}

        {/* Subscription Details */}
        {subscription && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Subscription Details</h2>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(subscription.status)}`}>
                  {subscription.status}
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Basic Info */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Customer Information
                  </h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Customer ID</dt>
                      <dd className="text-sm text-gray-900">{subscription.userId}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Subscription ID</dt>
                      <dd className="text-sm text-gray-900">#{subscription.id}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Created</dt>
                      <dd className="text-sm text-gray-900">{formatDate(subscription.createdAt)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Auto Renew</dt>
                      <dd className="text-sm text-gray-900 flex items-center">
                        {subscription.autoRenew ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                            Enabled
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-4 h-4 text-red-500 mr-1" />
                            Disabled
                          </>
                        )}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Plan Info */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    {getPlanIcon(subscription.plan.planType)}
                    <span className="ml-2">Plan Details</span>
                  </h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Plan</dt>
                      <dd className="text-sm text-gray-900 font-medium">{subscription.plan.name}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Plan Code</dt>
                      <dd className="text-sm text-gray-900">{subscription.plan.planCode}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Billing Amount</dt>
                      <dd className="text-sm text-gray-900">
                        ${subscription.amount.toFixed(2)} {subscription.plan.billingCycleDisplay}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Plan Type</dt>
                      <dd className="text-sm text-gray-900">{subscription.plan.planType}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Billing Information */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Billing Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <dt className="text-sm font-medium text-gray-500 mb-1">Trial Period</dt>
                    <dd className="text-sm text-gray-900">
                      {subscription.trialStartDate ? (
                        <>
                          <div>{formatDate(subscription.trialStartDate)}</div>
                          <div className="text-gray-500">to {formatDate(subscription.trialEndDate)}</div>
                        </>
                      ) : (
                        'N/A'
                      )}
                    </dd>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <dt className="text-sm font-medium text-gray-500 mb-1">Subscription Start</dt>
                    <dd className="text-sm text-gray-900">{formatDate(subscription.subscriptionStartDate)}</dd>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <dt className="text-sm font-medium text-gray-500 mb-1">Last Billing</dt>
                    <dd className="text-sm text-gray-900">{formatDate(subscription.lastBillingDate)}</dd>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <dt className="text-sm font-medium text-gray-500 mb-1">Next Billing</dt>
                    <dd className="text-sm text-gray-900">{formatDate(subscription.nextBillingDate)}</dd>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              {subscription.paymentMethodId && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment Method
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <dl className="grid grid-cols-2 gap-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Payment Method ID</dt>
                        <dd className="text-sm text-gray-900">{subscription.paymentMethodId}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Payment Type</dt>
                        <dd className="text-sm text-gray-900">
                          {subscription.paymentMethodType?.replace('_', ' ')}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              )}

              {/* Plan Features */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Plan Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {subscription.plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cancellation Info */}
              {subscription.cancellationDate && (
                <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h3 className="text-lg font-medium text-red-800 mb-2">Cancellation Details</h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm font-medium text-red-700">Cancelled On</dt>
                      <dd className="text-sm text-red-600">{formatDate(subscription.cancellationDate)}</dd>
                    </div>
                    {subscription.cancellationReason && (
                      <div>
                        <dt className="text-sm font-medium text-red-700">Reason</dt>
                        <dd className="text-sm text-red-600">{subscription.cancellationReason}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerLookupPage;