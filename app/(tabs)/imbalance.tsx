import React from 'react';
import { View, Text,Image,  StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ElectrolytesImbalanceScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* Back Button on the Left */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('./images/back.png')} style={styles.backIcon} />
        </TouchableOpacity>

        {/* Title in the center */}
        <Text style={styles.title}>Electrolytes Imbalance</Text>

        {/* Dropdown Button on the Right */}
        <TouchableOpacity onPress={() => {/* Add dropdown functionality here */}} style={styles.dropdownButton}>
          <Image source={require('./images/user.png')} style={styles.dropdown} />
        </TouchableOpacity>
      </View>

      <View style={[styles.card, styles.normal]}>
        <Text style={styles.levelType}>Potassium Levels</Text>
        <Text style={styles.levelStatusNormal}>Normal</Text>
      </View>

      <View style={[styles.card, styles.low]}>
        <Text style={styles.levelType}>Calcium Levels</Text>
        <Text style={styles.levelStatusLow}>Low</Text>
      </View>

      <View style={[styles.card, styles.high]}>
        <Text style={styles.levelType}>Magnesium Levels</Text>
        <Text style={styles.levelStatusHigh}>High</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    marginTop:13,
    marginLeft:8,
  },
  backButton: {
    marginRight: 10,
    marginLeft:15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left', // Keep the title centered
    flex: 1, // This ensures the title takes all available space
  },
  dropdownButton: {
    padding: 10,
    marginRight:23,
  },
  dropdown: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  card: {
    padding: 30,
    borderRadius: 20,
    marginBottom: 14,
    margin: 20,
  },
  normal: {
    backgroundColor: '#d3eedd',
  },
  low: {
    backgroundColor: '#f5f5dc',
  },
  high: {
    backgroundColor: '#f8d7da',
  },
  levelType: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  levelStatusNormal: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'green',
  },
  levelStatusLow: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#b0a217',
  },
  levelStatusHigh: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#d9534f',
  },

  backIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  }

});

export default ElectrolytesImbalanceScreen;
