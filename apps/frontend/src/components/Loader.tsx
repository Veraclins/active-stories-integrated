import React from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';

import { white, lighten } from 'styles/colors';
import { rem } from 'styles';
import spinner from 'assets/spinner.svg';

const Loader: React.FunctionComponent = () => {
  return ReactDom.createPortal(
    <StyledLoader>
      <img src={spinner} alt="loading........" />
    </StyledLoader>,
    document.body
  );
};

const StyledLoader = styled.div`
  z-index: 10;
  text-align: center;
  padding: ${rem(14)};
  background: ${lighten(white, 0.5)};
  width: 100%;
  position: fixed;
  left: 50%;
  top: 50%;
  overflow-y: scroll;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  display: flex;
  height: 100%;
  opacity: 0.8;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Loader;
