/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Image, StyleSheet,Text} from 'react-native';
import monteyHallImage from '../assets/monteyHall.png';

const Header = () => {
  return (
    <View style={styles.container}>
    <Text style={styles.textStyle}>Welcome To MonteyHall Game</Text>
      <Image style={styles.image} source={monteyHallImage} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  },
  image: {
    height: 200,
    width: '100%',
    borderWidth: 1
  },
  textStyle: {
      fontSize: 22,
      color: '#000',
      marginVertical: 10,
      textAlign: 'center'
  }
});

export default Header;
