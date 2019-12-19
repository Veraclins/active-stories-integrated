import React from 'react';
import styled from 'styled-components';

import { rem } from 'styles';
import { dark, white } from 'styles/colors';

interface CheckboxProps {
  checked: boolean;
  label?: string;
  name: string;
  required?: boolean;
  className?: string;
  background?: string;
  color?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent) => void;
}

const Checkbox: React.FunctionComponent<CheckboxProps> = ({
  checked,
  name,
  required,
  color,
  label,
  onChange,
  onKeyPress,
  background = white,
  className,
}) => {
  return (
    <Container color={color}>
      <StyledCheckbox
        type="checkbox"
        checked={checked}
        name={name}
        className={className}
        background={background}
        color={color}
        required={required}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      {label && (
        <Label>
          {label} {required && <span>*</span>}
        </Label>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 0 ${rem(10)};
  display: flex;
  flex-direction: row;
  color: ${({ color }) => (color ? color : dark)};
  width: 100%;
  align-items: center;
`;

const Label = styled.label`
  color: ${({ color }) => (color ? color : 'inherit')};
  text-align: left;
  width: 100%;
  align-items: center;
`;

export const StyledCheckbox = styled.input<Partial<CheckboxProps>>`
  margin: ${rem(6)} ${rem(20)};
  box-sizing: border-box;
  border-radius: ${rem(10)};
  outline: none;
  color: ${({ color }) => (color ? color : 'inherit')};
  font-family: 'Open Sans', 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
  text-align: center;
`;

export default Checkbox;
