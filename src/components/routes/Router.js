import * as React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Footer from '../Footer';
import AdminOrder from '../admin/AdminOrder';
import ScrollToTop from './ScrollToTop';
import HeaderAdmin from '../HeaderAdmin';
import Reviews from '../admin/review/Reviews';
import AdminApp from '../admin/AdminApp';
import Auth from '../Auth';
import GiftCards from '../admin/GiftCards';
import GiftCard from '../admin/GiftCard';
import PortfolioGallery from '../admin/Portfolio';
import { isAuthenticated } from '../../utils/utils';

export function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <HeaderAdmin />
        </Route>
      </Switch>
      <ScrollToTop />
      <Switch>
        <Route exact path="/login" component={Auth} />
        <Route
          path="/review"
          render={props => {
            if (isAuthenticated()) {
              return <Reviews {...props} />;
            }
            return <Redirect to="login" />;
          }}
        />
        <Route
          path="/portfolio"
          render={props => {
            if (isAuthenticated()) {
              return <PortfolioGallery {...props} />;
            }
            return <Redirect to="login" />;
          }}
        />
        <Route
          path="/giftcard/:id"
          render={props => {
            if (isAuthenticated()) {
              return <GiftCard {...props} />;
            }
            return <Redirect to="login" />;
          }}
        />
        <Route
          path="/giftcard"
          render={props => {
            if (isAuthenticated()) {
              return <GiftCards {...props} />;
            }
            return <Redirect to="login" />;
          }}
        />
        <Route
          path="/:id"
          render={props => {
            if (isAuthenticated()) {
              return <AdminOrder {...props} />;
            }
            return <Redirect to="login" />;
          }}
        />
        <Route
          path="/"
          render={props => {
            if (isAuthenticated()) {
              return <AdminApp {...props} />;
            }
            return <Redirect to="login" />;
          }}
        />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}
