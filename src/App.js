import React from 'react'
import Card from './components/Card'
import Header from './components/Header'
import Drawer from './components/Drawer'


function App() {

  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])

  const [cartOpened, setCartOpened] = React.useState(false)

  React.useEffect(() => {
    fetch('https://6399979a16b0fdad77422368.mockapi.io/items')
    .then((res) => {return res.json()})
    .then((json) => {setItems(json)})
  },[])

  const onAddToCart =(obj) => {
    
    setCartItems(prev => [...prev, obj])
  }

return (
    <div className="wrapper clear">
        {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)}/>}
        <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
      
      <div className="d-flex align-center justify-between bm-40">
        <h1>Все кроссовки</h1>

        <div className="search-block">
          <img src="/img/search.svg" alt="Search"/>
          <input placeholder="Поиск ..."/>
        </div>
      </div>
        <div className="d-flex flex-wrap">
          {
            items.map((el) => (
              <Card 
                // key =
                title = {el.title}
                price = {el.price}
                imageUrl = {el.imageUrl}
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
