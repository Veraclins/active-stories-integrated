import React, { useEffect, useState } from 'react';
import { useAxios } from 'helpers/hooks';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/rootReducer';
import { Story, User } from 'state/interfaces';
import styled from 'styled-components';
import { rem } from 'styles';
import StoryCard from 'components/StoryCard';
import { setStories } from 'state/story';
import { dark } from 'styles/colors';

const filterStories = (stories: Story[], user: User) => {
  if (user.userRole === 'Admin') {
    return stories;
  }
  return stories.filter(story => story.createdBy.id === user.id);
};

const Home: React.FunctionComponent = () => {
  const { stories } = useSelector((state: RootState) => state.story);

  const { user } = useSelector((state: RootState) => state.auth);

  const [filteredStories, setFilteredStories] = useState(stories);
  const dispatch = useDispatch();

  const loadedStories = useAxios(
    {
      url: 'getStories',
      dispatch,
    },
    []
  );
  useEffect(() => {
    dispatch(setStories(loadedStories));
  }, [loadedStories, dispatch]);

  useEffect(() => {
    setFilteredStories(filterStories(stories, user as User));
  }, [stories, user]);
  return (
    <Container>
      {filteredStories.length ? (
        <Heading>
          {user?.userRole === 'Admin'
            ? 'Here are all the available stories'
            : 'Here are all your stories'}
        </Heading>
      ) : (
        <Heading>
          {user?.userRole === 'Admin'
            ? 'No stories available yet'
            : 'You have not created any stories yet'}
        </Heading>
      )}
      {filteredStories.map((story, index) => (
        <StoryCard key={index} story={story} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  margin: ${rem(20)} auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
`;

const Heading = styled.div`
  display: flex;
  margin: ${rem(20)} auto;
  box-sizing: border-box;
  font-weight: bold;
  justify-content: center;
  width: 100%;
  font-size: ${rem(40)};
  color: ${dark};
`;

export default Home;
