import { createAction, createReducer } from '@reduxjs/toolkit';
import { DimentionType } from '../model/dimention.js';
import dpSolver from '../model/dpSolver.js';
import { debounce } from '../utils/debounce.js';
import { updateTable } from '../model/table.js';

const initialState = {
    controls: {
        dimention: DimentionType.one.value,
        fieldSize: [0],
        name: '',
    },
    code: '',
    field: [],
    extraData: {
        dimention: DimentionType.two.value,
        // data: [],
        data: [
            [31, 30, 28, 28, 27, 26, 26, 25, 24, 24, 23],
            [8, 9, 9, 10, 10, 10, 11, 12, 14, 16, 18],
        ],
        size: [2, 11],
    },
    savedAlgos: [],
};

updateTable(initialState.extraData.data, initialState.extraData.size);

export const updateDimentionAction = createAction('controls/updateDimention');
export const updateFieldSizeAction = createAction('controls/updateFieldSize');
export const updateFieldItemAction = createAction('field/updateItem');
export const updateCodeAction = createAction('code/update');
export const parseCodeAction = createAction('code/parse');
export const updateNameAction = createAction('name/update');
export const addSavedAlgoAction = createAction('algo/save');
export const updateExtraDataItemAction = createAction('extraData/updateItem');
export const updateExtraDataSizeAction = createAction('extraData/updateSize');

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
                updateTable(state.field, size);
            }

            dpSolver.solve(state.field, state.controls, state.extraData, state.code);
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
            dpSolver.solve(state.field, state.controls, state.extraData, state.code);
        })
        .addCase(updateNameAction, (state, action) => {
            state.controls.name = action.payload;
        })
        .addCase(addSavedAlgoAction, (state, action) => {
            if (!state.savedAlgos.includes(action.payload)) {
                state.savedAlgos.push(action.payload);
            }
        })
        .addCase(updateExtraDataItemAction, (state, action) => {
            const i = action.payload.i;
            const j = action.payload.j;
            const value = action.payload.value;
            state.extraData.data[i][j] = action.payload.value;
        })
        .addCase(updateExtraDataSizeAction, (state, action) => {
            state.extraData.size[action.payload.dimention] = action.payload.value;
            updateTable(state.extraData.data, state.extraData.size);
        });
});

export default rootReducer;
