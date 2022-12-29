import React from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]); 
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      const cartResponse = await axios.get(process.env.REACT_APP_URL + "/cart"); // axios get запрос для корзины
      const favoritesResponse = await axios.get(
        process.env.REACT_APP_URL + "/favorites"
      ); // axios get запрос для избранного
      const itemsResponse = await axios.get(
        process.env.REACT_APP_URL + "/items"
      ); // axios get запрос для главной

      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }
    fetchData();

    // fetch('https://6399979a16b0fdad77422368.mockapi.io/items')   // fetch get запрос
    // .then((res) => {return res.json()})
    // .then((json) => {setItems(json)})
  }, []);

  const onAddToCart = async (obj) => {
    try {
      if (
        cartItems.find((cartItem) => Number(cartItem.id) === Number(obj.id))
      ) {
        axios.delete(process.env.REACT_APP_URL + `/cart/${obj.id}`);
        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        axios.post(process.env.REACT_APP_URL + "/cart", obj); // axios post запрос на состояние корзины
        setCartItems((prev) => [...prev, obj]);
      }
    } catch (error) {
      console.error("что-то не так");
    }
  };

  const onRemoveItemFromCart = (id) => {
    axios.delete(process.env.REACT_APP_URL + `/cart/${id}`); // axios delete запрос на удаление из корзины
    setCartItems((prev) => prev.filter((item) => item.id !== id)); // фильрация ( удаление) по айди
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const onAddToFavorites = async (obj) => {
    try {
      if (
        favorites.find(
          (favoriteObj) => Number(favoriteObj.id) === Number(obj.id)
        )
      ) {
        axios.delete(process.env.REACT_APP_URL + `/favorites/${obj.id}`);
        // setFavorites((prev) => prev.filter(item => item.id !== obj.id))
      } else {
        const { data } = await axios.post(
          process.env.REACT_APP_URL + "/favorites",
          obj
        ); // axios post запрос на состояние favorites
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      console.error("Не удалось добавить в избранное");
    }
  };

  const getAddedItems = (id) => {
   return cartItems.some((obj) => Number(obj.id) === Number(id))
  }

  return (
    <AppContext.Provider value = {{ items, cartItems, favorites, getAddedItems }}>
      <div className="wrapper clear">
        {cartOpened && (
          <Drawer
            items={cartItems}
            onClose={() => setCartOpened(false)}
            onRemove={onRemoveItemFromCart}
          />
        )}
        <Header onClickCart={() => setCartOpened(true)} />
        <Route path="/" exact>
          <Home
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorites={onAddToFavorites}
            onAddToCart={onAddToCart}
            isLoading={isLoading}
          />
        </Route>
        <Route path="/favorites" exact>
          <Favorites onAddToFavorites={onAddToFavorites} />
        </Route>
      </div>
    </AppContext.Provider>
  );
}

export default App;
