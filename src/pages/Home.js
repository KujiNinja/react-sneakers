import Card from "../components/Card"

function Home({
    items,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddToFavorites,
    onAddToCart 
}) {
    return (
        <div className="content p-40">
      
      <div className="d-flex align-center justify-between bm-40">
        <h1>{searchValue ? `Поиск по '${searchValue}'` : 'Все кроссовки' }</h1>

        <div className="search-block">
          <img src="/img/search.svg" alt="Search"/>
          <input onChange={ onChangeSearchInput } value={searchValue} placeholder="Поиск ..."/>
          {searchValue && (
            <img 
              onClick={() => {setSearchValue('')}} 
              className="clear cu-p" 
              src="/img/btn-remove.svg" 
              alt="ClearInput"
            />
          )}
        </div>
      </div>
        <div className="d-flex flex-wrap">
          { items
              .filter((item) => item.title.toLowerCase().includes(searchValue))
              .map((item) => (
              <Card 
                key = {item.id}
                onFavorite = {(obj) => onAddToFavorites(obj)}
                onPlus = {(obj) => onAddToCart(obj)} 
                {...item}
              />
            ))
          }
        </div>
      </div>
      )
}

export default Home