import {Component} from 'react'
import {
    Alert
} from 'react-native'

/**
 *JsonUitl的实现
 */
class LogUtil extends Component {

    static myConsoler = (msg) => {
        console.log("TAG",msg)
    }

}

export default LogUtil;
