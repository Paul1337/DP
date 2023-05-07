import { createAction, createReducer } from '@reduxjs/toolkit';
import { DimentionType } from '../model/dimention.js';
import dpSolver from '../model/dpSolver.js';
import { debounce } from '../utils/debounce.js';

const initialState = {
    controls: {
        dimention: DimentionType.one.value,
        fieldSize: [0],
        name: '',
    },
    code: '',
    field: [],
    data: [],
    savedAlgos: [],
};

export const updateDimentionAction = createAction('controls/updateDimention');
export const updateFieldSizeAction = createAction('controls/updateFieldSize');
export const updateFieldItemAction = createAction('field/updateItem');
export const updateCodeAction = createAction('code/update');
export const parseCodeAction = createAction('code/parse');
export const updateNameAction = createAction('name/update');
export const addSavedAlgoAction = createAction('algo/save');

const rootReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(updateDimentionAction, (state, action) => {
            state.controls.dimention = action.payload;
            if (state.controls.fieldSize.length < action.payload) {
                const times = action.payload - state.controls.fieldSize.length;
                for (let i = 0; i < times; i++) {
                    state.controls.fieldSize.push(0);
                }
            } else {
                state.controls.fieldSize.splice(action.payload);
            }

            for (let i = 0; i < state.controls.fieldSize.length; i++) {
                state.controls.fieldSize[i] = 0;
            }

            state.field = [];
            state.code = '';
        })
        .addCase(updateCodeAction, (state, action) => {
            state.code = action.payload;
        })
        .addCase(updateFieldSizeAction, (state, action) => {
            state.controls.fieldSize[action.payload.dimention] = action.payload.value;

            const size = state.controls.fieldSize;

            if (state.controls.dimention == DimentionType.one.value) {
                if (size[0] > state.field.length) {
                    for (let i = state.field.length; i < size[0]; i++) state.field.push(0);
                } else {
                    state.field.splice(size[0]);
                }
            } else if (state.controls.dimention == DimentionType.two.value) {
                if (size[0] > state.field.length) {
                    for (let i = state.field.length; i < size[0]; i++) {
                        state.field.push(new Array(size[1]).fill(0));
                    }
                } else {
                    state.field.splice(size[0]);
                }

                for (let i = 0; i < state.field.length; i++) {
                    if (size[1] > state.field[i].length) {
                        for (let j = state.field[i].length; j < size[1]; j++) {
                            state.field[i].push(0);
                        }
                    } else {
                        state.field[i].splice(size[1]);
                    }
                }
            }

            dpSolver.solve(state.field, state.controls, state.code);
        })
        .addCase(updateFieldItemAction, (state, action) => {
            const item = action.payload;
            if (state.controls.dimention == DimentionType.one.value) {
                state.field[item.i] = item.value;
            } else if (state.controls.dimention == DimentionType.two.value) {
                state.field[item.i][item.j] = item.value;
            }
        })
        .addCase(parseCodeAction, (state, action) => {
            dpSolver.solve(state.field, state.controls, state.code);
        })
        .addCase(updateNameAction, (state, action) => {
            state.controls.name = action.payload;
        })
        .addCase(addSavedAlgoAction, (state, action) => {
            if (!state.savedAlgos.includes(action.payload)) {
                state.savedAlgos.push(action.payload);
            }
        });
});

export default rootReducer;
