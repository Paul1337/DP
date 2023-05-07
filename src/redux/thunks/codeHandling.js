import { addSavedAlgoAction, parseCodeAction, updateCodeAction } from '../reducers/rootReducer.js';
import { debounce } from '../utils/debounce.js';

const debounceDelay = 2000;

const parseCodeActionDebounced = debounce((dispatch) => {
    dispatch(parseCodeAction());
}, debounceDelay);

export const parseCodeThunkAction = () => {
    return (dispatch, getState) => {
        parseCodeActionDebounced(dispatch);
    };
};

export const loadSavedAlgosThunkAction = () => {
    return (dispatch, getState) => {
        const items = { ...localStorage };
        for (let item in items) {
            if (item.startsWith('algo_')) {
                dispatch(addSavedAlgoAction(item.substring(5)));
            }
        }
    };
};

export const loadCodeThunkAction = (name) => {
    return (dispatch, getState) => {
        const code = localStorage.getItem('algo_' + name);
        if (code) dispatch(updateCodeAction(code));
    };
};

export const saveCodeThunkAction = () => {
    return (dispatch, getState) => {
        const state = getState();
        if (state.controls.name) {
            localStorage.setItem('algo_' + state.controls.name, state.code);
            dispatch(addSavedAlgoAction(state.controls.name));
        }
    };
};
