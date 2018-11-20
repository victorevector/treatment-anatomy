import React from 'react';
import {render} from 'react-dom';
import Pad from '../../src';

const App = () => (
    <Pad
        dimensions={[40,25]}
        avatar={"https://www.courthouseclinics.com/wp-content/themes/kickstart-child/assets/vaser/imgs/face-a.png"}
        template={{dosage: '', drug: 'botox', metric: 'unit'}}
    />
);

render (<App />, document.getElementById("root"));