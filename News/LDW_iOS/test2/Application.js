import {
    StackNavigator,
} from 'react-navigation';

import React from 'react';

const Main = require('./Main');
const Detail = require('./Details');
const Menu = require('./Menu');

export default App = StackNavigator({

    Main:{
        screen:Main,
    },
    Detail:{
        screen:Detail,
    },
    Menu:{
        screen:Menu,
    }

});












