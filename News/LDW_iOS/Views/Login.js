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

// import {
//     StackNavigator,
// } from 'react-navigation';

import Const from './../../Net/LDW/Const';
import JsonUtils from './../../Net/LDW/JsonUtils';
import TimeUtils from './../../Net/LDW/TimeUtils';
import AlertUtils from './../../Net/LDW/AlertUtils';
import LoginUser from './../Beans/LoginUser'


import {
    StackNavigator,
} from 'react-navigation';

import { Button, NavigatorIOS } from "react-native";

import {Navigator} from "react-native-deprecated-custom-components"

import MyScreen from './MyScreen';

import MainPage from './MainPage';




export default class Login extends Component {

    设置顶部导航栏的内容
    static navigationOptions = ({navigation, screenProps}) => ({
        //左侧标题
        headerTitle: ' ',
        //设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题
        headerBackTitle: null,
        //顶部标题栏的样式
        headerStyle: styles.headerStyle,
        //顶部标题栏文字的样式
        headerTitleStyle: styles.headerTitleStyle,
        header: null,
    });


    constructor(props) {
        super(props);
        this.loginApi = new Const().loginApi;
        // this.skipPage = this.skipPage.bind(this);
    }

    render() {
        const self = this;
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



            <View style={styles.item}>
                <Text style={styles.textStyle}>用户帐号：</Text>
                <TextInput
                    ref="inputLoginName"
                    autoFocus={true}
                    underlineColorAndroid="transparent"
                    placeholder="请输入用户名"
                    clearTextOnFocus={true}
                    clearButtonMode="while-editing"
                    style={{flex: 1}}
                    autoCapitalize="none"

                    onChangeText={(input) => this.setState({username: input})}
                ></TextInput>
            </View>
            <View style={styles.item}>
                <Text style={styles.textStyle}>用户密码：</Text>
                <TextInput
                    ref="inputLoginPwd"
                    underlineColorAndroid="transparent"
                    placeholder="请输入密码"
                    clearTextOnFocus={true}
                    clearButtonMode="while-editing"
                    style={{flex: 1}}
                    secureTextEntry={true}//20180810
                    autoCapitalize="none"

                    onChangeText={(input) => this.setState({userpwd: input})}></TextInput>
            </View>

            <TouchableHighlight style={styles.login}
                                underlayColor='transparent'

                                onPress={
                                    // () => this.props.navigation.navigate(
                                    //     'MainPage',
                                    //     {key: this.state.username,
                                    //         myUsername:this.state.username,
                                    //         myUserpwd:this.state.userpwd},)

                                    () => this.postRequest(this.loginApi,self)}


                                >
                <Text style={styles.loginText}>登录</Text>
            </TouchableHighlight>

        </View>)
    }


    postRequest(url,loginComponet) {

        if(this.state==null){
            alert("用户名不能为空");
            return
        }

        if(this.state==null){
            alert("密码不能为空");
            return
        }


        let bean = new LoginUser();
        bean.user = this.state.username;
        bean.pwd = this.state.userpwd;
        // bean.user = "liudongwen";
        // bean.pwd = "000000";

        var request = new XMLHttpRequest();

        request.open("POST", url);
        // request.setRequestHeader("Content-Type","application/x-www-form-urlencoded")//'application/json'
        request.setRequestHeader("Content-Type","application/json");//'application/json';
        request.onreadystatechange = function() {
            if (request.readyState !== 4) {
                return;
            }
            if (request.status == 200) {
                //根据服务器的响应内容格式处理响应结果
                // console.log("request.getResponseHeader('content-type')--->"+request.getResponseHeader('content-type'));
                var result = JSON.parse(request.responseText);

                //{"UserName":"刘栋文","type":"s","ZwQx":""}

                console.log("request.responseText--->"+request.responseText);


                if(result.type=="s"){
                    console.log("result.type--->"+result.type);
                    //todo
                    loginComponet.skipPage(result.UserName);
                }
                else{
                    alert(JSON.stringify(result.state));
                }

            }
            else{
                console.log(request.responseText);
                alert(request.responseText);
            }
        }

        //将用户输入值序列化成字符串
        request.send(JSON.stringify(bean))
    }

      skipPage=(data)=>{
         this.props.navigation.navigate(
            'MainPage',
            {key: data})

    }


    componentDidMount(){
       // AlertUtils.showAlert(TimeUtils.formatDate(new Date().getTime(), "yyyy-MM-dd hh:mm:ss"))

    }





    // postRequest(url) {
    //      let bean = new LoginUser();
    //      bean.user = this.state.username;
    //      bean.pwd = this.state.userpwd;
    //
    //
    //     console.log('url---->',url);
    //     console.log('bean--->',bean);
    //
    //     var opts = {
    //         method:"POST",
    //         // body:JsonUtils.objToStrMap(bean).mapToJson(),//JSON.stringify(data)
    //         body:JSON.stringify(bean),//JSON.stringify(data)
    //         headers: {
    //             'Accept': 'application/json',
    //             //todo
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //         },
    //     }
    //     // fetch(url,opts)
    //     //     .then((response) => {
    //     //         //你可以在这个时候将Promise对象转换成json对象:response.json()
    //     //         // 转换成json对象后return，给下一步的.then处理
    //     //         console.log('response--->',response);
    //     //         return response.text();
    //     //     })
    //     //     .then((responseText) => {
    //     //         alert(responseText);
    //     //         console.log('responseData--->',responseText);
    //     //         // json格式化  JSON.stringify(responseData)转字符串
    //     //         // console.log('json格式化',JSON.parse(responseText));
    //     //     })
    //     //     .catch((error) =>{console.error('error',error)
    //     //         alert(error)
    //     //     })
    //
    //     fetch(url,opts)
    //         .then((response) => {
    //
    //             if(response.ok){
    //                 return response.json();
    //
    //             }else{
    //                 return response.text();
    //             }
    //         })
    //         .then((responseText) => {
    //             alert(responseText);
    //             console.log('responseData--->',responseText);
    //             // json格式化  JSON.stringify(responseData)转字符串
    //             // console.log('json格式化',JSON.parse(responseText));
    //         })
    //         .catch((error) =>{console.error('error',error)
    //             alert(error)
    //         })
    // }











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
        margin: 10,
        borderColor: '#ccc',
        backgroundColor: 'white',
        borderWidth:1,
        height:45,
        paddingLeft:5,
        borderRadius: 4,
        borderWidth:1,
    },
    textStyle: {
        fontSize: 18,
        color: 'black',
        marginRight: 10,


    },
    login: {
        height: 40,
        backgroundColor: '#4398ff',
        margin: 20,
        justifyContent: 'center',
        borderRadius: 4
    },

    loginText: {
        fontSize: 20,
        alignSelf: 'center',
        color: '#FFF'
    },

    button: {
        width: 240,
        height: 45,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4398ff',
        borderRadius: 4,
    },
    //蓝色：#4398ff
    headerStyle: {
        backgroundColor: '#e9e9ee',
    },
    headerTitleStyle: {
        //标题的文字颜色
        color: 'white',
        //设置标题的大小
        fontSize: 18,
        //居中显示
        alignSelf: 'center',
    },
})

module.exports = Login;