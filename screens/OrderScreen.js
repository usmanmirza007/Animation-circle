// DetailScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, ImageBackground, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

const data = [
  {
    id: 1,
    title: "Deliver",
  },
  {
    id: 2,
    title: "Pickup",
  },
]

const OrderScreen = ({ navigation, route }) => {
  const { itemId, itemName, itemPrice, itemImage, itemTitle } = route.params;
  const [selectedCategory, setSelectedCategory] = useState(data[0]);
  const [deliveryFee, setDeliveryFee] = useState(5);
  
  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  const [selectedButton, setSelectedButton] = useState(null);

  const pressButton = (button) => {
    setSelectedButton(selectedButton === button ? null : button);
  };
  
  const renderScrollViewItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleCategoryPress(item)}>
      <View
        style={{
          marginLeft: 45,
          padding: 10,
          margin: 5,  
          borderRadius: 50,
          width: 120,
          backgroundColor: selectedCategory.id === item.id ? '#f4a460' : 'white',
          alignItems: 'center'
        }}
      >
        <Text>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
  
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const calculateTotal = () => {
    return count * parseFloat(itemPrice);
  };

  const calculateTotalWithDelivery = () => {
    const productTotal = calculateTotal();
    return productTotal + deliveryFee;
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 40, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', }}>
        <TouchableOpacity onPress={() => navigation.goBack('HomeScreen')}>
          <Icon name='chevron-back-outline' size={30} color="black" />
        </TouchableOpacity>
        <Text style={{ fontWeight: 'bold', marginLeft: 130, fontSize: 18 }}>Order</Text>
      </View>
      <View >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          < FlatList
            data={data}
            horizontal
            renderItem={renderScrollViewItem}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
      </View>
      <Text style={{ paddingHorizontal: 25, marginTop: 10, fontWeight: 'bold' }}>Delivery Address</Text>
      <Text style={{ paddingHorizontal: 25, marginTop: 15, fontWeight: 'bold' }}>Tehran,IRAN</Text>
      <Text style={{ paddingHorizontal: 25, marginTop: 10, }}>13 No.13,No.5,Nester Koche St</Text>
      <View style={{ flexDirection: 'row', marginTop: 10, paddingHorizontal: 20 }}>
        <TouchableOpacity style={{ flexDirection: 'row', height: 33, width: 100, backgroundColor: 'white', padding: 5, borderRadius: 60, alignItems: 'center', justifyContent: 'center', }}>
          <Icon name='create-outline' size={15} color="black" />
          <Text style={{ fontSize: 12, marginLeft: 1, fontWeight: 'bold', }}>Edit Address</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 20, flexDirection: 'row', height: 33, width: 100, backgroundColor: 'white', padding: 5, borderRadius: 60, alignItems: 'center', justifyContent: 'center' }}>
          <Icon name='chevron-back-outline' size={15} color="black" />
          <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Add Note</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 20, paddingHorizontal: 15, flexDirection: 'row', }}>
        <Image source={itemImage}
          style={{ height: 80, width: 80 }} />
        <View>
          <Text style={{ marginTop: 22, paddingHorizontal: 10, fontWeight: 'bold' }}>{itemName}</Text>
          <Text style={{ paddingHorizontal: 7 }}>{itemTitle}</Text>
        </View >
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={{ marginLeft: 85, marginTop: 30, height: 25, backgroundColor: 'white', padding: 5, borderRadius: 100, alignItems: 'center', justifyContent: 'center', }}
            onPress={decrement}>
            <Icon name='remove-outline' size={15} color="black" />
          </TouchableOpacity>
          <Text style={{ paddingHorizontal: 10, marginTop: 32, alignItems: 'center' }}>{count}</Text>
          <TouchableOpacity style={{ marginLeft: 1, marginTop: 30, height: 25, backgroundColor: 'white', padding: 5, borderRadius: 100, alignItems: 'center', justifyContent: 'center', }
          } onPress={increment} >
            <Icon name='add-outline' size={15} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={{ fontWeight: 'bold', fontSize: 17, paddingHorizontal: 25 }}>Size</Text>
      <View style={{ flexDirection: 'row', marginTop: 10, paddingHorizontal: 10 }}>
        <TouchableOpacity   style={{ marginLeft: 15, flexDirection: 'row', height: 40, width: 85, backgroundColor: selectedButton === 'S' ? '#f4a460' : 'white',  padding: 5, borderRadius: 10, borderWidth: 1, alignItems: 'center', justifyContent: 'center', }}
       onPress={() => pressButton('S')} >
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>S</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pressButton('M')}  style={{ marginLeft: 15, flexDirection: 'row', height: 40, width: 85, backgroundColor: selectedButton === 'M' ? '#f4a460' : 'white', padding: 5, borderRadius: 10, borderWidth: 1, alignItems: 'center', justifyContent: 'center', }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>M</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={{ marginLeft: 15, flexDirection: 'row', height: 40, width: 85,backgroundColor: selectedButton === 'L' ? '#f4a460' : 'white', padding: 5, borderRadius: 10, borderWidth: 1, alignItems: 'center', justifyContent: 'center', }}
        onPress={() => pressButton('L')}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>L</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity style={{ marginLeft: 20, flexDirection: 'row', height: 45, width: 240, backgroundColor: 'white', padding: 5, borderRadius: 10, alignItems: 'center' }}>
          <Text style={{ fontSize: 12, fontWeight: 'bold', marginLeft: 20 }}>1 Discount is applied</Text>
          <View style={{ marginLeft: 80 }}>
            <Icon name='chevron-forward-outline' size={15} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      <Text style={{ marginTop: 10, paddingHorizontal: 20, fontWeight: 'bold' }}>Payment Summary</Text>
      <View style={{ flexDirection: 'row', marginTop: 15, paddingHorizontal: 20, }}>
        <Text style={{ fontWeight: 'bold' }}>Price</Text>
        <Text style={{ marginLeft: 270, fontWeight: 'bold' }}>{`$${calculateTotal().toFixed(2)}`}</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 15, paddingHorizontal: 20, }}>
        <Text style={{ fontWeight: 'bold' }}>Delivery fee</Text>
        <Text style={{ marginLeft: 255, fontWeight: 'bold' }}>${deliveryFee}</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 15, paddingHorizontal: 20, }}>
        <Text style={{ fontWeight: 'bold' }}>Total Payment</Text>
        <Text style={{ marginLeft: 210, fontWeight: 'bold' }}>{<Text style={{ marginLeft: 272, fontWeight: 'bold' }}>{`$${calculateTotalWithDelivery().toFixed(2)}`}</Text>}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../assets/white.jpg')} // Replace with the path to your image
          style={{
            marginTop: 20,
            width: 385,
            height: 170,
            borderTopRightRadius: 20, // Adjust the radius as needed
            overflow: 'hidden', // Ensure the image is clipped by the border radius
            borderTopLeftRadius: 20
          }}
          resizeMode="cover"
        >
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            <Icon name='wallet-outline' size={20} color="#f4a460" style={{ marginTop: 10, paddingHorizontal: 15 }} />
            <TouchableOpacity style={{ marginTop: 5, flexDirection: 'row', height: 30, width: 80, backgroundColor: '#f4a460', padding: 5, borderRadius: 80, alignItems: 'center', }}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', marginLeft: 20, color: 'white' }}>Cash</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 5, flexDirection: 'row', height: 30, width: 80, backgroundColor: 'white', padding: 5, borderRadius: 80, alignItems: 'center', borderWidth: 1 }}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', marginLeft: 20, color: 'black' }}>{`$${calculateTotalWithDelivery().toFixed(2)}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 120, marginTop: 5, height: 30, width: 45, backgroundColor: 'silver', borderRadius: 100, alignItems: 'center', }}>
              <Icon name='ellipsis-horizontal-outline' size={15} color="white" style={{ marginTop: 10, paddingHorizontal: 15 }} />
            </TouchableOpacity>
          </View>

          <View style={{ paddingHorizontal: 20, }}>

            <TouchableOpacity style={{ marginLeft: 25, flexDirection: 'row', height: 50, width: 300, backgroundColor: '#f4a460', padding: 5, borderRadius: 10, alignItems: 'center' }}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', marginLeft: 130, color: 'white' }}>Order</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};
export default OrderScreen;