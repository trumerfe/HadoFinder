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
  const [tokenContent, setTokenContent] = useState('')
  // const [user, setUser]

  const baseUrl = "http://localhost:8080";

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
      setToken(sessionStorage.getItem("Token"));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Token){
      setTokenContent(jwtDecode(Token))
    }
  }, [Token])

  useEffect(() => {
    // console.log(tokenContent.id)
    if (tokenContent){
      getFavorites()
    }

  }, [tokenContent])

  const header = {
    headers: {
      Authorization: "Bearer " + Token
    }
  }

  const getFavorites = async () => {
    try {
      const response = await axios.get(`${baseUrl}/users/${tokenContent.id}/events`, header)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  } 

  const handleFavs = () => {
    props.setFav(false);
  };

  return (
    <section className="favs">
      <button onClick={handleFavs} className="favs__close">
        close
      </button>
      {props.isSignedUp === false && props.isLoggedIn === false ? <div>
        <p>Sign Up</p>
        <form onSubmit={handleSignup}>
          <div>
            Email: <input type="email" name="email" />
          </div>
          <div>
            Password: <input type="password" name="password" />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div> : ''}
      {props.isLoggedIn === false ? <div>
        <p>Log In</p>
        <form onSubmit={handleLogIn}>
          <div>
            Email: <input type="email" name="email" />
          </div>
          <div>
            Password: <input type="password" name="password" />
          </div>
          <button type="submit">Log In</button>
        </form>
      </div> : ''}
    </section>
  );
};

export default Favorites;
