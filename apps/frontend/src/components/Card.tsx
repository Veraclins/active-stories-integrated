import React from 'react';
import styled from 'styled-components';

import { white, dark } from 'styles/colors';
import { rem } from 'styles';

interface CardProps {
  small?: boolean;
  align?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const Card: React.FunctionComponent<CardProps> = ({
  children,
  small,
  align,
  onClick,
}) => {
  return (
    <StyledCard align={align} small={small} onClick={onClick}>
      {children}
    </StyledCard>
  );
};

const StyledCard = styled.div<Partial<CardProps>>`
  margin: ${rem(10)};
  padding: ${rem(16)} ${rem(20)};
  background: ${white};
  width: ${({ small }) => (small ? rem(240) : '100%')};
  max-width: ${rem(400)};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${({ align }) => (align ? align : 'flex-start')};
  box-shadow: 0 ${rem(2)} ${rem(6)} ${rem(-2)} ${dark};
  cursor: pointer;

  &:hover {
    box-shadow: 0 ${rem(2)} ${rem(10)} ${rem(-2)} ${dark};
  }

  @media screen and (max-width: ${rem(480)}) {
    width: 100%;
    margin: ${rem(10)} 0;
    padding: ${rem(10)};
  }
`;

export default Card;
