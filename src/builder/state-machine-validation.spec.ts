/* eslint-disable @typescript-eslint/no-explicit-any */
import * as StateMachineValidation from './state-machine-validation';
import { StateMachineConfig } from './state-machine-config';
import {
  undefinedTestCase,
  nullTestCase,
  emptyArrayTestCase,
  emptyStringTestCase,
} from './state-machine-state-validation.utils';

describe('State machine configuration validation', () => {
  describe('No configuration', () => {
    [undefinedTestCase, nullTestCase].forEach((testCase) => {
      it(`When ${testCase.id} is passed as configuration, should fail validation`, () => {
        const errors = StateMachineValidation.validateConfiguration(undefined as any);

        expect(errors).toBeDefined();
        expect(errors.length).toBe(1);
        expect(errors[0]).toBe(StateMachineValidation.NO_CONFIG_ERROR);
      });
    });
  });

  describe('No states', () => {
    [nullTestCase, undefinedTestCase, { value: 'string', id: 'non array' }, emptyArrayTestCase].forEach((testCase) => {
      it(`When contains ${testCase.id} state, should fail validation`, () => {
        const config: StateMachineConfig<void> = {
          states: testCase.value as any,
          initialState: '',
        };

        const errors = StateMachineValidation.validateConfiguration(config);

        expect(errors).toBeDefined();
        expect(errors.length).toBe(1);
        expect(errors[0]).toBe(StateMachineValidation.NO_STATES_ERROR);
      });
    });
  });

  describe('Invalid inital state', () => {
    [undefinedTestCase, nullTestCase, emptyStringTestCase].forEach((testCase) => {
      it(`When providing ${testCase.id} initial state, should fail validation`, () => {
        const config: StateMachineConfig<void> = {
          states: [
            {
              type: 'interim',
              name: 'stateA',
              transitions: [
                {
                  onEvent: 'progress',
                  target: 'stateB',
                },
              ],
            },
            {
              type: 'end',
              name: 'stateB',
            },
          ],
          initialState: testCase.value as any,
        };

        const errors = StateMachineValidation.validateConfiguration(config);

        expect(errors).toBeDefined();
        expect(errors.length).toBe(1);
        expect(errors[0]).toBe(StateMachineValidation.INITIAL_STATE_NOT_DEFINED_ERROR);
      });
    });

    it('When initial state is not defined in the states, should fail validation', () => {
      const config: StateMachineConfig<void> = {
        states: [
          {
            type: 'interim',
            name: 'stateA',
            transitions: [
              {
                onEvent: 'progress',
                target: 'stateB',
              },
            ],
          },
          {
            type: 'end',
            name: 'stateB',
          },
        ],
        initialState: 'stateZ',
      };

      const errors = StateMachineValidation.validateConfiguration(config);

      expect(errors).toBeDefined();
      expect(errors.length).toBe(1);
      expect(errors[0]).toBe(StateMachineValidation.INVALID_INITIAL_STATE_ERROR);
    });
  });
});
