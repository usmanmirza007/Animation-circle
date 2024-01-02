import React, { useState,useEffect } from 'react';
import { View, ImageBackground, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, FlatList, TouchableWithoutFeedback,Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { Ionicons } from '@expo/vector-icons';
import SkeletonLoader from "expo-skeleton-loader";


const { width, height } = Dimensions.get("window");

const scrollViewData = [

    {
        id: 2,
        title: "Cappuccino",
    },
    {
        id: 3,
        title: "Latte",
    },
    {
        id: 4,
        title: "Espresso",
    },
    {
        id: 5,
        title: "Mocha",
    },
    {
        id: 6,
        title: "Americano",
    },];
const flatListData = [
    {
        id: 1,
        name: 'Cappuccino',
        title: 'with chocolate',
        price: '25.50',
        image: require('../assets/coffee1.png'),
        Icon: <Icon name="add" size={30} color="white" />
    },
    {
        id: 2,
        name: 'Cappuccino',
        title: 'with chocolate',
        price: '25.50',
        image: require('../assets/coffee1.png'),
        Icon: <Icon name="add" size={30} color="white" />
    },
    {
        id: 3,
        name: 'Cappuccino',
        title: 'with chocolate',
        price: '25.50',
        image: require('../assets/coffee1.png'),
        Icon: <Icon name="add" size={30} color="white" />
    },
    {
        id: 4,
        name: 'Cappuccino',
        title: 'with chocolate',
        price: '25.50',
        image: require('../assets/coffee1.png'),
        Icon: <Icon name="add" size={30} color="white" />
    },
    {
        id: 5,
        name: 'Cappuccino',
        title: 'with chocolate',
        price: '25.50',
        image: require('../assets/coffee1.png'),
        Icon: <Icon name="add" size={30} color="white" />
    },
    {
        id: 6,
        name: 'Cappuccino',
        title: 'with chocolate',
        price: '25.50',
        image: require('../assets/coffee1.png'),
        Icon: <Icon name="add" size={30} color="white" />
    },
    {
        id: 7,
        name: 'Latte',
        title: 'with chocolate',
        price: '15.50',
        image: require('../assets/coffee2.png'),
        Icon: <Icon name="add" size={30} color="white" />
    },
    {
        id: 8,
        name: 'Latte',
        title: 'with chocolate',
        price: '15.50',
        image: require('../assets/coffee2.png'),
        Icon: <Icon name="add" size={30} color="white" />
    },
    {
        id: 9,
        name: 'Latte',
        title: 'with chocolate',
        price: '15.50',
        image: require('../assets/coffee2.png'),
        Icon: <Icon name="add" size={30} color="white" />
    },
    {
        id: 10,
        name: 'Latte',
        title: 'with chocolate',
        price: '15.50',
        image: require('../assets/coffee2.png'),
        Icon: <Icon name="add" size={30} color="white" />
    },
    {
        id: 11,
        name: 'Latte',
        title: 'with chocolate',
        price: '15.50',
        image: require('../assets/coffee2.png'),
        Icon: <Icon name="add" size={30} color="white" />
    },
    {
        id: 12,
        name: 'Latte',
        title: 'with chocolate',
        price: '15.50',
        image: require('../assets/coffee2.png'),
        Icon: <Icon name="add" size={30} color="white" />
    },

    {
        id: 13,
        name: 'Espresso',
        title: 'with chocolate',
        price: '30.00',
        image: require('../assets/coffee3.png'),
        Icon: <Icon name="add" size={30} color="white" />
    },
    {
        id: 14,
        name: 'Espresso',
        title: 'with chocolate',
        price: '30.00',
        image: require('../assets/coffee3.png'),
        Icon: <Icon name="add" size={30} color="white" />
    },
    {
        id: 15,
        name: 'Espresso',
        title: 'with chocolate',
        price: '30.00',
        image: require('../assets/coffee3.png'),
        Icon: <Icon name="add" size={30} color="white" />
    },
    {
        id: 16,
        name: 'Espresso',
        title: 'with chocolate',
        price: '30.00',
        image: require('../assets/coffee3.png'),
        Icon: <Icon name="add" size={30} color="white" />
    },
    {
        id: 17,
        name: 'Espresso',
        title: 'with chocolate',
        price: '30.00',
        image: require('../assets/coffee3.png'),
        Icon: <Icon name="add" size={30} color="white" />
    },
    {
        id: 18,
        name: 'Espresso',
        title: 'with chocolate',
        price: '30.00',
        image: require('../assets/coffee3.png'),
        Icon: <Icon name="add" size={30} color="white" />
    },
    {
        id: 19,
        name: 'Mocha',
        title: 'with chocolate',
        price: '10.30',
        image: require('../assets/coffee4.png'),
        Icon: <Icon name="add" size={30} color="white" />
    },
    {
        id: 20,
        name: 'Mocha',
        title: 'with chocolate',
        price: '10.30',
        image: require('../assets/coffee4.png'),
        Icon: <Icon name="add" size={30} color="white" />
    },
    {
        id: 21,
        name: 'Mocha',
        title: 'with chocolate',
        price: '10.30',
        image: require('../assets/coffee4.png'),
        Icon: <Icon name="add" size={30} color="white" />
    },
    {
        id: 22,
        name: 'Mocha',
        title: 'with chocolate',
        price: '10.30',
        image: require('../assets/coffee4.png'),
        Icon: <Icon name="add" size={30} color="white" />
    },
    {
        id: 23,
        name: 'Mocha',
        title: 'with chocolate',
        price: '10.30',
        image: require('../assets/coffee4.png'),
        Icon: <Icon name="add" size={30} color="white" />
    },
    {
        id: 24,
        name: 'Mocha',
        title: 'with chocolate',
        price: '10.30',
        image: require('../assets/coffee4.png'),
        Icon: <Icon name="add" size={30} color="white" />
    },
    {
        id: 25,
        name: 'Americano',
        title: 'with chocolate',
        price: '10.30',
        image: require('../assets/coffee4.png'),
        Icon: <Icon name="add" size={30} color="white" />
    },
    {
        id: 26,
        name: 'Americano',
        title: 'with chocolate',
        price: '10.30',
        image: require('../assets/coffee4.png'),
        Icon: <Icon name="add" size={30} color="white" />
    },
    {
        id: 27,
        name: 'Americano',
        title: 'with chocolate',
        price: '10.30',
        image: require('../assets/coffee4.png'),
        Icon: <Icon name="add" size={30} color="white" />
    },
    {
        id: 28,
        name: 'Americano',
        title: 'with chocolate',
        price: '10.30',
        image: require('../assets/coffee4.png'),
        Icon: <Icon name="add" size={30} color="white" />
    },
    {
        id: 29,
        name: 'Americano',
        title: 'with chocolate',
        price: '10.30',
        image: require('../assets/coffee4.png'),
        Icon: <Icon name="add" size={30} color="white" />
    },
    {
        id: 30,
        name: 'Americano',
        title: 'with chocolate',
        price: '10.30',
        image: require('../assets/coffee4.png'),
        Icon: <Icon name="add" size={30} color="white" />
    },
];

const HomeScreen = ({ navigation }) => {
    const [selectedCategory, setSelectedCategory] = useState(scrollViewData[0]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

useEffect(() => {
    
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);
    const handleCategoryPress = (category) => {
        setSelectedCategory(category);
    };
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    
    const renderScrollViewItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleCategoryPress(item)}>
            <View
                style={{
                    padding: 10,
                    borderRadius: 15,
                    backgroundColor: selectedCategory.id === item.id ? '#f4a460' : 'white',
                    marginStart: 6
                }}
            >
                <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            </View>
        </TouchableOpacity>
    );
    const renderFlatListItem = ({ item }) => (
        <View style={{  marginTop: 5,marginLeft:40, }}>
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Detail', {
                itemId: item.id, itemName: item.name,
                itemImage: item.image, itemPrice: item.price, itemTitle: item.title
            })}>
                <Image source={item.image} style={styles.image} />
                
                
                <View style={{ flexDirection: 'row', justifyContent:"space-between"}}>
                <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>${item.price}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent:"space-between"}}>
                <Text >{item.title}</Text>
                <Icon style={{ marginLeft: 50, backgroundColor: "#f4a460", borderRadius: 13 }}> {item.Icon}</Icon>
                </View>
                
            </TouchableOpacity>
        </View>
        );
    const renderSkeletonLoader = () => (
        <SkeletonLoader boneColor="white">
    <SkeletonLoader.Container
      style={[{ marginTop: 5,marginLeft:40, }]}
    >
      <SkeletonLoader.Item
        style={{
          width: 300,
          height: 220,
          borderRadius: 50,
          marginRight: 20,
        }}
      />
    </SkeletonLoader.Container>
  </SkeletonLoader>
      );
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/pic.jpg')} // Replace with the path to your image
                style={styles.imageBackground}
                resizeMode="cover"
            >
                <Text style={styles.text}>Location</Text>
                <View style={styles.IconContainer}>
                    <Text style={styles.textLocation}>Tehran,IRAN</Text>
                    <Image source={require('../assets/user.jpg')}
                        style={{ height: 30, width: 30, borderRadius: 50, }}
                    />
                </View>
                <View style={{ marginTop: 25, paddingHorizontal: 30, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 15,
                        justifyContent: 'center'
                    }}>
                        <TouchableWithoutFeedback style={{
                        }} >
                            <View style={{
                                flexDirection: 'row',
                                backgroundColor: 'black', // Change the color as needed
                                padding: 5,
                                borderRadius: 15,
                                alignItems: 'center'
                            }}>
                                <Ionicons name="search" size={25} color="white" />
                                <TextInput style={{
                                    flex: 1,
                                    marginLeft: 10,
                                    marginRight: 10,
                                    color: 'white',

                                }} placeholder="Search Coffee" placeholderTextColor="white" onChangeText={handleSearch} />

                                <Ionicons style={{ backgroundColor: "#f4a460", borderRadius: 10, padding: 5 }} name="search" size={25} color="white" />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </ImageBackground>
            <View style={{ marginTop: 5, marginStart: 10, marginEnd: 10, marginBottom: 2 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <FlatList
                        data={scrollViewData}
                        horizontal
                        renderItem={renderScrollViewItem}
                        keyExtractor={(item) => item.id}
                    />
                </ScrollView>
            </View>
            <FlatList
        numColumns={1}
        data={flatListData.filter(
          (item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()) && item.name === selectedCategory.title
        )}
        renderItem={loading ? renderSkeletonLoader : renderFlatListItem}
        keyExtractor={(item) => item.id.toString()} // Convert id to string
        contentContainerStyle={{}}
      />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        width: 385,
        height: 180,
        borderBottomEndRadius: 20, // Adjust the radius as needed
        overflow: 'hidden', // Ensure the image is clipped by the border radius
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 70,
    },
    text: {
        color: 'silver',
        paddingHorizontal: 15,
        marginTop: 40,
    },
    IconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 20
    },
    textLocation: {
        color: 'white',
        paddingHorizontal: 15,
        fontWeight: 'bold',
        marginTop: 10
    },
    item: {
        //flex: 1,
        backgroundColor: 'white',
        borderRadius: 25,
        marginBottom: 5,
        padding: 11,
        marginTop: 10,
        width:300,
        height:220
       
        
    },
    image: {
        width: 160,
        height: 150,
        borderRadius: 8,
        resizeMode: 'center',
        marginLeft:60
    },
    name: {
        fontSize: 15,
        fontWeight: 'bold',

    },
    price: {
        fontSize: 14,
        color: '#555',
        fontWeight: 'bold',
        
        
    },
});
export default HomeScreen;