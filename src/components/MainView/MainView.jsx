import React, { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import CellsTab from './CellsTab.jsx';
import CalculationsTab from './CalculationsTab.jsx';
import DataTab from './DataTab.jsx';
import RepresentationTab from './RepresentationTab.jsx';

const ViewType = {
    Cells: 'Поле ячеек',
    Calculations: 'Вычисление',
    Data: 'Данные',
    Representation: 'Репрезентация данных',
};

const MainView = () => {
    const [viewType, setViewType] = useState(ViewType.Cells);

    const views = [
        {
            type: ViewType.Cells,
            element: <CellsTab />,
        },
        {
            type: ViewType.Calculations,
            element: <CalculationsTab />,
        },
        {
            type: ViewType.Data,
            element: <DataTab />,
        },
        {
            type: ViewType.Representation,
            element: <RepresentationTab />,
        },
    ];

    const handleTabChange = (e, newValue) => {
        setViewType(newValue);
    };

    return (
        <div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={viewType} onChange={handleTabChange} aria-label='basic tabs example'>
                    {Object.values(ViewType).map((view) => (
                        <Tab key={view} label={view} value={view} />
                    ))}
                </Tabs>
            </Box>
            {views.find((view) => view.type === viewType)?.element || ''}
        </div>
    );
};

export default MainView;
