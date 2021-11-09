import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./components/HOC/layout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/register";
import UserDashboard from "./pages/UserDashboard";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Buyer/Checkout";
import Track from "./pages/Buyer/Track";
import SellerProfile from "./pages/Seller/Profile";
import AddProduct from "./pages/Seller/AddProduct";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Rating from "./pages/Rating";
import SecuredRoute from "./components/util/securityUtils/SecureRoute";

export default function Routes() {
  return (
    <Suspense fallback={() => <div>loading</div>}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/contact-us" component={Contact} />

            <SecuredRoute path="/product/:id" component={ProductDetail} />
            <SecuredRoute path="/seller-profile/:id" component={SellerProfile} />
            <SecuredRoute path="/add-product" component={AddProduct} />
            <SecuredRoute path="/shop/:clothType?" component={Shop}/>
            <SecuredRoute path="/track/:id" component={Track} />
            <SecuredRoute path="/order-summary" component={UserDashboard} />
            <SecuredRoute path="/checkout" component={Checkout} />
            <SecuredRoute path="/orders" component={UserDashboard} />
            <SecuredRoute path="/rate" component={Rating} />
            <SecuredRoute exact path="/" component={Home} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </Suspense>
  );
}
