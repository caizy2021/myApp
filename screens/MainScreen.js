// rncs

import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';

const {width, height} = Dimensions.get('screen');

function rpx(p) {
  return (width / 750) * p;
}

export default class MainScreen extends Component {
  // 数据部分
  data = [
    {title: '上架商品总数', count: '24,380', desc: '+128%较上月', color: 'red'},
    {title: '注册用户总数', count: '1,965', desc: '-50%较上月', color: 'blue'},
    {
      title: '上架商品总数',
      count: '24,380',
      desc: '+128%较上月',
      color: 'green',
    },
    {title: '当日PC端PV量', count: '14,281', desc: '-50%较上月', color: 'red'},
    {title: '移动端PV量', count: '29,315', desc: '-34%较昨日', color: 'brown'},
    {title: 'App总下载量', count: '7,422', desc: '+18%较上周', color: 'orange'},
    {
      icon: require('../assets/goods.png'),
      title: '商品管理',
      jumpTo: 'Products', //点击时跳转到哪里
    },
    {
      icon: require('../assets/user.png'),
      title: '用户管理',
      jumpTo: '',
    },
    {
      icon: require('../assets/order.png'),
      title: '订单管理',
      jumpTo: '',
    },
    {
      icon: require('../assets/main.png'),
      title: '首页管理',
      jumpTo: '',
    },
  ];

  // 挂载时
  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity>
          <Image
            source={require('../assets/person.png')}
            style={{width: rpx(60), height: rpx(60)}}
          />
        </TouchableOpacity>
      ),
    });
  }

  render() {
    return (
      <FlatList
        data={this.data}
        keyExtractor={(item, index) => index + ''}
        renderItem={this._renderItem}
        style={{backgroundColor: 'white'}}
        numColumns={2}
      />
    );
  }

  _renderItem = ({item, index}) => {
    if (index > 5) {
      return (
        <TouchableOpacity
        onPress={()=>this.props.navigation.push(item.jumpTo)}
          style={{
            width: width / 2,
            alignItems: 'center',
            paddingVertical: rpx(40),
          }}>
          <Image
            source={item.icon}
            style={{width: rpx(100), height: rpx(100)}}
          />
          <Text style={{fontSize: rpx(30)}}>{item.title}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={[ss.cell, {borderRightWidth: index % 2 == 0 ? 1 : 0}]}>
        <Text style={{fontSize: rpx(26)}}>{item.title}</Text>
        <Text style={{fontSize: rpx(34), color: item.color}}>{item.count}</Text>
        <Text style={{fontSize: rpx(20)}}>{item.desc}</Text>
      </View>
    );
  };
}

const ss = StyleSheet.create({
  cell: {
    width: width / 2,
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: rpx(20),
  },
});
