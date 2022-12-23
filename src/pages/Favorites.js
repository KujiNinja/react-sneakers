import Card from '../components/Card'


function Favorites({items, onAddToFavorites}) {
    return (
        <div className="content p-40">
      
      <div className="d-flex align-center justify-between bm-40">
        <h1>Избранное</h1>
      </div>
        <div className="d-flex flex-wrap">
        { items
              .map((item, id) => (
              <Card 
                key = {item.id}
                {...item}
                imageUrl = {item.imageUrl}
                favorited = {true}
                onFavorite = {onAddToFavorites}
              />
            ))
          }
        </div>
      </div>
      )
}

export default Favorites