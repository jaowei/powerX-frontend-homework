import React from "react";
import ReactDOM from "react-dom";
import { AuthProvider } from "./domains/auth";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import "./index.css";

import { AppShell } from "./app-shell";
import { Movie } from "./pages/movie"
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";
import { MovieDetailsPage } from "./pages/movie-details";
import { PageNotFound } from "./pages/404";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000,
    },
  },
});

ReactDOM.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppShell>
          <Switch>
            <Route path="/" exact>
              <Movie />
            </Route>

            <Route path="/register">
              <RegisterPage />
            </Route>

            <Route path="/login">
              <LoginPage />
            </Route>

            <Route path="/movie/:movieId" exact>
              <MovieDetailsPage />
            </Route>

            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
        </AppShell>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
