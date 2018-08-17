import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    //Navigator,
    TextInput,
    Image,
    TouchableHighlight,
    ScrollView,
    TouchableOpacity,
    Platform,

    Dimensions,
    Modal,

    // NavigatorIOS
} from 'react-native';

import Const from './../../Net/LDW/Const';
import AlertUtils from './../../Net/LDW/AlertUtils';
import TimeUtils from './../../Net/LDW/TimeUtils';
import ImagePicker from 'react-native-image-crop-picker';
import LogUtil from './../../Net/LDW/LogUtil';
import AlertSelected from './AlertSelected';

import CardPic from 'react-native-image-card'
import {Easing} from 'react-native';


//存放数组
var dataToPost = [];

//todo
const selectedArr = ["拍照", "图库"];


// var pic8 = [
//     // `${path}32308598-b8a56058-bf54-11e7-9f50-4023bc99edf3.jpeg`,
//     // `${path}32308630-de653e80-bf54-11e7-886d-2f2ec7b78d3d.jpeg`,
//     // `${path}32308676-1cc7c1c0-bf55-11e7-9d81-562eeec45ad4.jpeg`,
//     // `${path}32309008-bd7baeb4-bf56-11e7-8a87-15217db54f8b.jpeg`,
//     // `${path}32308770-93f321c2-bf55-11e7-859f-fd4e9cc372ed.jpeg`,
//     // `${path}32308812-c3e69292-bf55-11e7-90d3-dcd143fbcb76.jpeg`,
//     // `${path}32308598-b8a56058-bf54-11e7-9f50-4023bc99edf3.jpeg`,
//     // `${path}32308598-b8a56058-bf54-11e7-9f50-4023bc99edf3.jpeg`,
// ];



//新增记录
/**
 * 问题1 : 我上传的怎么没有我的名字呢?
 *
 *
 *
 */

export default class AddRecord extends Component {

    static navigationOptions = ({navigation, screenProps}) => ({
            headerTitle: "新增记录",
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
        //
        this.state = {
            image: null,
            images: null,
            oddNumbers: null,

            //针对九宫格
            pic8:[],
        };
        //todo
        this.showAlertSelected = this.showAlertSelected.bind(this);
        this.callbackSelected = this.callbackSelected.bind(this);
    }

    //todo
    showAlertSelected() {
        this.dialog.show("请选择照片", selectedArr, '#333333', this.callbackSelected);
    }

    // 回调
    callbackSelected(i) {
        switch (i) {
            case 0: // 拍照 //todo
                this.pickSingleWithCamera(false);
                break;
            case 1: // 图库
                this.openPicLib();
                break;
        }
    }

    //todo


    // show() {
    //     let items = [
    //         {title: '从相册选取', onPress: () => this.openPicLib()},
    //         {title: '拍照一张',onPress: () => this.pickSingleWithCamera()},
    //     ];
    //     let cancelItem = {title: '关闭'};
    //     ActionSheet.show(items, cancelItem);
    // }

    // myImage(image) {
    //     this.state.images.set(image.length,<Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image} />);
    // }

    // //todo
    renderImage(image) {
        return <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image}/>
    }

    renderAsset(image) {
        return this.renderImage(image);
    }


    pickSingleWithCamera(cropping) {
        if (Platform.OS === 'ios') {
            ImagePicker.openCamera({
                cropping: cropping,
                width: 500,
                height: 500,
                includeExif: true,
            }).then(image => {
                LogUtil.myConsoler('received image', image);

                dataToPost.push({
                    uri: image.path,
                    width:image.width,
                    height: image.height,
                    mime: image.mime,
                });
                this.setState({
                    images: dataToPost
                });
            }).catch(e => alert(e));
        }

    }


    openPicLib = () => {
        if (Platform.OS === 'ios') {
            ImagePicker.openPicker({
                multiple: true,
                waitAnimationEnd: false,
            }).then(images => {

                //todo 20180815
                let myLength = images.length;
                if (myLength > 5) {
                    myLength = 5;
                }
                //todo 20180815
                for (let i = 0; i < myLength; i++) {
                    dataToPost.push({
                        uri: images[i].path,
                        width: images[i].width,
                        height: images[i].height,
                        mime: images[i].mime,
                    });
                }
                this.setState({
                    images: dataToPost
                });



                //针对九宫格的;
                //todo
                let pictures = [];
                for (let i = 0; i < myLength; i++) {
                    pictures.push(
                        images[i].path);
                }
                //todo ,如何用setState更新pic8里面的元素
                this.setState(()=>{
                    return {pic8: pictures};
                })



            }).catch(e =>
                alert(e)
            );

        }
    }


