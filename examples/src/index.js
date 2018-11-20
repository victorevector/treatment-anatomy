import React from 'react';
import {render} from 'react-dom';
import Pad from '../../src';

const App = () => (
    <Pad
        dimensions={[45,35]}
        avatar={"https://www.courthouseclinics.com/wp-content/themes/kickstart-child/assets/vaser/imgs/face-a.png"}
        template={{drug: 'botox', dosage: '', metric: 'unit'}}
    />
);

render (<App />, document.getElementById("root"));