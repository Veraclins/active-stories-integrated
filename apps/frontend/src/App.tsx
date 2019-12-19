import React from 'react';
import styled from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import routes from 'routes';
import Loader from 'components/Loader';
import { RootState } from 'store/rootReducer';
import { rem } from 'styles';

const App: React.FunctionComponent = () => {
  const { loading } = useSelector((state: RootState) => state.status);
  return (
    <MainContainer>
      <BrowserRouter>
        {routes}
        {loading && <Loader />}
      </BrowserRouter>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding-top: ${rem(80)};
  font-size: inherit;
  width: 100%;
  box-sizing: border-box;

  @media screen and (min-width: ${rem(480)}) {
    padding-top: ${rem(100)};
  }
`;
export default App;
