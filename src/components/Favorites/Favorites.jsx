import axios from "axios";
import "./Favorites.scss";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

const Favorites = (props) => {
  // const [isSignedUp, setIsSignedUp] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [Token, setToken] = useState("");
  const [tokenContent, setTokenContent] = useState("");
  const [favorites, setFavorites] = useState([]);

  const baseUrl = "https://hadofinder-backend-1bc5339ff88a.herokuapp.com";

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${baseUrl}/users`, {
        email: e.target.email.value,
        password: e.target.password.value,
      });

      console.log("Upload successful");
      props.setIsSignedUp(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/users/login`, {
        email: e.target.email.value,
        password: e.target.password.value,
      });
      const token = response.data;
      props.setIsLoggedIn(true);
      sessionStorage.setItem("Token", token.token);
      setToken(token.token);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log(sessionStorage.getItem('Token'))
    if (Token) {
      setTokenContent(jwtDecode(Token));
    } else {
      setToken(sessionStorage.getItem("Token"));
    }
  }, [Token]);

  useEffect(() => {
    // console.log(Token)
    if (tokenContent) {
      props.setUserId(tokenContent.id);
      getFavorites();
    }
  }, [tokenContent, props.favAdded]);

  // console.log(props.favAdded)

  const header = {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("Token"),
    },
  };

  const getFavorites = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/users/${tokenContent.id}/events`,
        header
      );
      setFavorites(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFavs = () => {
    props.setFav(false);
  };

  const logOut = () => {
    setFavorites([]);
    props.setIsLoggedIn(false);
    sessionStorage.setItem("Token", "");
    setToken("");
  };

  return (
    <section className="favs">
      <button onClick={handleFavs} className="favs__close favs__button">
        close
      </button>
      <p className="favHeader">FAVORITES</p>
      {!props.isLoggedIn ? (
        <p className="logInPrompt">You must log in to access this feature.</p>
      ) : (
        ""
      )}
      <div className="signLog">
        {props.isLoggedIn === false ? (
          <div className="signLog__div">
            <p className="signLog__CTA">Log In</p>
            <form className="signLog__form" onSubmit={handleLogIn}>
              <label className="signLog__label" htmlFor="email">
                Email:{" "}
              </label>
              <input className="signLog__field" type="email" name="email" />
              <label className="signLog__label" htmlFor="password">
                Password:{" "}
              </label>
              <input
                className="signLog__field"
                type="password"
                name="password"
              />
              <button className="signLog__button" type="submit">
                Log In
              </button>
            </form>
          </div>
        ) : (
          <button onClick={logOut} className="favs__button favs__logout">
            Log Out
          </button>
        )}
        {props.isSignedUp === false && props.isLoggedIn === false ? (
          <div className="signLog__div">
            {/* <p>You must log in to access this feature.</p> */}
            <p className="signLog__CTA">Sign Up</p>
            <form className="signLog__form" onSubmit={handleSignup}>
              <label className="signLog__label" htmlFor="email">
                Email:{" "}
              </label>
              <input className="signLog__field" type="email" name="email" />
              <label className="signLog__label" htmlFor="password">
                Password:{" "}
              </label>
              <input
                className="signLog__field"
                type="password"
                name="password"
              />
              <button className="signLog__button" type="submit">
                Sign Up
              </button>
            </form>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="bigFavDiv">
        {favorites && props.isLoggedIn
          ? favorites.map((item, index) => (
              <div key={index} className="favDiv">
                <div className="favDiv__infoDiv">
                  <p className="favDiv__text">{item.name}</p>
                  <p className="favDiv__text">{item.address}</p>
                  <p className="favDiv__text">{item.date.split(".")[0]}</p>
                </div>

                <a className="favDiv__link" href={item.url}>
                  {item.url}
                </a>
              </div>
            ))
          : ""}
      </div>
    </section>
  );
};

export default Favorites;
