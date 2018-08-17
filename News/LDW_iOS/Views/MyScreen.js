import {
    StackNavigator,
} from 'react-navigation';

import React from 'react';

const Login = require('./Login');
const MainPage = require('./MainPage');
const AddRecord = require('./AddRecord');
const Demo = require('../../LDW/Demo');


export default MyScreen = StackNavigator({
    // Demo:{
    //     screen:Demo,
    // },
    AddRecord:{
        screen:AddRecord,
    },

    Login:{
        screen:Login,
    },
    MainPage:{
        screen:MainPage,
    },



});


