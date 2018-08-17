import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    //Navigator,
    TextInput,
    TouchableHighlight
    // NavigatorIOS
} from 'react-native';

import {
    StackNavigator,
} from 'react-navigation';

import { Button, NavigatorIOS } from "react-native";

import {Navigator} from "react-native-deprecated-custom-components"

import MainPage from './MainPage';

export default class Login extends Component {
    constructor(props) {
        super(props);
        // this.loginInMainpage = this.loginInMainpage.bind(this);
    }

    render() {
        return (<View style={styles.container}>

            <View   style={{
                //row（默认值）：主轴为水平方向，起点在左端。
                flexDirection: 'row',
                height:100,
                marginTop:1,
                //项目在主轴上的对齐方式
                justifyContent: 'center',
                marginBottom:100,
                //项目在交叉轴上如何对齐//flex-start：交叉轴的起点对齐
                alignItems: 'flex-start',}}>


                <Text style={{
                    flex:1,
                    top:50,
                    left:100,
                    bottom:100,
                    lineHeight:100,
                    fontSize:30
                }}>售后服务管理系统</Text>
            </View>



            <View style={styles.item}><Text style={styles.textStyle}>用户帐号：</Text>
                <TextInput
                    ref="inputLoginName"
                    autoFocus={true}
                    underlineColorAndroid="gray"
                    placeholder="请输入用户名"
                    clearTextOnFocus={true}
                    clearButtonMode="while-editing"
                    style={{flex: 1}}
                    onChangeText={(input) => this.setState({username: input})}
                ></TextInput>
            </View>
            <View style={styles.item}><Text style={styles.textStyle}>用户密码：</Text>
                <TextInput
                    ref="inputLoginPwd"
                    underlineColorAndroid="gray"
                    placeholder="请输入密码"
                    clearTextOnFocus={true}
                    clearButtonMode="while-editing"
                    style={{flex: 1}}
                    onChangeText={(input) => this.setState({userpwd: input})}></TextInput>
            </View>

            <TouchableHighlight style={styles.login}
                                underlayColor='transparent'
                // onPress={
                //     () => this.loginInMainpage()
                //     //() => alert(this.loginInMainpage)
                // }


                                onPress={() => {
                                    alert("你点击了按钮！");
                                }}
                                title="点我！"
            >


                <Text style={styles.loginText}>登录</Text>

            </TouchableHighlight>
        </View>)
    }

    /**
     * 登录进入主页面
     */
    loginInMainpage=()=>{
        this.refs.inputLoginName.blur();
        this.refs.inputLoginPwd.blur();

        // const { navigate } = this.props.navigation;
        // navigate('./LDW_iOS/MainPage');  //跳转到注册过的Home界面

        this.props.navigator.resetTo({
            component: MainPage,
            params: {
                logNmae: this.state.username,
                logPwd: this.state.userpwd,
                parentComponent: this,
                ...this.props
            },
        });

        // alert(this.props.navigator);

    }

    setLoginName(input) {
        this.setState = {inputName: input}
    }

    setLoginPwd(input) {
        this.setState = {inputPwd: input}
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    textStyle: {
        fontSize: 18,
        color: 'black',
        marginRight: 10
    },
    login: {
        height: 40,
        backgroundColor: 'green',
        margin: 20,
        justifyContent: 'center',
    },
    loginText: {
        fontSize: 20,
        alignSelf: 'center',
        color: '#FFF'
    }

})