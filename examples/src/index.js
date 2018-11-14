import React from 'react';
import {render} from 'react-dom';
import Pad from '../../src';

const App = () => (
    <Pad
        dimensions={[5,5]}
        avatar={''}
    />
);

render (<App />, document.getElementById("root"));