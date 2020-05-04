/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  undefinedTestCase,
  nullTestCase,
  emptyStringTestCase,
  emptyArrayTestCase,
  emptyFunctionTestCase,
  emptyObjectTestCase,
} from './state-machine-state-validation.utils';
import * as StateMachineValidation from './state-machine-validation';
import { StateMachineConfig } from './state-machine-config';

describe('State machine configuration validation', () => {
  describe('Invalid state configuration', () => {
    [undefinedTestCase, nullTestCase, emptyStringTestCase, emptyArrayTestCase].map((testcase) => {
      it(`When ${testcase.id} is passed as a state, should fail validation`, () => {
        const config: StateMachineConfig<unknown> = {
          states: [
            {
              name: 'stateA',
              type: 'end',
            },
            testcase.value as any,
          ],
          initialState: 'stateA',
        };

        const errors = StateMachineValidation.validateConfiguration(config);

        expect(errors).toBeDefined();
        expect(errors.length).toBe(1);
        expect(errors[0]).toBe(StateMachineValidation.INVALID_STATE_TYPE_ERROR);
      });
    });
  });

  describe('State validation', () => {
    describe('Invalid state name', () => {
      [undefinedTestCase, nullTestCase, emptyStringTestCase, emptyArrayTestCase].map((testcase) => {
        it(`When ${testcase.id} is passed as state name, should fail validation`, () => {
          const config: StateMachineConfig<unknown> = {
            states: [
              {
                name: 'stateA',
                type: 'end',
              },
              {
                name: testcase.value as any,
                type: 'end',
              },
            ],
            initialState: 'stateA',
          };

          const errors = StateMachineValidation.validateConfiguration(config);

          expect(errors).toBeDefined();
          expect(errors.length).toBe(1);
          expect(errors[0]).toContain('<undefined>');
          expect(errors[0]).toContain(StateMachineValidation.STATE_NAME_UNDEFINED);
        });
      });
    });

    describe('State onEnter', () => {
      [undefinedTestCase, nullTestCase, emptyFunctionTestCase].map((testcase) => {
        it(`When ${testcase.id} is passed as onEnter, should not fail validation`, () => {
          const config: StateMachineConfig<unknown> = {
            states: [
              {
                name: 'stateA',
                type: 'end',
                onEnter: testcase.value as any,
              },
            ],
            initialState: 'stateA',
          };

          const errors = StateMachineValidation.validateConfiguration(config);

          expect(errors).toBeDefined();
          expect(errors.length).toBe(0);
        });
      });

      [emptyStringTestCase, emptyArrayTestCase, emptyObjectTestCase].map((testcase) => {
        it(`When ${testcase.id} is passed as onEnter, should fail validation`, () => {
          const config: StateMachineConfig<unknown> = {
            states: [
              {
                name: 'stateA',
                type: 'end',
                onEnter: testcase.value as any,
              },
            ],
            initialState: 'stateA',
          };

          const errors = StateMachineValidation.validateConfiguration(config);

          expect(errors).toBeDefined();
          expect(errors.length).toBe(1);
          expect(errors[0]).toContain('stateA');
          expect(errors[0]).toContain(StateMachineValidation.ON_ENTER_INVALID_TYPE_ERROR);
        });
      });
    });

    describe('State onLeave', () => {
      [undefinedTestCase, nullTestCase, emptyFunctionTestCase].map((testcase) => {
        it(`When ${testcase.id} is passed as onLeave, should not fail validation`, () => {
          const config: StateMachineConfig<unknown> = {
            states: [
              {
                name: 'stateA',
                type: 'interim',
                transitions: [
                  {
                    target: 'stateB',
                    onEvent: 'END',
                  },
                ],
                onLeave: testcase.value as any,
              },
              {
                name: 'stateB',
                type: 'end',
              },
            ],
            initialState: 'stateA',
          };

          const errors = StateMachineValidation.validateConfiguration(config);

          expect(errors).toBeDefined();
          expect(errors.length).toBe(0);
        });
      });

      [emptyStringTestCase, emptyArrayTestCase, emptyObjectTestCase].map((testcase) => {
        it(`When ${testcase.id} is passed as onLeave, should fail validation`, () => {
          const config: StateMachineConfig<unknown> = {
            states: [
              {
                name: 'stateA',
                type: 'interim',
                transitions: [
                  {
                    target: 'stateB',
                    onEvent: 'END',
                  },
                ],
                onLeave: testcase.value as any,
              },
              {
                name: 'stateB',
                type: 'end',
              },
            ],
            initialState: 'stateA',
          };

          const errors = StateMachineValidation.validateConfiguration(config);

          expect(errors).toBeDefined();
          expect(errors.length).toBe(1);
          expect(errors[0]).toContain('stateA');
          expect(errors[0]).toContain(StateMachineValidation.ON_LEAVE_INVALID_TYPE_ERROR);
        });
      });
    });
  });
});
