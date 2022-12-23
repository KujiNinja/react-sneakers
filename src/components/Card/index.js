import React from 'react'
import styles from './Card.module.scss'


function Card({ id, imageUrl, title, price, onFavorite, onPlus, favorited = false}){

  const [isAdded, setIsAdded] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(favorited)


  const onClickPlus = () => {
    onPlus({id, imageUrl, title, price})
    setIsAdded(!isAdded)
  }


  const onClickLiked =() => {
    onFavorite({id, imageUrl, title, price})
    setIsLiked(!isLiked)
  }

  return(
    <div className={styles.card}>
        <div className={styles.favorite} onClick={onFavorite}>
          <img onClick={onClickLiked} src={isLiked ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"} alt="Unliked"/>
        </div>
        <img width={133} height={112} src={imageUrl} alt="Sneaker"/>
        <h5>{title}</h5>
        <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
          </div>
          <img className={styles.plus} onClick={ onClickPlus } src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="Plus"/>
        </div>
    </div>
  )
}

export default Card;