// rncs

import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TextInput,
  Button,
  Alert,
} from 'react-native';

const {width, height} = Dimensions.get('screen');

function rpx(p) {
  return (width / 750) * p;
}

export default class LoginScreen extends Component {
  logo = 'http://www.codeboy.com:9999/img/header/logo.png';

  state = {
    uname: '',
    upwd: '',
  };

  _doLogin = () => {
    console.log(this.state.uname, this.state.upwd);

    let url = 'http://www.codeboy.com:9999/data/user/login.php';
    // 发送POST请求：参数分开传递
    let body = `uname=${this.state.uname}&upwd=${this.state.upwd}`;

    // console.log(url+body);

    // 账号：doudou
    // 密码：123456

    // post请求固定方式：fetch(地址, 参数和配置)
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);

        let {code} = res;
        if (code == 200) {
          // 登录成功
          // alert('登录成功，即将跳转到主菜单界面')
          Alert.alert('恭喜', '登录成功，即将跳转到主菜单界面', [
            {
              text: '确定',
              onPress: () => this.props.navigation.navigate('Main'),
            },
          ]);
        } else {
          // 登录失败
          // alert('登录失败')
          Alert.alert('提示', '登录失败', [{text: '确定'}]);
        }
      });
  };

  render() {
    return (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: 'white',
          height: height - 81,
        }}>
        {/* 项目logo */}
        <Image source={{uri: this.logo}} style={ss.logo} />
        {/* 项目名称 */}
        <Text style={{fontSize: rpx(40), marginTop: rpx(20)}}>
          后台管理系统
        </Text>

        {/* 账号 密码 登录 */}
        <View style={{width: rpx(500), marginTop: rpx(100)}}>
          <TextInput
            placeholder="请输入管理员用户名"
            style={ss.input}
            onChangeText={uname => this.setState({uname})}
          />
          <TextInput
            placeholder="请输入用户登录密码"
            style={[ss.input, {marginBottom: rpx(20)}]}
            secureTextEntry
            onChangeText={upwd => this.setState({upwd})}
          />
          <Button title="登录" onPress={this._doLogin} />
        </View>

        {/* 版权页脚 */}
        <Text style={ss.right}>2021版权所有 © https://gitee.com/caizy2021</Text>
      </View>
    );
  }
}

const ss = StyleSheet.create({
  logo: {
    width: rpx(168) * 2,
    height: rpx(41) * 2,
    marginTop: rpx(100),
  },
  input: {
    fontSize: rpx(30),
    color: 'black',
    borderBottomWidth: 2,
    borderBottomColor: 'lightgray',
  },
  right: {
    position: 'absolute',
    bottom: rpx(100),
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    textAlign: 'center',
    paddingVertical: rpx(20),
    color: 'white',
  },
});
