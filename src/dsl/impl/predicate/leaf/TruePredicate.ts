import { StepCondition } from '../../../lang/StepCondition';

export class TruePredicate implements StepCondition {
  getPredicate = () => () => true;
}
