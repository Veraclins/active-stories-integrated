import React from 'react';
import styled from 'styled-components';

import { rem } from 'styles';
import { brand, white, dark, lightGrey } from 'styles/colors';

interface ButtonProps {
  large?: boolean;
  className?: string;
  background?: string;
  value?: string;
  type?: 'button' | 'reset' | 'submit' | undefined;
  light?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const Button: React.FunctionComponent<ButtonProps> = ({
  large,
  onClick,
  children,
  className,
  background,
  light,
  type = 'button',
  disabled,
}) => (
  <StyledButton
    onClick={onClick}
    large={large}
    className={className}
    background={background}
    type={type}
    light={light}
    disabled={disabled}
  >
    {children}
  </StyledButton>
);

const StyledButton = styled.button<ButtonProps>`
  margin: ${rem(20)} auto;
  padding: ${({ large }) =>
    large ? `${rem(20)} ${rem(70)}` : `${rem(15)} ${rem(40)}`};
  display: flex;
  outline: none;
  box-sizing: border-box;
  background: ${({ background, light }) =>
    background ? background : light ? white : brand};
  border-radius: ${rem(50)};
  color: ${({ light }) => (light ? brand : white)};
  font-weight: bold;
  border: none;
  align-items: center;
  cursor: pointer;
  justify-content: center;

  &:disabled {
    background: ${lightGrey};
    cursor: not-allowed;
    color: ${dark};
  }
`;

export default Button;
