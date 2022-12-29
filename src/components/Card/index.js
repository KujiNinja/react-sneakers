import React from "react";
import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader"
import AppContext from "../../context";

function Card({
  id,
  imageUrl,
  title,
  price,
  onFavorite,
  onPlus,
  favorited = false,
  loading = false,
}) {
  const { getAddedItems, items } = React.useContext(AppContext)
  const [isLiked, setIsLiked] = React.useState(favorited);


  const onClickPlus = () => {
    onPlus({ id, imageUrl, title, price });
  };

  const onClickLiked = () => {
    onFavorite({ id, imageUrl, title, price });
    setIsLiked(!isLiked);
  };

  return (
    <div className={styles.card}>
      {
        loading ? <ContentLoader
        speed={2}
        width={160}
        height={250}
        viewBox="0 0 155 265"
        backgroundColor="#f3f3f3"
        foregroundColor="#ece">
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155"/>
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15"/>
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15"/>
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25"/>
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32"/>
        </ContentLoader> : <>
        <div className={styles.favorite} onClick={onFavorite}>
        <img
          onClick={onClickLiked}
          src={isLiked ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"}
          alt="Unliked"
        />
      </div>
      <img width="100%" height={135} src={imageUrl} alt="Sneaker" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img
          className={styles.plus}
          onClick={onClickPlus}
          src={getAddedItems(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
          alt="Plus"
        />
      </div>
        </>
      }
      
    </div>
  );
}

export default Card;
