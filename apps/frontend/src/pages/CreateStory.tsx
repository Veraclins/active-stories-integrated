import Form from 'components/Form';
import Input from 'components/Input';
import Select from 'components/Select';
import Textarea from 'components/Textarea';
import { useForm } from 'helpers/hooks';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { callAPI } from 'services/api';
import { changeLoadingState, setError } from 'state/status';
import { RootState } from 'store/rootReducer';
import styled from 'styled-components';
import { rem } from 'styles';
import { dark } from 'styles/colors';

const CreateStory: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState('');
  const storyTypes = [
    {
      value: '',
      label: 'Select a type',
    },
    {
      value: 'enhancement',
      label: 'Enhancement',
    },
    {
      value: 'bugfix',
      label: 'Bug fix',
    },
    {
      value: 'development',
      label: 'Development',
    },
    {
      value: 'qa',
      label: 'Quality Assurance',
    },
    {
      value: 'feature',
      label: 'Feature',
    },
  ];
  const storyComplexity = [
    {
      value: '',
      label: 'Select a complexity level',
    },
    {
      value: 'low',
      label: 'Low',
    },
    {
      value: 'mild',
      label: 'Mild',
    },
    {
      value: 'high',
      label: 'High',
    },
  ];

  const { error } = useSelector((state: RootState) => state.status);

  useEffect(() => {
    setErrors(error);
  }, [error]);

  const submit = async (data: any) => {
    try {
      dispatch(changeLoadingState(true));
      await callAPI({ url: 'createStory', method: 'post', data, dispatch });
      history.push('/');
    } catch (err) {
      dispatch(setError(err));
    } finally {
      dispatch(changeLoadingState(false));
    }
  };

  const { values, handleChange, handleSubmit } = useForm(
    {
      summary: '',
      description: '',
      type: '',
      cost: '',
      complexity: '',
      estimatedHrs: '',
    },
    submit
  );

  return (
    <Container>
      <Form
        onSubmit={handleSubmit}
        onFocus={() => setErrors('')}
        title="Create a story"
        submitText="Create"
        errors={errors}
      >
        <StoryInput
          value={values.summary}
          required
          name="summary"
          placeholder="Story Summary"
          alignment="left"
          onChange={handleChange}
        />
        <StoryText
          value={values.description}
          required
          name="description"
          placeholder="Detailed description of the story"
          onChange={handleChange}
        />
        <StorySelect
          value={values.type}
          required
          options={storyTypes}
          name="type"
          placeholder="Story type"
          onChange={handleChange}
        />
        <StorySelect
          value={values.complexity}
          required
          options={storyComplexity}
          name="complexity"
          placeholder="Story complexity"
          onChange={handleChange}
        />
        <StoryInput
          value={values.estimatedHrs}
          type="number"
          required
          name="estimatedHrs"
          placeholder="Estimated time of completion (in hours)"
          alignment="left"
          onChange={handleChange}
        />
        <React.Fragment>
          <StoryInput
            value={values.cost}
            type="number"
            required
            name="cost"
            placeholder="Story cost"
            alignment="left"
            leftIcon="$"
            onChange={handleChange}
          />
        </React.Fragment>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  margin: ${rem(20)} auto;
  padding: 0 ${rem(10)};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  color: ${dark};
  max-width: ${rem(500)};
  border-radius: ${rem(20)};
  box-shadow: 0 ${rem(2)} ${rem(6)} ${rem(-2)} ${dark};
  width: 100%;
`;

const StoryInput = styled(Input)`
  margin: ${rem(5)};
  padding-top: ${rem(15)};
  padding-bottom: ${rem(15)};
  border-radius: ${rem(8)};
  align-items: center;
`;

const StoryText = styled(Textarea)`
  margin: ${rem(5)} 0;
  padding: ${rem(15)} ${rem(20)};
  border-radius: ${rem(8)};
  align-items: center;
`;

const StorySelect = styled(Select)`
  margin: ${rem(5)} 0;
  padding: ${rem(15)} ${rem(20)};
  border-radius: ${rem(8)};
  align-items: center;
`;

export default CreateStory;