    //
    // createImageItem() {
    //     let imageSource = require('../../resource/drawable/image_add.png');
    //     let mainView;
    //     if (this.state.images != null && this.state.images.length >= 9) {
    //         mainView = null;
    //     } else {
    //         mainView =
    //             <TouchableOpacity
    //                  onPress={() => {
    //                      this.show();
    //                  }}>
    //             <Image source={imageSource}/>
    //         </TouchableOpacity>
    //     }
    //
    //     return (
    //         <View>
    //             <View>
    //                 {this.state.images ? this.state.images.map(i => <View
    //                     key={i.uri}>{this.renderImage(i)}</View>) : null}
    //             </View>
    //             <View>
    //                 {mainView}
    //             </View>
    //         </View>
    //     )
    //
    // }

    pickSingle(cropit, circular = false) {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: cropit,
            cropperCircleOverlay: circular,
            compressImageMaxWidth: 640,
            compressImageMaxHeight: 480,
            compressImageQuality: 0.5,
            compressVideoPreset: 'MediumQuality',
            includeExif: true,
        }).then(image => {
            console.log('received image', image);
            this.setState({
                image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
                images: null
            });
        }).catch(e => {
            console.log(e);
            AlertUtils.showAlert(e.message ? e.message : e);
        });
    }


    getOddNumberText() {
        return this.state.oddNumbers;
    }

    render() {

        return (
            <View style={styles.container}>

                <ScrollView style={{flex: 1, marginBottom: 1}}
                            contentContainerStyle={{backgroundColor: "white"}}
                            pagingEnabled={true}
                            stickyHeaderIndices={0}
                            snapToAlignment={'center'}
                            ref='scrollView'>


                    <View style={styles.item}>
                        <Text style={styles.textStyle}
                              onPress={
                                  () => this.RequestOddNumbers(new Const().getOddNumber, this)}>生成单号：</Text>
                        <Text style={styles.textUnInputStyle}>{this.state.oddNumbers}</Text>

                    </View>


                    <View style={styles.item}>
                        <Text style={styles.textStyle}>所在区域：</Text>
                        <TextInput
                            ref="inputLoginArea"
                            underlineColorAndroid="transparent"
                            placeholder=""
                            clearTextOnFocus={true}
                            clearButtonMode="while-editing"
                            style={{flex: 1}}
                            autoCapitalize="none"
                            onChangeText={(input) => this.setState({area: input})}></TextInput>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.textStyle}>分拣中心：</Text>
                        <TextInput
                            ref="inputLoginSorting"
                            underlineColorAndroid="transparent"
                            placeholder=""
                            clearTextOnFocus={true}
                            clearButtonMode="while-editing"
                            style={{flex: 1}}
                            autoCapitalize="none"
                            onChangeText={(input) => this.setState({sorting: input})}></TextInput>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.textStyle}>联系人：</Text>
                        <TextInput
                            ref="inputLoginLinkman"
                            underlineColorAndroid="transparent"
                            placeholder=""
                            clearTextOnFocus={true}
                            clearButtonMode="while-editing"
                            style={{flex: 1}}
                            autoCapitalize="none"
                            onChangeText={(input) => this.setState({linkman: input})}></TextInput>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.textStyle}>联系电话：</Text>
                        <TextInput
                            ref="inputLoginLinkPhone"
                            underlineColorAndroid="transparent"
                            placeholder=""
                            clearTextOnFocus={true}
                            clearButtonMode="while-editing"
                            style={{flex: 1}}
                            autoCapitalize="none"
                            onChangeText={(input) => this.setState({linkPhone: input})}></TextInput>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.textStyle}>设备编号：</Text>
                        <TextInput
                            ref="inputLoginDeN"
                            underlineColorAndroid="transparent"
                            placeholder=""
                            clearTextOnFocus={true}
                            clearButtonMode="while-editing"
                            style={{flex: 1}}

                            autoCapitalize="none"
                            onChangeText={(input) => this.setState({deNumber: input})}></TextInput>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.textStyle}>设备型号：</Text>
                        <TextInput
                            ref="inputLoginDeType"
                            underlineColorAndroid="transparent"
                            placeholder=""
                            clearTextOnFocus={true}
                            clearButtonMode="while-editing"
                            style={{flex: 1}}

                            autoCapitalize="none"
                            onChangeText={(input) => this.setState({deType: input})}></TextInput>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.textStyle}>问题点：</Text>
                        <TextInput
                            ref="inputLoginQuestion"
                            underlineColorAndroid="transparent"
                            placeholder=""
                            clearTextOnFocus={true}
                            clearButtonMode="while-editing"
                            style={{flex: 1}}

                            autoCapitalize="none"
                            onChangeText={(input) => this.setState({question: input})}></TextInput>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.textStyle}>问题描述：</Text>
                        <TextInput
                            ref="inputLoginDescribe"
                            underlineColorAndroid="transparent"
                            placeholder=""
                            clearTextOnFocus={true}
                            clearButtonMode="while-editing"
                            style={{flex: 1}}

                            autoCapitalize="none"
                            onChangeText={(input) => this.setState({describe: input})}></TextInput>
                    </View>



                    <View style={styles.mode}>
                        {/*<View style={styles.cardHeader}>*/}
                        {/*<Text style={styles.title}>九宫格模式</Text>*/}
                        {/*<Text>我是一条朋友圈</Text>*/}
                        {/*</View>*/}
                        <CardPic
                            style={{width: 400}}
                            source={this.state.pic8}
                            mode="nineGrid"
                            space={10}
                            maskOpacity={0.8}
                            easingFunc={Easing.ease}
                            rebounceDuration={500}
                            showDuration={100}
                            closeDuration={150}
                            enableScaling={true}
                            disabled={false}
                        />
                    </View>
                    {/*/!*竖向显示选择的单个图片*!/*/}
                    {/*{this.state.image ? this.renderAsset(this.state.image) : null}*/}
                    {/*/!*竖向显示选择的图片列表*!/*/}
                    {/*{this.state.images ? this.state.images.map(i => <View key={i.uri}>{this.renderAsset(i)}</View>) : null}*/}
                    {/*用来添加图片的按钮*/}
                    {this.state.images != null && this.state.images.length >= 5 ?
                        null :
                        <View style={styles.button}>
                            <TouchableOpacity
                                // onPress={() => this.openPicLib()}>
                                //todo
                                onPress={() => this.showAlertSelected()}>

                                <Image style={{width: 128, height: 128}}
                                       source={require('../../resource/drawable/image_add.png')}></Image>
                            </TouchableOpacity>
                        </View>
                    }




                </ScrollView>


                <TouchableHighlight style={styles.login} underlayColor='transparent'
                                    onPress={() => this.CommitPage()}>
                    <Text style={styles.loginText}>上传</Text>
                </TouchableHighlight>


                <AlertSelected ref={(dialog) => {
                    this.dialog = dialog;
                }}/>

            </View>)
    }


    //数据提交
    CommitPage = () => {
        let formData = new FormData();
        if (this.state.images == null) {
            AlertUtils.showAlert("没有选择图片");
        } else {

            //todo 20180815
            let myLength = this.state.images.length;
            if (myLength > 5) {
                myLength = 5;
            }

            for (var i = 0; i < myLength; i++) {
                var uri = this.state.images[i].uri;
                var index = uri.lastIndexOf("\/");
                var name = uri.substring(index + 1, uri.length);
                let file = {uri: uri, type: 'multipart/form-data', name: name};
                formData.append('file', file);
            }
        }


        LogUtil.myConsoler("TAG", " oddNumbers = " + this.state.oddNumbers);
        LogUtil.myConsoler("TAG", " area = " + this.state.area);
        LogUtil.myConsoler("TAG", " sorting = " + this.state.sorting);
        LogUtil.myConsoler("TAG", " linkman = " + this.state.linkman);
        LogUtil.myConsoler("TAG", " linkPhone = " + this.state.linkPhone);
        LogUtil.myConsoler("TAG", " deNumber = " + this.state.deNumber);
        LogUtil.myConsoler("TAG", " question = " + this.state.question);
        LogUtil.myConsoler("TAG", " describe = " + this.state.describe);
        LogUtil.myConsoler("TAG", " this.props.navigation.state.params.key = " + this.props.navigation.state.params.key);
        LogUtil.myConsoler("TAG", " TimeUtils.formatCurrentDate(\"yyyy-MM-dd hh:mm:ss\") = " + TimeUtils.formatCurrentDate("yyyy-MM-dd hh:mm:ss"));


        //todo 填入参数 上传图片时，可以在此添加相关其他参数
        formData.append('BugBillNo', this.state.oddNumbers);
        formData.append('AeraName', this.state.area);
        formData.append('FenJianZhongXin', this.state.sorting);
        formData.append('LxUser', this.state.linkman);
        formData.append('LxTel', this.state.linkPhone);
        formData.append('DeviceNo', this.state.deNumber);
        formData.append('DeviceType', this.state.deType);
        formData.append('Bug', this.state.question);
        formData.append('BugMx', this.state.describe);
        formData.append('DengJiUser', this.props.navigation.state.params.key);//返回来的key


        formData.append('DengJiTime', TimeUtils.formatCurrentDate("yyyy-MM-dd hh:mm:ss"));
        formData.append('FollowStatus', "已登记");
        formData.append('HFStatus', "待回访");


        //todo 填入url ModalProgress.show("数据上传中，请稍后....");
        const REQUEST_URL = new Const().uploadPicApi;


        var request = new XMLHttpRequest();

        request.open("POST", REQUEST_URL);
        // request.setRequestHeader("Content-Type","application/x-www-form-urlencoded")//'application/json'
        request.setRequestHeader("Content-Type", "application/json");//'application/json';
        request.onreadystatechange = function () {
            if (request.readyState !== 4) {
                return;
            }

            console.log("request--->" + request);
            console.log("request.responseText--->" + request.responseText);

            if (request.responseText == "success") {
                //todo  提示上传成功

            }
            else {
                //提示上传失败
                LogUtil.myConsoler(request.responseText);
                alert(request.responseText);
            }
        }

        //将用户输入值序列化成字符串
        request.send(formData)


        // fetch(REQUEST_URL, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //         'Accept': 'application/json'
        //     },
        //     body: formData,
        // }).then((response) =>
        //
        //     LogUtil.myConsoler("response -----> "+response),
        //     response.json()
        //
        // ).then((responseJson) => {
        //     LogUtil.myConsoler("responseJson.state -----> "+responseJson.state)
        //     LogUtil.myConsoler(" responseJson -----> " +  responseJson)
        //     alert(JSON.stringify(responseJson));
        //     if (responseJson.status == 0) {
        //         //todo   dialog隐藏 ModalProgress.hide();
        //         {
        //             this.goBack()
        //         }
        //     } else {
        //         //todo   dialog隐藏ModalProgress.hide();
        //         LogUtil.myConsoler("responseJson.state = "+responseJson.state)
        //         LogUtil.myConsoler(" response.json() = " +  response.json())
        //         alert(responseJson.msg);
        //     }
        //
        // }).catch((error) => {
        //     LogUtil.myConsoler(" error -----> " +  error)
        //     alert(error);
        //     //todo   dialog隐藏 ModalProgress.hide();
        // });

    }


    RequestOddNumbers(url, self) {

        LogUtil.myConsoler("获取单号 url =" + LogUtil)

        var request = new XMLHttpRequest();

        request.open("POST", url);

        request.setRequestHeader("Content-Type", "application/json");//'application/json';
        request.onreadystatechange = function () {
            if (request.readyState !== 4) {
                return;
            }
            if (request.status == 200) {
                //根据服务器的响应内容格式处理响应结果
                var result = JSON.parse(request.responseText);

                console.log("request.responseText--->" + request.responseText);

                if (result.type == "s") {
                    LogUtil.myConsoler("result.type--->" + result.type);
                    // self.state.oddNumbers = result.BugNo;

                    self.setState(() => {
                        return {oddNumbers: result.BugNo};
                    })
                    LogUtil.myConsoler("self.state.oddNumbers--->" + self.state.oddNumbers);
                }
                else {
                    alert(JSON.stringify(result.state));
                }
            }
            else {
                console.log(request.responseText);
                alert(request.status + "\n" + request.responseText);
            }
        }

        //将用户输入值序列化成字符串
        request.send()
    }


}
let textStyle = {
    backgroundColor: 'red',
    fontSize: 40,
    textAlign: 'center',
    marginTop: 100
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: "column",

    },
    textStyle: {
        fontSize: 18,
        color: 'black',
        marginRight: 10
    },
    textUnInputStyle: {
        fontSize: 16,
        color: 'gray',
        marginRight: 10
    },

    buttonCommit: {
        width: 80,
        height: 50,
        borderRadius: 5,
        margin: 10,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4398ff',
        flexGrow: 1,
    },
    button: {
        margin: 5,
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

    scrollViewType: {
        flex: 1,
    },

    login: {
        height: 40,
        backgroundColor: '#4398ff',
        margin: 10,
        justifyContent: 'center',
        borderRadius: 4,
        borderWidth: 1,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
        borderColor: '#ccc',
        backgroundColor: 'white',
        borderWidth: 1,
        height: 40,
        paddingLeft: 5,
        borderRadius: 4,
        borderWidth: 1,
    },
    textStyle: {
        fontSize: 18,
        color: 'black',
        marginRight: 10,
    },
    loginText: {
        fontSize: 18,
        alignSelf: 'center',
        color: '#FFF'
    },


});
module.exports = AddRecord;










