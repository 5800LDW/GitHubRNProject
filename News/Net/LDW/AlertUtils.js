import {Component} from 'react'
import {
    Alert
} from 'react-native'

/**
 *JsonUitl的实现
 */
class AlertUtils extends Component {

    static showAlert = (msg) => {
        Alert.alert('', msg);
    }

    static showAlertWithTitle = (titile,msg) => {
        Alert.alert(titile, msg);
    }
}

export default AlertUtils;



