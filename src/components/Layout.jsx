import React, { useContext, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
//import axios from "axios";
import { AuthContext } from "../AuthContext"; // 引入 AuthContext
import "../styles/style.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// import ChatApp from "../components/ChatApp"; // 引入 ChatApp 组件

const Layout = ({ children }) => {
  const navigate = useNavigate();
  // const location = useLocation(); // 获取当前路径
  const { isLoggedIn, setIsLoggedIn, loggedInUser, setLoggedInUser } = useContext(AuthContext);
  //const [formData, setFormData] = useState({ username: "", password: "" });
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // check if the user in the product detail page or not
  // const isProductDetailPage = location.pathname.startsWith('/product/');

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post("http://54.82.75.121/users/login", formData);
  //     localStorage.setItem("token", response.data.token);
  //     setIsLoggedIn(true);
  //     setLoggedInUser(formData.username);
  //     setErrorMessage("");
  //     setFormData({ username: "", password: "" });
  //     alert("Login successful!");
  //   } catch (error) {
  //     setErrorMessage("Invalid username or password. Please try again.");
  //     console.error("Login failed:", error);
  //   }
  // };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setLoggedInUser("");
    navigate("/");
  };

  const toggleSearchBar = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    // Optional: Perform search/filter logic here
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/?query=${searchTerm}`);
  };
  

  return (
    <>
      <div className="top-navigation">
        <Link to= "/">
          <i className="logo-text">MarketBay </i>
        </Link>
        <i className="bi-search search-icon"
          title="Search"
          style={{ cursor: "pointer" }}
          onClick={toggleSearchBar}
        />
        {isSearchVisible && (
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              type="text"
              className="search-input"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
            <button style={{ fontSize: '14px', color:"white", backgroundColor:"cornflowerblue", borderColor:"cornflowerblue"}} type="submit" className="search-submit-button">
              Search
            </button>
          </form>
        )}

        {/* <div className="top-mid-nav">
          <Link to="/">
            <i className="bi-shop house-icon" />
          </Link>
        </div> */}

        <div className="top-right-nav">
          {isLoggedIn && (
            <div className="user-info">
              <span className="welcome-text">Welcome, {loggedInUser}!</span>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
          <i
            className="bi-person-circle account-icon"
            title="Account"
            onClick={() => navigate("/login")}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>

      {children}

       {/* chat system will display when user click into product detail page
      {isLoggedIn && isProductDetailPage && (
        <div className="chat-container">
          <ChatApp />
        </div>
      )} */}
    </>
  );
};

export default Layout;
