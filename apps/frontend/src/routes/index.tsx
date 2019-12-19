import React, { lazy, Suspense, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import GlobalStyles from 'styles/globals';
import { themes } from 'styles';
import Loader from 'components/Loader';
import Navbar from 'components/Navbar';
import { useSelector } from 'react-redux';
import { RootState } from 'store/rootReducer';

const Home = lazy(() => import('pages/Home'));
const Login = lazy(() => import('pages/Login'));
const Signup = lazy(() => import('pages/Signup'));
const CreateStory = lazy(() => import('pages/CreateStory'));
const SingleStory = lazy(() => import('pages/SingleStory'));

interface RouteProps {
  path: string;
  exact: boolean;
}

const ProtectedRoute: React.FunctionComponent<RouteProps> = ({
  path,
  exact,
  children,
}) => {
  const { authenticated } = useSelector((state: RootState) => state.auth);
  const history = useHistory();

  useEffect(() => {
    if (!authenticated) {
      history.push('/login');
    }
  }, [authenticated, history]);

  return (
    <Route path={path} exact={exact}>
      {children}
    </Route>
  );
};

const routes = (
  <React.Fragment>
    <GlobalStyles />
    <Navbar theme={themes.default} />
    <Suspense fallback={<Loader />}>
      <Switch>
        <ProtectedRoute path="/" exact={true}>
          <Home />
        </ProtectedRoute>
        <Route path="/login" exact={true}>
          <Login />
        </Route>
        <Route path="/signup" exact={true}>
          <Signup />
        </Route>
        <ProtectedRoute path="/create-story" exact={true}>
          <CreateStory />
        </ProtectedRoute>
        <ProtectedRoute path="/stories/:id" exact={true}>
          <SingleStory />
        </ProtectedRoute>
      </Switch>
    </Suspense>
  </React.Fragment>
);

export default routes;
