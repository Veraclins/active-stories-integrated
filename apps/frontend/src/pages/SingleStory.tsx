import Button from 'components/Button';
import { useAxios } from 'helpers/hooks';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { callAPI } from 'services/api';
import { setCurrentStory } from 'state/story';
import { AppDispatch } from 'store';
import { RootState } from 'store/rootReducer';
import styled from 'styled-components';
import { rem } from 'styles';
import { brand, brandGreen, dark, lightGrey } from 'styles/colors';

const changeStatus = async (
  storyId: number,
  status: string,
  dispatch: AppDispatch,
  history: any
) => {
  await callAPI({
    url: `updateStory/${storyId}`,
    data: { status },
    dispatch,
    method: 'put',
  });
  history.push('/');
};

const SingleStory: React.FunctionComponent = () => {
  const { current: story } = useSelector((state: RootState) => state.story);
  const { user } = useSelector((state: RootState) => state.auth);

  interface RouteParams {
    id: string;
  }
  const params = useParams<RouteParams>();
  const dispatch = useDispatch();
  const history = useHistory();

  const loadedStory = useAxios(
    {
      url: `getStory/${Number(params.id)}`,
      dispatch,
    },
    story
  );

  useEffect(() => {
    dispatch(setCurrentStory(loadedStory));
  }, [loadedStory, dispatch]);

  return (
    <React.Fragment>
      {story ? (
        <Container>
          <Field>
            <Label>Summary:</Label>
            <Text> {story.summary}</Text>
          </Field>
          <Field>
            <Label>Description:</Label>
            <Text> {story.description}</Text>
          </Field>
          <Field>
            <Label>Type:</Label>
            <Text> {story.type}</Text>
          </Field>
          <Field>
            <Label>Cost:</Label>
            <Text>${story.cost}</Text>
          </Field>
          <Field>
            <Label>Complexity:</Label>
            <Text>{story.complexity}</Text>
          </Field>
          <Field>
            <Label>Estimated Time:</Label>
            <Text>{story.estimatedHrs} hr(s)</Text>
          </Field>
          <Field>
            <Label>Status:</Label>
            <Text>{story.status}</Text>
          </Field>
          {user?.userRole && user.userRole === 'Admin' && (
            <Footer>
              <Button
                onClick={() =>
                  changeStatus(story.id, 'rejected', dispatch, history)
                }
              >
                Reject
              </Button>
              {story.status !== 'approved' && (
                <Button
                  background={brandGreen}
                  onClick={() =>
                    changeStatus(story.id, 'approved', dispatch, history)
                  }
                >
                  Approve
                </Button>
              )}
            </Footer>
          )}
        </Container>
      ) : (
        <Container>
          <NotFound>
            This story was not found. Please check ID and try again!
          </NotFound>
        </Container>
      )}
    </React.Fragment>
  );
};

const Container = styled.div`
  margin: ${rem(50)} auto;
  padding: ${rem(20)} ${rem(40)};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: flex-start;
  justify-content: center;
  color: ${dark};
  max-width: ${rem(600)};
  max-height: 90%;
  min-height: ${rem(400)};
  border-radius: ${rem(20)};
  box-shadow: 0 ${rem(2)} ${rem(6)} ${rem(-2)} ${dark};
  width: 100%;
`;

const NotFound = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${brand};
  font-size: ${rem(40)};
  font-weight: bold;
  line-height: ${rem(60)};
  text-align: center;
  width: 100%;
`;

const Label = styled.div`
  display: flex;
  box-sizing: border-box;
  min-width: ${rem(130)};
  font-weight: bold;
  color: ${dark};
`;

const Field = styled.div`
  padding: ${rem(10)} 0;
  display: flex;
  box-sizing: border-box;
  border-bottom: ${rem(1)} solid ${lightGrey};
  width: 100%;
`;

const Text = styled.div`
  margin-left: ${rem(10)};
`;

const Footer = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  margin-top: ${rem(8)};
  width: 100%;
  flex-wrap: wrap;
`;

export default SingleStory;
