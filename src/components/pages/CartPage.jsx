import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";
import CartItem from "@/components/molecules/CartItem";
import Empty from "@/components/ui/Empty";
import { useCart } from "@/hooks/useCart";

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: ""
  });

  const handleInputChange = (field, value) => {
    setPaymentForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsCheckingOut(true);
    
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and show success
      clearCart();
      toast.success("Paiement réalisé avec succès ! Vos contenus sont maintenant disponibles dans votre espace.");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Erreur lors du paiement. Veuillez réessayer.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
              >
                <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
                Retour
              </Button>
            </div>
            
            <Empty
              title="Votre panier est vide"
              description="Ajoutez des contenus à votre panier pour commencer vos achats."
              icon="ShoppingCart"
              actionLabel="Continuer mes achats"
              onAction={handleContinueShopping}
            />
          </div>
        </div>
      </div>
    );
  }

  const totalPrice = getTotalPrice();
  const taxAmount = totalPrice * 0.20; // TVA 20%
  const finalTotal = totalPrice + taxAmount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-6"
            >
              <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
              Retour
            </Button>
            
            <h1 className="font-display text-3xl md:text-4xl font-bold text-warm-gray-900">
              Mon Panier
            </h1>
            <p className="text-warm-gray-600 mt-2">
              {cartItems.length} article{cartItems.length !== 1 ? "s" : ""} dans votre panier
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <CartItem key={item.Id} item={item} />
                ))}
              </div>
            </div>

            {/* Checkout Form */}
            <div className="lg:col-span-1">
              <Card variant="golden" className="p-6 sticky top-24">
                <h2 className="font-display text-xl font-semibold text-warm-gray-900 mb-6">
                  Résumé de la commande
                </h2>

                {/* Order Summary */}
                <div className="space-y-3 mb-6 pb-6 border-b border-warm-gray-200">
                  <div className="flex justify-between">
                    <span>Sous-total</span>
                    <span>{totalPrice.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>TVA (20%)</span>
                    <span>{taxAmount.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="gradient-text">{finalTotal.toFixed(2)}€</span>
                  </div>
                </div>

                {/* Payment Form */}
                <form onSubmit={handleCheckout} className="space-y-4">
                  <Input
                    label="Email"
                    type="email"
                    value={paymentForm.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="votre@email.com"
                    required
                  />

                  <Input
                    label="Nom sur la carte"
                    value={paymentForm.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Jean Dupont"
                    required
                  />

                  <Input
                    label="Numéro de carte"
                    value={paymentForm.cardNumber}
                    onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiration"
                      value={paymentForm.expiryDate}
                      onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                      placeholder="MM/AA"
                      required
                    />

                    <Input
                      label="CVV"
                      value={paymentForm.cvv}
                      onChange={(e) => handleInputChange("cvv", e.target.value)}
                      placeholder="123"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full mt-6"
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Traitement...
                      </>
                    ) : (
                      <>
                        <ApperIcon name="CreditCard" className="w-5 h-5 mr-2" />
                        Payer {finalTotal.toFixed(2)}€
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-4 flex items-center justify-center text-sm text-warm-gray-500">
                  <ApperIcon name="Shield" className="w-4 h-4 mr-2" />
                  Paiement 100% sécurisé SSL
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;