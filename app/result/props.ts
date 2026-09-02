import type { InputComponent } from '~/components/input';
import type { Question, Rating } from '~/types';

export default interface ResultProps {
  question: Question;
  rating: Rating;
  quizInput: InputComponent;
}
