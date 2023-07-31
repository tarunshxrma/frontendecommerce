import React from "react";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {

  const { cartItems, subTotal, tax,  total } = useSelector(
    (state) => state.cart
  );
  const [CART,setCART] = useState([...cartItems])
  let [SUBTOTAL,setSUBTOTAL] = useState(subTotal)
  const [TAX,setTAX] = useState(tax)
  const [TOTAL,setTOTAL] = useState(total)
  const dispatch = useDispatch();

  const increment = (id) => {
    dispatch({
      type: "addToCart",
      payload: { id },
    });
    dispatch({ type: "calculatePrice" });
  };
  const decrement = (id) => {
    dispatch({
      type: "decrement",
      payload: id,
    });

    dispatch({ type: "calculatePrice" });
  };
  const deleteHandler = (id) => {
    dispatch({
      type: "deleteFromCart",
      payload: id,
    });
    dispatch({ type: "calculatePrice" });
  };

  return (
    <div className="cart">
      <main>
        {CART.length > 0 ? (
          CART.map((i) => (
            <CartItem
            image={i.image}
            name={i.name}
            price={i.price}
            qty={i.quantity}
            id={i.id}
            key={i.id}
            decrement={decrement}
            increment={increment}
            deleteHandler={deleteHandler}
            />
          ))
        ) : (
          <h1 className="no-item">No Items Yet</h1>
        )}
            <div>
              <button onClick={()=>{
                setCART(CART.length=0)
                setSUBTOTAL(SUBTOTAL === 0)
                setTAX(TAX === 0)
                setTOTAL(TOTAL === 0)
                alert("Order Placed Successfully!")
              }}>Checkout</button>
            </div>
      </main>

      <aside className="aside">
        <h2>Subtotal: ₹{SUBTOTAL}</h2>
        {/* <h2>Shipping: ₹{shipping}</h2> */}
        <h2>Tax: ₹{TAX}</h2>
        <h2>Total:₹{TOTAL}</h2>
      </aside>
    </div>
  );
};

const CartItem = ({
  image,
  name,
  price,
  qty,
  decrement,
  increment,
  deleteHandler,
  id,
}) => (
  <div className="cartItem">
    <img src={image} alt="Item" className="cart-img"/>
    <article>
      <h3>{name}</h3>
      <p>{price}</p>
    </article>

    <div className="items">
      <button onClick={() => decrement(id)} className="incre">-</button>
      <p className="qty">{qty}</p>
      <button onClick={() => increment(id)} className="decre">+</button>
    </div>

    <AiFillDelete onClick={() => deleteHandler(id)}  className="delete"/>
  </div>
);

export default Cart;