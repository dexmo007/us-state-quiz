export interface State {
  name: string;
  abbreviation: string;
  capital: string;
  biggestCity: string;
}

export type QuestionInputType = 'TEXT' | 'MAP' | 'MAP_TEXT';

export interface QuestionSpec {
  category: string;
  displayName: string;
  description: string;
  inputType?: QuestionInputType;
  answerField: keyof State;
  getMessage: (state: State) => string;
}

export type Question = Omit<QuestionSpec, 'getMessage'> & {
  id: number;
  state: State;
  inputType: QuestionInputType;
  message: string;
  correctAnswer: string;
};

export type ResultType = 'correct' | 'gave_up' | 'almost' | 'wrong';

export interface Rating {
  result: ResultType;
  resolved: boolean;
  incorrect: boolean;
  emoji: string;
  message: string;
  component: string;
  distance?: number;
}
