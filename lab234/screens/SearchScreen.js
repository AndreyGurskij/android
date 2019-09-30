import React, { Component } from 'react';
import { LayoutAnimation, TouchableOpacity, RefreshControl, ScrollView, View, Text, StyleSheet, Dimensions, Image, FlatList } from 'react-native';
import { AsyncStorage } from 'react-native';

export default class SearchScreen extends Component<Props>  {
    state = {
        loading: true,
        posts: [],
    };

    componentDidMount() {
        try {
            AsyncStorage.getItem('searchkesh').then(value => {
                if (value !== null) {
                    this.setState({
                        posts: JSON.parse(value),
                        loading: false
                    })
                }
                else {
                    this.makeRemoteRequest()
                }
            })
        } catch (alert) { }
    }

    makeRemoteRequest() {
        fetch('https://gorest.co.in/public-api/photos?_format=json&access-token=BjoigNnQ5rAU-4QJGq_3rbuCpu_3DWNO1FJR')
        .then(response => response.json())
        .then(res => {
            AsyncStorage.setItem('searchkesh', JSON.stringify(res.result))
        this.setState({
            posts: res.result,
            loading: false
        })
    })
}

_onRefresh = () => this.makeRemoteRequest();

render() {
    const { loading, posts } = this.state;
    LayoutAnimation.easeInEaseOut();
    return (
        <View>
            {
                loading ? <Text style={styles.loading}>Loading...</Text> :
                    <ScrollView>
                        <List
                            refreshControl={
                                <RefreshControl
                                    refreshing={loading}
                                    onRefresh={this._onRefresh}
                                />
                            }
                            data={posts}
                            onPressPost={(item) => this.props.navigation.navigate('ItemScreen', { item })}
                        />
                    </ScrollView>
            }
        </View>
    );
}
}
class List extends React.Component<Props> {
    renderItem = ({ item }) => <TouchableOpacity onPress={() => {
        this.props.onPressPost(item)
    }}>
        <Image source={{ uri: item.url }} style={styles.image} />
    </TouchableOpacity>

    keyExtractor = item => item.itemKey;
    render() {
        const { onPressFooter, ...props } = this.props;
        return (
            <FlatList
                numColumns={3}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
                {...props}
            />
        );
    }
}

const styles = StyleSheet.create({
    image: {
        aspectRatio: 1,
        width: Dimensions.get('window').width / 3 - 2,
        height: Dimensions.get('window').width / 3 - 2,
        resizeMode: 'cover',
        marginBottom: 1,
        marginTop: 1,
        marginLeft: 1,
        marginRight: 1
    },
    loading: {
        textAlign: 'center',
        marginTop: 30
    }
})
