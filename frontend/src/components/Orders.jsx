 import React, { useEffect, useState } from 'react'

export default function Orders() {
 const [orders, setOrders] = useState([]);

    useEffect(() => {
 async function getData() {
            try {
                let res = await fetch("https://e-com-project-msn4.onrender.com/order/getOrder", {
                    method: "GET",
                credentials: "include",
            });
              let data = await res.json();
                if (res.ok) {
                    setOrders(data.orders);
                } else {
            alert(data.message);
        }
        } catch (err) {
                console.error(err);
             alert("Something went wrong!");
       }
     }
       getData();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Your Orders</h2>
            {orders.length > 0 ? (
                orders.map((order, idx) => (
                    <div key={idx} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "20px" }}>
                        <h3>Order ID: {order._id}</h3>
                        <p><strong>Customer Number:</strong> {order.customerNumber}</p>
                        <p><strong>Payment Mode:</strong> {order.paymentMode === "cod" ? "Cash on Delivery" : "Online Payment"}</p>
                        <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
                        <p><strong>Status:</strong> {order.status}</p>
                        <p><strong>Ordered At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                        <h4>Products:</h4>
                        <ul>
                            {order.products.map((prod, pidx) => (
                                <li key={pidx}>
                                    {prod.productId?.productName || "Product"} - Qty: {prod.quantity} - Price: ₹{prod.price}
                                </li>
                            ))}
                        </ul>
                        <h4>Delivery Address:</h4>
                        <p>{order.deliveryAddress.fullName}</p>
                        <p>{order.deliveryAddress.phone}</p>
                        <p>{order.deliveryAddress.addressLine1}{order.deliveryAddress.addressLine2 ? `, ${order.deliveryAddress.addressLine2}` : ""}</p>
                        <p>{order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.zipCode}</p>
                    </div>
                ))
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
}
 