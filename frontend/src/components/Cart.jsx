import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/cart/get", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (data.cart) dispatch({ type: "set-cart", payload: data.cart });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [dispatch]);

  if (loading) return <p>Loading cart...</p>;

  async function updateQuantity(productId, action) {
    if (updating) return;
    setUpdating(true);

    try {
      const res = await fetch("http://localhost:3000/cart/update", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, action }),
      });

      const data = await res.json();

      if (data.cart) {
        dispatch({ type: "set-cart", payload: data.cart });
      } else if (data.error) {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>
      {cart.products.length > 0 ? (
        cart.products.map((p, idx) => (
          <div
            key={idx}
            style={{
              border: "1px solid #ccc",
              marginBottom: 10,
              padding: 10,
              borderRadius: 8,
            }}
          >
            <h3>{p.item.productName}</h3>
            <p>Price: ₹{p.price}</p>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* ✅ Increment Button */}
              <button
                disabled={updatingId === p.item._id || p.item.productCount <= 0}
                onClick={async () => {
                  setUpdatingId(p.item._id);
                  await updateQuantity(p.item._id, "inc");
                  setUpdatingId(null);
                }}
              >
                +
              </button>

              <p>Qty: {p.qty}</p>

              {/* ✅ Decrement Button with Confirmation */}
              <button
                disabled={updating}
                onClick={async () => {
                  if (p.qty === 1) {
                    const confirmRemove = window.confirm(
                      "This product will be removed completely. Are you sure?"
                    );
                    if (!confirmRemove) return; // user canceled
                  }
                  setUpdatingId(p.item._id);
                  await updateQuantity(p.item._id, "dec");
                  setUpdatingId(null);
                }}
              >
                -
              </button>

              <p>Available: {p.item.productCount}</p>
            </div>

            <p>Subtotal: ₹{p.price * (p.qty || 1)}</p>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}

      <h3>Total Price: ₹{cart.totalPrice}</h3>
      <h3>Total Shipping: ₹{cart.totalShipping}</h3>
      <h2>Total: ₹{cart.totalPrice + cart.totalShipping}</h2>
    </div>
  );
}
