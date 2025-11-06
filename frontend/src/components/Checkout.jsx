import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, selectedAddress } = location.state || {};

  const [paymentMode, setPaymentMode] = useState("");
  const [loading, setLoading] = useState(false);

  // Generate random customer number
  const customerNumber = Math.floor(Math.random() * 1000000000);

  if (!cart || !selectedAddress) {
    return <p>Error: Missing cart or address data.</p>;
  }

  const handlePlaceOrder = async () => {
    if (!paymentMode) {
      alert("Please select a payment mode.");
      return;
    }

    if (paymentMode === "online") {
      alert("Online payment coming soon!");
      return;
    }

    setLoading(true);

    try {
      const products = cart.products.map((p) => ({
        productId: p.item._id,
        quantity: p.qty,
        price: p.price,
      }));

      const res = await fetch("https://e-com-project-msn4.onrender.com/order/addOrder", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products,
          totalAmount: cart.totalPrice + cart.totalShipping,
          deliveryAddress: selectedAddress,
          paymentMode,
          customerNumber: customerNumber.toString(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`Order placed successfully! Customer Number: ${customerNumber}`);
        dispatch({
          type: "set-cart",
          payload: { products: [], totalPrice: 0, totalShipping: 0 },
        });
        navigate("/orders");
      } else {
        alert(data.message || "Failed to place order");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while placing order!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Checkout</h2>

      {/* Delivery Address */}
      <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "20px" }}>
        <h3>Delivery Address</h3>
        <p><strong>{selectedAddress.fullName}</strong></p>
        <p>{selectedAddress.phone}</p>
        <p>{selectedAddress.addressLine1}{selectedAddress.addressLine2 ? `, ${selectedAddress.addressLine2}` : ""}</p>
        <p>{selectedAddress.city}, {selectedAddress.state} - {selectedAddress.zipCode}</p>
      </div>

      {/* Cart Summary */}
      <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "20px" }}>
        <h3>Order Summary</h3>
        {cart.products.map((p, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <p>{p.item.productName} - Qty: {p.qty} - ₹{p.price}</p>
          </div>
        ))}
        <p><strong>Total Price: ₹{cart.totalPrice}</strong></p>
        <p><strong>Shipping: ₹{cart.totalShipping}</strong></p>
        <p><strong>Grand Total: ₹{cart.totalPrice + cart.totalShipping}</strong></p>
      </div>

      {/* Payment Mode */}
      <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "20px" }}>
        <h3>Payment Mode</h3>
        <label>
          <input
            type="radio"
            value="cod"
            checked={paymentMode === "cod"}
            onChange={(e) => setPaymentMode(e.target.value)}
          />
          Cash on Delivery (COD)
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="online"
            checked={paymentMode === "online"}
            onChange={(e) => setPaymentMode(e.target.value)}
          />
          Online Payment (Coming Soon)
        </label>
      </div>

      {/* Terms */}
      <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "20px" }}>
        <h3>Terms and Conditions</h3>
        <p>Beyond 7 days you can't exchange and no return possible.</p>
        <p>Your Customer Number: <strong>{customerNumber}</strong></p>
      </div>

      <button onClick={handlePlaceOrder} disabled={loading} style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}>
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}
