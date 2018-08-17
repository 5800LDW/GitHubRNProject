import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight
} from 'react-native';



export default class MainPage extends Component {

    static navigationOptions = ({navigation, screenProps}) => ({
            headerTitle: navigation.state.params.key,
            //设置滑动返回的距离
            gestureResponseDistance: {horizontal: 300},

            //是否开启手势滑动返回，android 默认关闭 ios打开
            // gesturesEnabled: true,

            //设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题
            headerBackTitle: null,
            //导航栏的样式
            headerStyle: styles.headerStyle,
            //导航栏文字的样式
            headerTitleStyle: styles.headerTitleStyle,
            //返回按钮的颜色
            headerTintColor: 'white',

            //隐藏顶部导航栏
            // header: null,

            //设置顶部导航栏右边的视图  和 解决当有返回箭头时，文字不居中
            headerRight: (<View/>),

            //设置导航栏左边的视图
            // headerLeft: (<View/>),
            // myUsername:this.props.navigation.state.params.myUsername,
            // myUserpwd:this.props.navigation.state.params.myUserpwd,

        }

    );

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight style={styles.button}
                                    underlayColor='white'

                                    onPress={() =>  this.props.navigation.navigate(
                                            'AddRecord',
                                        //todo
                                        {key:this.props.navigation.state.params.key})}>
                    <Text style={styles.loginText}>新增记录</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.button}
                                    underlayColor='transparent'

                                    // onPress={
                                    // }
                >
                    <Text style={styles.loginText}>记录跟进</Text>
                </TouchableHighlight>

        </View>)
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection:"row",
    },
    textStyle: {
        fontSize: 18,
        color: 'black',
        marginRight: 10
    },

    button: {
        width: 80,
        height: 50,
        borderRadius: 5,
        margin:10,
        borderWidth:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4398ff',
        flexGrow:1,
    },
    headerStyle: {
        backgroundColor: '#4398ff',
    },
    headerTitleStyle: {
        color: 'white',
        //设置标题的大小
        fontSize: 18,
        //居中显示
        alignSelf: 'center',
    },


    login: {
        height: 40,
        width:100,
        backgroundColor: '#4398ff',
        margin: 20,
        justifyContent: 'center',
        borderRadius: 4
    },


});
module.exports = MainPage;





////下面的是原来的
// import React, {Component} from 'react';
// import {
//     AppRegistry,
//     StyleSheet,
//     Text,
//     View,
//     Navigator,
// } from 'react-native';
//
// export default class MainPage extends Component {
//     constructor(props) {
//         super(props);
//     }
//
//     render() {
//         return (<View style={styles.container}>
//             <Text style={styles.textStyle}>欢迎来到主界面</Text>
//             <Text style={styles.textStyle}>您当前的用户名是：{this.props.logNmae}</Text>
//             <Text style={styles.textStyle}>您当前的密码是：{this.props.logPwd}</Text>
//         </View>)
//     }
// }
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     textStyle: {
//         fontSize: 18,
//         color: 'black',
//         marginRight: 10
//     },
// })