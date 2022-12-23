import React from 'react'
import { Route } from 'react-router-dom'
import axios from 'axios'
import Card from './components/Card'
import Header from './components/Header'
import Drawer from './components/Drawer'
import Home from './pages/Home'
import Favorites from './pages/Favorites'


function App() {

  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false)

  React.useEffect(() => {

    axios.get(process.env.REACT_APP_URL + '/items')  // axios get запрос для главной 
      .then(res => {setItems(res.data)})

    axios.get(process.env.REACT_APP_URL + '/cart')  // axios get запрос для корзины
      .then(res => {setCartItems(res.data)})

    axios.get(process.env.REACT_APP_URL + '/favorites')  // axios get запрос для избранного
      .then(res => {setFavorites(res.data)})

    // fetch('https://6399979a16b0fdad77422368.mockapi.io/items')   // fetch get запрос
    // .then((res) => {return res.json()})
    // .then((json) => {setItems(json)})
  },[])

  const onAddToCart =(obj) => {
    axios.post(process.env.REACT_APP_URL + '/cart', obj)  // axios post запрос на состояние корзины
     setCartItems(prev => [...prev, obj])
  }

  const onRemoveItemFromCart = (id) => {
   axios.delete(process.env.REACT_APP_URL + `/cart/${id}`)  // axios delete запрос на удаление из корзины
     setCartItems((prev) => prev.filter(item => item.id !== id))  // фильрация ( удаление) по айди
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const onAddToFavorites = async (obj) => {
    try {
      if(favorites.find(favoritebj => favoritebj.id === obj.id )) {
        axios.delete(process.env.REACT_APP_URL + `/favorites/${obj.id}`)
        // setFavorites((prev) => prev.filter(item => item.id !== obj.id))
      } else {
        const { data } = await axios.post(process.env.REACT_APP_URL + '/favorites', obj)  // axios post запрос на состояние favorites
        setFavorites(prev => [...prev, data])
      }
    } catch (error) {
      alert ('Не удалось добавить в избранное')
    }
   
  }

return (
    <div className="wrapper clear">
        {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItemFromCart} />}
        <Header onClickCart={() => setCartOpened(true)} />
            <Route path="/" exact>
              <Home 
                items={items} 
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorites={onAddToFavorites}
                onAddToCart={onAddToCart}
                />
            </Route>
            <Route path="/favorites" exact>
              <Favorites 
                  items={favorites}
                  onAddToFavorites={onAddToFavorites}
                />
            </Route>
    </div>
  );
}

export default App;
