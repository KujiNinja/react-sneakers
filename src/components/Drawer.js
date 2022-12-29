import React from "react";

function Drawer({ onClose, onRemove, items = [] }) {
  const [cartSum, setCartSum] = React.useState(null);

  const totalPrice = () => {
    items.reduce((total, price) => {
      cartSum += price;
    });
    setCartSum();
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
                <div key={obj.id} className="cartItem d-flex align-center mb-20 cu-p">
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
                  <span>Итого:</span>
                  <div></div>
                  <b>1488</b>
                </li>
                <li className="d-flex">
                  <span>Скидка 5%:</span>
                  <div></div>
                  <b>0</b>
                </li>
              </ul>
              <button className="greenButton">
                Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img
              className="mb-20"
              width={120}
              height={120}
              src="/img/empty-cart.jpeg"
              alt="EmptyCart"
            />
            <h2>Корзина пустая</h2>
            <p className="opacity-6">
              Добавьте зтя бы одну пару кроссовок, тчтобы сделать заказ.
            </p>
            <button onClick={onClose} className="greenButton">
              <img src="/img/arrow.svg" alt="Arrow" />
              Вернуться назад
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Drawer;
