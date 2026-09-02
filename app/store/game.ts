import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { questions } from '~/quiz';
import * as quiz from '~/quiz/engine';
import type { Question, Rating } from '~/types';

const initialCategories = questions.map(({ category }) => category);

export interface GameState {
  streak: number;
  rating?: Rating;
  question: Question;
  questionCategories: string[];
}

const initialState = {
  streak: 0,
  question: quiz.getRandomQuestion(initialCategories),
  questionCategories: initialCategories,
} satisfies GameState as GameState;

export const { actions, reducer } = createSlice({
  name: 'game',
  initialState,
  reducers: {
    changeQuestionCategories(state, action: PayloadAction<string[]>) {
      state.questionCategories = action.payload;
      if (!state.questionCategories.includes(state.question.category)) {
        state.rating = undefined;
        state.question = quiz.getRandomQuestion(
          state.questionCategories,
          state.question.state
        ); // TODO re-use next question
      }
    },
    nextQuestion(state) {
      state.rating = undefined;
      state.question = quiz.getRandomQuestion(
        state.questionCategories,
        state.question.state
      );
    },
    giveUp(state) {
      state.rating = quiz.giveUp(state);
      state.streak = 0;
    },
    answer(state, action: PayloadAction<string>) {
      state.rating = quiz.rate(state, action.payload);
      if (state.rating.incorrect) {
        state.streak = 0;
      } else {
        state.streak += 1;
      }
    },
  },
});
