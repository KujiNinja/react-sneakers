import React from "react";
import Info from "./Info";
import AppContext from "../context";
import axios from "axios";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [] }) {
  const { cartItems, setCartItems } = React.useContext(AppContext);
  const [cartSum, setCartSum] = React.useState(null);
  const [orderID, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);
  const discount = totalPrice * 0.1

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(process.env.REACT_APP_URL + "/orders", {
        items: cartItems,
      });
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(process.env.REACT_APP_URL + `/cart/${item.id}`);
        await delay(1000);
      }
    } catch (error) {
      alert("Не удалось создать заказ");
    }
    setIsLoading(false);
  };

  return (
    // style= {{display:"none"}}
    <div className="overlay">
      <div className="drawer d-flex flex-column">
        <h2 className="d-flex justify-between mb-30 ">
          Корзина{" "}
          <img
            onClick={onClose}
            className="removeBtn cu-p"
            src="/img/btn-remove.svg"
            alt="Remove"
          />{" "}
        </h2>

        {items.length > 0 ? (
          <div className="items d-flex flex-column flex">
            <div className="items flex">
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mb-20 cu-p"
                >
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"
                  ></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price}</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="/img/btn-remove.svg"
                    alt="Remove"
                  />

                  <div />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li className="d-flex">
                  <span>Скидка 10%:</span>
                  <div></div>
                  <b>{discount}</b>
                </li>
                <li className="d-flex">
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice - discount}</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            discription={
              isOrderComplete
                ? `Ваш заказ №${orderID}. Скоро кроссовки будут у Вас - мы уже работаем над этим`
                : "Добавьте кроссовки для заказа"
            }
            image={
              isOrderComplete
                ? "/img/complete-order.jpeg"
                : "/img/empty-cart.jpeg"
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
