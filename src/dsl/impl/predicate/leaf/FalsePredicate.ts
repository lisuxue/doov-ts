import { StepCondition } from '../../../lang/StepCondition';

export class FalsePredicate implements StepCondition {
  getPredicate = () => () => false;
}
