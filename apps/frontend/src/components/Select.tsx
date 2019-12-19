import React from 'react';
import styled from 'styled-components';

import { rem } from 'styles';
import { lightGrey, lighten, white, fade, dark } from 'styles/colors';
import { FaCaretDown } from 'react-icons/fa';

interface SelectProps {
  type?: string;
  value: string;
  name: string;
  label?: string;
  placeholder: string;
  minLength?: number;
  required?: boolean;
  readOnly?: boolean;
  hasLeftIcon?: boolean;
  hasRightIcon?: boolean;
  className?: string;
  background?: string;
  borderless?: boolean;
  lightenBy?: number;
  color?: string;
  error?: string;
  options: any[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FunctionComponent<SelectProps> = ({
  type = 'text',
  value,
  name,
  label,
  hasLeftIcon,
  required,
  hasRightIcon,
  color,
  lightenBy,
  onChange,
  minLength,
  readOnly,
  background = white,
  borderless,
  placeholder,
  options,
  className,
}) => {
  return (
    <Container color={color}>
      {label && (
        <Label>
          {label} {required && <span>*</span>}
        </Label>
      )}
      <SelectContainer>
        <StyledSelect
          type={type}
          value={value}
          hasLeftIcon={hasLeftIcon}
          hasRightIcon={hasRightIcon}
          name={name}
          className={className}
          placeholder={placeholder}
          background={background}
          borderless={borderless}
          lightenBy={lightenBy}
          color={color}
          required={required}
          readOnly={readOnly}
          minLength={minLength}
          onChange={onChange}
        >
          {options.map(option => (
            <option value={option.value} key={option.label}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
        <SelectArrow>
          <FaCaretDown />
        </SelectArrow>
      </SelectContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 ${rem(10)};
  display: flex;
  flex-direction: column;
  color: ${({ color }) => (color ? color : 'inherit')};
  width: 100%;
  align-items: center;
`;

const Label = styled.label`
  color: ${({ color }) => (color ? color : 'inherit')};
  text-align: left;
  width: 100%;
  align-items: center;
`;

const StyledSelect = styled.select<Partial<SelectProps>>`
  appearance: none;
  padding: ${rem(6)} ${rem(20)};
  padding-left: ${({ hasLeftIcon }) => (hasLeftIcon ? rem(45) : rem(20))};
  padding-right: ${({ hasRightIcon }) => (hasRightIcon ? rem(45) : rem(20))};
  box-sizing: border-box;
  background: ${({ background, lightenBy }) =>
    lightenBy && background ? lighten(background, lightenBy) : background};
  border: ${({ background }) =>
    background === white ? `${rem(1)} solid ${fade(lightGrey, 0.9)}` : 'none'};
  border: ${({ borderless }) => borderless && 'none'};
  border-radius: ${rem(10)};
  outline: none;
  color: ${({ color }) => (color ? color : 'inherit')};
  font-family: 'Open Sans', 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
  text-align: center;
  width: 100%;

  &::placeholder {
    color: ${({ color }) => (color ? color : dark)};
    opacity: 0.6;
  }
`;

const SelectContainer = styled.div`
  width: 100%;
  position: relative;
`;

const SelectArrow = styled.div<Partial<SelectProps>>`
  position: absolute;
  right: ${rem(20)};
  top: 50%;
  transform: translateY(-50%);
`;

export default Select;
