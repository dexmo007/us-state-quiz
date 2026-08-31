import type { Question, Rating } from '../../types';

export default interface InputProps {
  onSubmit(value: string): void;
  rating?: Rating;
  question: Question;
}
