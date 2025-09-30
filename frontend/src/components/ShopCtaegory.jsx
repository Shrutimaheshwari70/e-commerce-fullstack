import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Productcontext from '../Context/context';

export default function ShopCtaegory() {
  const { category } = useParams();
  const { values } = useContext(Productcontext);
console.log(values);

 
  const filteredProducts = values.filter(
    (product) => product.productCategory.toLowerCase() === category.toLowerCase()
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Shop for: {category}</h2>
      {filteredProducts.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
          {filteredProducts.map((p) => (
            <div key={p._id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
              <h3>{p.productName}</h3>
              <p>Price: ₹{p.productPrice}</p>
              <p>{p.description}</p>
              {Array.isArray(p.productImage) && p.productImage.map((img, idx) => (
                <img key={idx} src={img} alt={p.productName} style={{ width: "100%", marginBottom: "5px" }} />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>No products found in this category.</p>
      )}
    </div>
  );
}
