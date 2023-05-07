import React from 'react';
import styles from './CodeArea.module.css';
import { Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { parseCodeAction, updateCodeAction } from '../../redux/reducers/rootReducer.js';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { saveCodeThunkAction } from '../../redux/thunks/codeHandling.js';

const CodeArea = () => {
    const controls = useSelector((state) => state.controls);
    const code = useSelector((state) => state.code);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        dispatch(updateCodeAction(e.target.value));
    };

    const handleRun = (e) => {
        dispatch(parseCodeAction());
    };

    const handleSave = (e) => {
        dispatch(saveCodeThunkAction());
    };

    return (
        <div className={styles.codeArea}>
            <CodeEditor
                value={code}
                language='js'
                placeholder='Напишите здесь код пересчёта для ДП'
                onChange={handleChange}
                padding={15}
                style={{
                    fontSize: 14,
                    backgroundColor: '#f5f5f5',
                    fontFamily:
                        'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                }}
            />
            <Button variant='outlined' fullWidth={false} onClick={handleRun}>
                исполнить
            </Button>
            <Button
                variant='outlined'
                style={{ margin: '10px' }}
                fullWidth={false}
                disabled={!controls.name || !code}
                onClick={handleSave}
            >
                сохранить
            </Button>
        </div>
    );
};

export default CodeArea;
