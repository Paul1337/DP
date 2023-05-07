import { useState } from 'react';
import Controls from './components/Controls/Controls.jsx';
import MainView from './components/MainView/MainView.jsx';
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
                <MainView />
                <CodeArea />
            </div>
        </>
    );
}

export default App;
