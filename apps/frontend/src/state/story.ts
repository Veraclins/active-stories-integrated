import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Story } from 'state/interfaces';

type CurrentStoryState = {
  stories: Story[];
  current: Story | null;
};

const initialState: CurrentStoryState = {
  stories: [],
  current: null,
};

const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    setStories(state, action: PayloadAction<Story[]>) {
      // 'getStories' seems to return stories without ids. I need a way of uniquely identifying stories
      let tempId = 0;
      let newStory: Story;
      state.stories = action.payload.map(story => {
        tempId++;
        newStory = {
          ...story,
          id: story.id ? story.id : tempId,
        };
        return newStory;
      });
    },
    setCurrentStory(state, action: PayloadAction<Story>) {
      state.current = action.payload;
    },
  },
});

export const { setStories, setCurrentStory } = storySlice.actions;

export default storySlice.reducer;
