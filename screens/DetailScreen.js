// rncs
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';

const {width, height} = Dimensions.get('screen');

function rpx(p) {
  return (width / 750) * p;
}

export default class DetailScreen extends Component {
  state = {details: null};

  componentDidMount() {
    // console.log(this.props);

    // 读取 lid
    let lid = this.props.route.params.lid;

    // 拼接请求地址 url
    let url = 'http://www.codeboy.com:9999/data/product/details.php?lid=' + lid;
    // console.log(url);

    // 发送请求 fetch
    fetch(url)
      .then(res => res.json())
      .then(res => {
        // console.log(res);

        // 把请求回来的 details 进行处理, 添加前缀域名
        // src="img/
        // src="http://101.96.128.94:9999/img/
        res.details.details = res.details.details.replace(
          /src="img/g,
          ' width="100%" src="http://www.codeboy.com:9999/img/',
        );

        // 动态更新state中的details
        this.setState({details: res.details});
        console.log(this.state.details);
      });
  }

  render() {
    if (this.state.details == null) return <View></View>;
    let details = this.state.details;
    return (
      <ScrollView style={{backgroundColor: 'white', padding: rpx(20)}}>
        {/* 商品型号 */}
        <Text
          style={{
            // 分割线
            borderBottomWidth: 3,
            borderBottomColor: 'gray',
            paddingBottom: rpx(10),
            fontSize: rpx(30),
            color: 'black',
          }}>
          商品型号：{details.lname}
        </Text>

        {/* 商品主图片：横向展示 */}
        <FlatList
          data={details.picList}
          keyExtractor={(item, index) => index + ''}
          renderItem={this._renderItem}
          horizontal
          pagingEnabled
          onScroll={this._onScroll}
        />

        {/* 商品名 价格 描述 */}
        <View
          style={{
            // 分割线
            borderBottomWidth: 3,
            borderBottomColor: 'gray',
            marginVertical: rpx(20),
            paddingVertical: rpx(20),
          }}>
          <Text style={{fontSize: rpx(27), fontWeight: 'bold', color: 'black'}}>
            {details.title}
          </Text>
          <Text style={{fontSize: rpx(24), marginVertical: rpx(10)}}>
            {details.subtitle}
          </Text>
          <Text style={{fontSize: rpx(30), color: 'red', fontWeight: 'bold'}}>
            ￥{details.price}
          </Text>
        </View>

        {/* 网页内容作为 页面的局部显示 */}
        <AutoHeightWebView source={{html: details.details}} />

        <View style={{height: rpx(20)}} />
      </ScrollView>
    );
  }

  // 商品主图片：自动滚动
  _onScroll = event => {
    // event.persist()
    // console.log(event);

    let x = event.nativeEvent.contentOffset.x;
    let w = event.nativeEvent.layoutMeasurement.width;

    this.page = Math.round(x / w);
    console.log(this.page);
  };

  page = 0;

  // 商品主图片：显示样式
  _renderItem = ({item}) => {
    let box_w = rpx(750 - 20 - 20);

    return (
      <Image
        source={{uri: 'http://www.codeboy.com:9999/' + item.md}}
        style={{width: box_w, height: box_w}}
      />
    );
  };
}

const styles = StyleSheet.create({});
