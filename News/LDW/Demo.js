import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    PixelRatio,
    TouchableOpacity,
    Image,
} from 'react-native';

import DialogSelected from './AlertSelected';

const selectedArr = ["拍照", "图库"];
export default class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.showAlertSelected = this.showAlertSelected.bind(this);
        this.callbackSelected = this.callbackSelected.bind(this);
    }

    showAlertSelected(){
        this.dialog.show("请选择照片", selectedArr, '#333333', this.callbackSelected);
    }
    // 回调
    callbackSelected(i){
        switch (i){
            case 0: // 拍照
                this.takePhoto();
                break;
            case 1: // 图库
                this.pickMultiple();
                break;
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.addStyle} source = {require('./add.png')}></Image>
                <TouchableOpacity
                    onPress={() => {this.showAlertSelected();}}>
                    <View style={styles.imageBorder}>
                        <Text style={styles.photoText}></Text>
                    </View>
                </TouchableOpacity>
                <DialogSelected ref={(dialog)=>{
                    this.dialog = dialog;
                }} />
            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addStyle: {

        height:50,
        width:100,

    },
    imageBorder: {
        marginBottom: 10
    },
    photoText: {
        fontSize: 20,
        textAlign: 'center'
    }
});
module.exports = Demo;