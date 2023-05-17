import { DimentionType } from './dimention.js';

export default {
    solve(field, controls, extraData, presentation, code) {
        const max = Math.max;
        const min = Math.min;

        const pr = presentation.data;

        let m, n;
        const data = extraData.data;
        if (controls.dimention == DimentionType.one.value) {
            m = null;
            n = field.length;
        } else if (controls.dimention == DimentionType.two.value) {
            m = field.length;
            n = field[0]?.length;
        }
        try {
            eval(code);
        } catch (err) {
            console.log('Error in eval occured:', err);
        }
    },

    fixField(field, controls) {
        // if (controls.dimention == DimentionType.one.value) {
        //     if (field.)
        // } else if (controls.dimention == DimentionType.two.value) {
        // }
    },
};
