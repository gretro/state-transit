import { StateMachineConfig } from './state-machine-config';
import {
  State,
  InterimState,
  Transition,
  ChoiceState,
  Guard,
  EndState,
} from '../models';

// TODO: Unit test this validation
export function validateConfiguration(
  config: StateMachineConfig<unknown>
): string[] {
  const errors = [];

  if (!config) {
    errors.push('No configuration provided');
    return errors;
  }

  if (!config.states || config.states.length === 0) {
    errors.push('No states were provided in the configuration');
    return errors;
  }

  if (config.initialState) {
    const hasValidInitialState = config.states.some(
      (state) => state.name === config.initialState
    );

    if (!hasValidInitialState) {
      errors.push('Initial state is not a valid state');
    }
  } else {
    if (config.autoStart) {
      errors.push(
        'Cannot auto start state machine as no initial state was defined'
      );
    }
  }

  const allStateNames = config.states.map((state) => state.name);
  config.states.forEach((state) => {
    const stateErrors = validateStateConfiguration(state, allStateNames);
    errors.push(...stateErrors);
  });

  return errors;
}

function validateStateConfiguration(
  state: State<unknown>,
  allStateNames: string[]
): string[] {
  if (!state || typeof state !== 'object') {
    return ['Invalid state'];
  }

  const stateName = state.name || '<undefined>';
  const errors: string[] = [];

  if (!state.name) {
    errors.push('State name not defined');
  }

  if (!state.type) {
    errors.push('Type not defined');
  }

  if (state.onEnter && typeof state.onEnter !== 'function') {
    errors.push('onEnter is not a function');
  }

  if (state.onLeave && typeof state.onLeave !== 'function') {
    errors.push('onLeave is not a function');
  }

  switch (state.type) {
    case 'interim': {
      const interimErrors = validateInterimState(state, allStateNames);
      errors.push(...interimErrors);
      break;
    }

    case 'choice': {
      const choiceErrors = validateChoiceState(state, allStateNames);
      errors.push(...choiceErrors);
      break;
    }

    case 'end': {
      const endErrors = validateEndErrors(state);
      errors.push(...endErrors);
      break;
    }

    default:
      errors.push(`Unknown state type`);
      break;
  }

  return errors.map((error) => `[State ${stateName}] ${error}`);
}

function validateInterimState(
  interimState: InterimState<unknown>,
  allStateNames: string[]
): string[] {
  const errors: string[] = [];

  if (!interimState.transitions || interimState.transitions.length === 0) {
    errors.push('No events set up');
  }

  interimState.transitions.forEach((transition) => {
    const transitionName = `${transition.source} -> ${transition.target}`;
    const transitionErrors = validateInterimTransition(
      transition,
      allStateNames
    );

    transitionErrors.forEach((transitError) => {
      errors.push(`[Transition ${transitionName}] ${transitError}`);
    });
  });

  return errors.map((err) => `[State ${interimState.name}] ${err}`);
}

function validateInterimTransition(
  transition: Transition<unknown>,
  allStateNames: string[]
): string[] {
  const errors: string[] = [];

  if (!transition || typeof transition !== 'object') {
    errors.push('Invalid Transition');
    return errors;
  }

  if (!transition.onEvent) {
    errors.push('onEvent must be defined');
  }

  const sourceIndex = allStateNames.indexOf(transition.source);
  if (sourceIndex < 0) {
    errors.push('Invalid source on transition');
  }

  const targetIndex = allStateNames.indexOf(transition.target);
  if (targetIndex < 0) {
    errors.push(`Invalid target on transition`);
  }

  if (
    transition.onSuccessAction &&
    typeof transition.onSuccessAction !== 'function'
  ) {
    errors.push('onSuccessAction is defined, but is not a function');
  }

  if (transition.guards && transition.guards.length > 0) {
    transition.guards.forEach((guard) => {
      const guardErrors = validateGuard(guard);
      errors.push(...guardErrors);
    });
  } else {
    if (transition.beforeGuardsAction) {
      errors.push('beforeGuardsActions is defined, but no guards were');
    }
  }

  return errors;
}

function validateGuard(guard: Guard<unknown>): string[] {
  const errors: string[] = [];
  if (!guard || typeof guard !== 'object') {
    return ['Invalid guard'];
  }

  if (!guard.id) {
    errors.push(`Guard Id is undefined`);
  }

  const guardId = guard.id;

  if (guard.type !== 'light' && guard.type !== 'full') {
    errors.push(`Type must be light or full"`);
  }

  if (!guard.evaluate) {
    errors.push(`Evaluate must be defined`);
  } else if (typeof guard.evaluate !== 'function') {
    errors.push(`Evaluate must be a function`);
  }

  return errors.map((err) => `[Guard "${guardId}"] ${err}`);
}

function validateChoiceState(
  choiceState: ChoiceState<unknown>,
  allStateNames: string[]
): string[] {
  const errors: string[] = [];

  if (choiceState.choices && choiceState.choices.length > 0) {
    choiceState.choices.forEach((choice, index) => {
      if (!choice || typeof choice !== 'object') {
        errors.push('Invalid choice');
        return;
      }

      const prefix = `[Choice ${choice.target}]`;

      if (!choice.target) {
        errors.push(`${prefix} Choice has no target`);
      }

      const choiceTargetIndex = allStateNames.indexOf(choice.target);
      if (choiceTargetIndex < 0) {
        errors.push(`${prefix} Target is not a valid state`);
      }

      const isLastItem = index === choiceState.choices.length - 1;

      if (choice.guard) {
        const guardErrors = validateGuard(choice.guard);
        errors.push(...guardErrors.map((err) => `${prefix} ${err}`));

        if (isLastItem) {
          errors.push('No fallback choice with no guard');
        }
      } else if (!isLastItem) {
        errors.push(
          'Fallback choice (no guard) is not the last choice. All other choices are unreachable'
        );
      }
    });
  } else {
    errors.push('No choices are defined');
  }

  return errors;
}

function validateEndErrors(endState: EndState<unknown>): string[] {
  const errors: string[] = [];

  if (endState.onLeave) {
    errors.push('onLeave must be undefined');
  }

  return errors;
}
