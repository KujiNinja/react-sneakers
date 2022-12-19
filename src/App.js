import React from 'react'
import Card from './components/Card'
import Header from './components/Header'
import Drawer from './components/Drawer'


function App() {

  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')

  const [cartOpened, setCartOpened] = React.useState(false)

  React.useEffect(() => {
    fetch('https://6399979a16b0fdad77422368.mockapi.io/items')
    .then((res) => {return res.json()})
    .then((json) => {setItems(json)})
  },[])

  const onAddToCart =(obj) => {
     setCartItems(prev => [...prev, obj])
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

return (
    <div className="wrapper clear">
        {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)}/>}
        <Header onClickCart={() => setCartOpened(true)} />
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
          {
            items.map((item) => (
              <Card 
                key = {item.id}
                title = {item.title}
                price = {item.price}
                imageUrl = {item.imageUrl}
                onFavorite = {() => console.log('liked')}
                onPlus = {(obj) => onAddToCart(obj)} 
              />
            ))
          }
        </div>
      </div>
    
    </div>
  );
}

export default App;
