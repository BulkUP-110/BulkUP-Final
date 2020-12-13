import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Redirect, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen/PlaceOrderScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './screens/SellerScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import LandingScreen from './screens/LandingScreen';
import RegisterSellerScreen from './screens/RegisterSellerScreen';
import logo from './images/logo.png';

function App() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (

    <BrowserRouter>
      {!userInfo ? (
        <Redirect to="/landing" />
      ) : (
          <div>
          </div>
        )}
      <div className="grid-container">
        <header className="row">
          <div>
            {!userInfo ? (
              <div>
              </div>
            ) : (
                <button
                  type="button"
                  className="open-sidebar"
                  onClick={() => setSidebarIsOpen(true)}
                >
                  <i className="fa fa-bars"></i>
                </button>
              )}
            <Link onClick={() => { window.location.href = "/" }} className="brand" to="/">
              BulkUP
            </Link>
          </div>
          {!userInfo ? (
            <div>
            </div>
          ) : (
              <div className="searchBar">
                <Route
                  render={({ history }) => (
                    <SearchBox history={history}></SearchBox>
                  )}
                ></Route>
              </div>
            )}
          <div>
            {userInfo ? (
              <Link to="/cart">
                Cart
                {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                )}
              </Link>
            ) : (
                <div>
                </div>
              )}
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
                <div>
                  <Link to="/signin">Sign In</Link>
                  <Link to="/register">Sign Up</Link>
                </div>
              )}
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#admin">
                  Seller <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist/seller">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist/seller">Orders</Link>
                  </li>
                </ul>
              </div>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className={sidebarIsOpen ? 'open' : ''} style={{ border: "2px #ffffff1f solid" }}>
          <ul className="categories">
            <li>
              <strong style={{ color: "white" }}>Categories</strong>
              <button style={{ color: "white" }}
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
                  categories.map((c) => (
                    <li key={c} >
                      <Link style={{ color: "white" }}
                        to={`/search/category/${c}`}
                        onClick={() => setSidebarIsOpen(false)}
                      >
                        {c}
                      </Link>
                    </li>
                  ))
                )}
          </ul>
          {/* <ul className="Become a Seller">
            <li>
              <button style={{ color: "white" }}
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
                  </ul> */}
        </aside>
  )

        <main>
          <Route path="/seller/:id" component={SellerScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
          <Route path="/landing" component={LandingScreen}></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/becomeaseller" component={RegisterSellerScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route
            path="/search/name/:name?"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name"
            component={SearchScreen}
            exact
          ></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
            exact
          ></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>
          <SellerRoute
            path="/productlist/seller"
            component={ProductListScreen}
          ></SellerRoute>
          <SellerRoute
            path="/orderlist/seller"
            component={OrderListScreen}
          ></SellerRoute>

          <Route path="/" component={HomeScreen} exact></Route>
        </main>

        <div>
          <footer>
              <div className="footerliHEAD">
                <img src={logo} width="3%" alt="logo" />
              <div className="footerli"><a href={`mailto:admin@bulkUP.com`}>Contact Us</a></div>
            </div>
          </footer>
        </div>
      </div >
    </BrowserRouter >
  );
}

export default App;