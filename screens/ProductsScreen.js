import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

const {width, height} = Dimensions.get('screen');

function rpx(p) {
  return (width / 750) * p;
}

export default class ProductsScreen extends Component {
  state = {res: null, refreshing: false};

  url = 'http://www.codeboy.com:9999/data/product/list.php?pno=';

  componentDidMount() {
    let url = 'http://www.codeboy.com:9999/data/product/list.php?pno=1';

    fetch(url)
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        // {res:res} => {res}
        this.setState({res});
        console.log(this.state.res);
      });
  }

  render() {
    if (this.state.res == null) return <View />;
    return (
      // <View>
      //   <Text> textInComponent </Text>
      // </View>
      <FlatList
        // 获取数据data
        data={this.state.res.data}
        // key
        keyExtractor={(item, index) => index + ''}
        // 数据显示样式
        renderItem={this._renderItem}
        // 背景色：白色
        style={{backgroundColor: 'white'}}
        // 商品分割线
        ItemSeparatorComponent={() => (
          <View style={{height: 3, backgroundColor: 'lightgray'}} />
        )}
        // 下拉：显示
        ListFooterComponent={this._ListFooterComponent}
        // 下拉：阈值
        onEndReachedThreshold={0.1}
        // 下拉：触底事件
        onEndReached={this._onEndReached}
        // 上拉刷新：触发事件
        onRefresh={this._onRefresh}
        // 上拉刷新：是否显示
        refreshing={this.state.refreshing}
      />
    );
  }

  //
  _onRefresh = () => {
    // 开启下拉动画
    this.setState({refreshing: true});

    // 发送请求
    fetch(this.url + 1)
      .then(res => res.json())
      .then(res => {
        console.log(res);

        // 数据更新到state
        this.setState({res, refreshing: false});
      });
  };

  // 触底事件：请求下一页数据
  _onEndReached = () => {
    // 获取下一页页号
    let nextP = this.state.res.pno + 1;

    // 发送请求获取下一页数据
    fetch(this.url + nextP)
      .then(res => res.json())
      .then(res => {
        if (this.state.res.pno == this.state.res.pageCount) return;
        console.log(res);

        // 拼接到之前已有的数据
        res.data = this.state.res.data.concat(res.data);

        // 存储：替换之前已有的数据
        this.setState({res});
      });
  };

  // 下拉显示：
  _ListFooterComponent = () => {
    // 触底：如果是最后一页，则显示没有更多数据
    if (this.state.res.pno == this.state.res.pageCount) {
      return (
        <Text
          style={{
            textAlign: 'center',
            paddingVertical: rpx(10),
            fontSize: rpx(30),
            backgroundColor: 'lightgray',
          }}>
          没有更多数据...
        </Text>
      );
    }

    return (
      <View style={{backgroundColor: 'lightgray', alignItems: 'center'}}>
        {/* 下拉显示：旋转加载图标 */}
        <ActivityIndicator color="green" size="large" />
        {/* 下拉显示：字样 */}
        <Text style={{fontSize: rpx(25)}}>加载中...</Text>
      </View>
    );
  };

  // 数据显示样式
  _renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{flexDirection: 'row'}}
        // 点击触发事件：跳转到商品详情
        onPress={() => this.props.navigation.push('Detail', {lid: item.lid})}>
        {/* 商品图标 */}
        <Image
          source={{uri: 'http://www.codeboy.com:9999/' + item.pic}}
          style={{width: rpx(200), height: rpx(200)}}
        />
        {/* 商品字样 */}
        <View style={{flex: 1, justifyContent: 'space-evenly'}}>
          <Text style={{fontSize: rpx(25)}}>{item.title}</Text>
          <Text style={{color: 'red', fontSize: rpx(26)}}>￥{item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({});
