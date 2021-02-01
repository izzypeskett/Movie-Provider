import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MoviesList from "../Pages/MoviesList";
import MoviePage from "../Pages/Movie";
import Page404 from "../Pages/Page404";
import Navbar from "../components/navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={MoviesList} />
        <Route exact path="/movie/:id/" component={MoviePage} />
        <Route component={Page404} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
