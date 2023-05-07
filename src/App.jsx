import { useState } from 'react';
import Controls from './components/Controls/Controls.jsx';
import Field from './components/Field/Field.jsx';
import CodeArea from './components/CodeArea/CodeArea.jsx';
import { useDispatch } from 'react-redux';
import { loadSavedAlgosThunkAction } from './redux/thunks/codeHandling.js';

function App() {
    const dispatch = useDispatch();
    dispatch(loadSavedAlgosThunkAction());

    return (
        <>
            <div className='appCont'>
                <Controls />
                <Field />
                <CodeArea />
            </div>
        </>
    );
}

export default App;
