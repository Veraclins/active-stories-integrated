import React from 'react';
import styled from 'styled-components';
import { History } from 'history';
import { useHistory } from 'react-router-dom';

import Card from 'components/Card';
import { Story } from 'state/interfaces';
import { rem } from 'styles';
import { dark } from 'styles/colors';
import Button from './Button';

interface StoryProps {
  story: Story;
}

const openStory = (history: History, id: number) => {
  return history.push(`/stories/${id}`);
};

const StoryCard: React.FunctionComponent<StoryProps> = ({ story }) => {
  const history = useHistory();

  return (
    <Card align="center">
      <Summary>{story.summary}</Summary>
      <Description>{`${story.description.substring(0, 60)}...`}</Description>
      <Button onClick={() => openStory(history, story.id)}>View Details</Button>
    </Card>
  );
};

const Summary = styled.div`
  margin: ${rem(20)} 0;
  display: flex;
  box-sizing: border-box;
  font-weight: bold;
  align-items: center;
  color: ${dark};
`;

const Description = styled.div`
  font-style: italic;
  text-align: center;
`;

export default StoryCard;
