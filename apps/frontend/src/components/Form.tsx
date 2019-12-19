import React from 'react';
import styled from 'styled-components';
import { rem } from 'styles';
import { brand, white } from 'styles/colors';

interface FormProps {
  title?: string;
  submitText?: string;
  errors?: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onFocus?: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Form: React.FunctionComponent<FormProps> = ({
  title,
  errors,
  onSubmit,
  onFocus,
  submitText = 'Submit',
  children,
}) => {
  return (
    <Container>
      {title && <Title>{title}</Title>}
      <StyledForm errors={errors} onSubmit={onSubmit} onFocus={onFocus}>
        {children}
        {errors && <ErrorMessage>{errors}</ErrorMessage>}
        <Submit type="submit" value={submitText} />
      </StyledForm>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 ${rem(10)};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  color: ${({ color }) => (color ? color : 'inherit')};
  width: 100%;
`;

const StyledForm = styled.form<Partial<FormProps>>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: ${({ errors }) => (errors ? `${rem(1)} solid ${brand}` : 'none')};
  font-family: 'Open Sans', 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
  font-weight: bold;
  border-radius: ${rem(10)};
  width: 100%;
  padding: ${rem(8)};
  margin-bottom: ${rem(20)};

  &::placeholder {
    color: ${({ color }) => color};
    opacity: 0.6;
  }

  @media screen and (min-width: ${rem(480)}) {
    padding: ${rem(8)} ${rem(20)};
  }
`;

const Submit = styled.input`
  margin: ${rem(20)} auto;
  padding: ${rem(15)} ${rem(40)};
  display: flex;
  background: ${brand};
  border-radius: ${rem(50)};
  color: ${white};
  align-items: center;
  font-weight: bold;
  outline: none;
  justify-content: center;
`;

const ErrorMessage = styled.div`
  margin: ${rem(10)} auto;
  text-align: center;
  font-size: ${rem(12)};
  color: ${brand};
`;

const Title = styled.h2`
  margin: ${rem(20)} auto;
  display: flex;
  box-sizing: border-box;
  font-weight: bold;
  font-size: ${rem(30)};
  text-transform: uppercase;
  align-items: center;
`;

export default Form;
