import React from 'react';
import { Image, Text, Dimensions, LayoutAnimation, ScrollView  } from 'react-native';

export default class ItemScreen extends React.Component<Props> {
  state = {
    width: 0, height: 0,
  };

  componentDidMount() {
    Image.getSize(this.props.navigation.state.params.item.url, (srcWidth, srcHeight) => {
      const maxHeight = Dimensions.get('window').height;
      const maxWidth = Dimensions.get('window').width;

      const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
      this.setState({ width: srcWidth * ratio, height: srcHeight * ratio });
    });

  }
  render() {
    LayoutAnimation.easeInEaseOut();

    const { title, url } = this.props.navigation.state.params.item;
    const {width, height} = this.state; 
    return (
      <ScrollView>
        <Image
          resizeMode="contain"
          style={{ width, height }}
          source={{ uri: url }}
        />
        <Text>{title}</Text>
      </ScrollView>
    )
  }
}
