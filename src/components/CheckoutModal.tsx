import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { X, CreditCard, MapPin } from 'lucide-react';
import { Artwork } from '../types';

interface CheckoutModalProps {
  artwork: Artwork;
  onClose: () => void;
  onComplete: () => void;
}

interface AddressForm {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ artwork, onClose, onComplete }) => {
  const { user } = useAuth();
  const [step, setStep] = useState<'address' | 'payment'>('address');
  const [address, setAddress] = useState<AddressForm>({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePayment = async () => {
    // Here we would integrate with a payment provider
    // For now, we'll just simulate a successful payment
    const options = {
      key: "rzp_test_zRJkjDNEusOoIR", // 🔑 Replace with your actual Razorpay Key ID
      amount: artwork.price * 100, // 💰 Amount in paise (e.g., 500 for ₹5.00)
      currency: "INR",
      name: "Your Company Name",
      description: "Artwork Purchase",
      image: "/logo.png",
      handler: function (response: any) {
        console.log("Payment Success:", response);
        // You can store this response for later backend verification
        onComplete();
        onClose();
      },
      prefill: {
        name: "Your Name",
        email: "email@example.com",
        contact: "9999999999"
      },
      theme: {
        color: "#6b46c1"
      }
    };
  
    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();

    user?.id;

  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full overflow-hidden"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <div className="relative p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {step === 'address' ? 'Shipping Address' : 'Payment Details'}
          </h2>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className={`flex items-center ${step === 'address' ? 'text-purple-600' : 'text-gray-400'}`}>
              <MapPin className="h-5 w-5" />
              <span className="ml-2 font-medium">Address</span>
            </div>
            <div className="mx-4 h-px w-16 bg-gray-200" />
            <div className={`flex items-center ${step === 'payment' ? 'text-purple-600' : 'text-gray-400'}`}>
              <CreditCard className="h-5 w-5" />
              <span className="ml-2 font-medium">Payment</span>
            </div>
          </div>

          {step === 'address' ? (
            <form onSubmit={handleAddressSubmit} className="space-y-4">
              <div>
                <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                  Street Address
                </label>
                <input
                  type="text"
                  id="street"
                  required
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring focus:ring-purple-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    required
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring focus:ring-purple-200"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    required
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring focus:ring-purple-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    required
                    value={address.zipCode}
                    onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring focus:ring-purple-200"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    required
                    value={address.country}
                    onChange={(e) => setAddress({ ...address, country: e.target.value })}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring focus:ring-purple-200"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all"
              >
                Continue to Payment
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Order Summary</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{artwork.title}</p>
                      <p className="text-sm text-gray-500">by {artwork.artist}</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-purple-600">${artwork.price}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <button
                  onClick={handlePayment}
                  className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all flex items-center justify-center"
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Pay ${artwork.price}
                </button>
                <button
                  onClick={() => setStep('address')}
                  className="w-full mt-3 py-2 px-4 text-gray-600 hover:text-gray-800 transition-colors text-sm"
                >
                  Back to Address
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutModal;