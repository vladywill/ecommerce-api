import "./App.css";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import webFont from "webfontloader";
import React, { useEffect, useState } from "react";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import { Switch } from "react-router-dom/cjs/react-router-dom.min.js";
import LoginSignUp from "./component/User/LoginSignUp.js";
import store from "./store";
import { loadUser } from "./actions/userAction.js";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/admin/Dashboard.js"
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header></Header>
      {isAuthenticated && <UserOptions user={user} />}

      {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute exact path="/process/payment" component={Payment} />
          </Elements>
        )}

      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/product/:id" component={ProductDetails}></Route>
        <Route exact path="/products" component={Products}></Route>
        <Route path="/products/:keyword" component={Products}></Route>

        <Route exact path="/search" component={Search}></Route>

        <ProtectedRoute
          exact
          path="/account"
          component={Profile}
        ></ProtectedRoute>

        <ProtectedRoute
          exact
          path="/me/update"
          component={UpdateProfile}
        ></ProtectedRoute>

        <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        ></ProtectedRoute>

        <Route exact path="/password/forgot" component={ForgotPassword}></Route>

        <Route
          exact
          path="/password/reset/:token"
          component={ResetPassword}
        ></Route>

        <Route exact path="/login" component={LoginSignUp}></Route>

        <Route exact path="/cart" component={Cart}></Route>

        <ProtectedRoute exact path="/shipping" component={Shipping} />

        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />

        <ProtectedRoute exact path="/success" component={OrderSuccess} />

        <ProtectedRoute exact path="/orders" component={MyOrders} />

        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

        
        <ProtectedRoute exact path="/admin/dashboard" component={Dashboard}/>

      </Switch>

      <Footer></Footer>
    </Router>
  );
}

export default App;
