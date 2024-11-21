import React from 'react';
import { View, Text, TouchableOpacity,StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const ElectrolyteImbalanceScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Back Button on the Left */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('./images/back.png')} style={styles.backIcon} />
        </TouchableOpacity>

        {/* Title in the center */}
        <Text style={styles.title}>Electrolytes Placement</Text>

        {/* user Button on the Right */}
        <TouchableOpacity onPress={() => {/* Add user functionality here */}} style={styles.userButton}>
          <Image source={require('./images/user.png')} style={styles.user} />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Image
          source={require('./images/heart.png')} 
          style={styles.image}
        />
        <Text style={styles.processingText}>Processing data...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 20,
    paddingTop: 45,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,// Explicitly ensure no line is drawn
  },
  
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left', // Keep the title centered
    flex: 1, // This ensures the title takes all available space
  },

  userButton: {
    padding: 10,
  },
  user: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  backButton: {
    marginRight: 10,
  },
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    opacity:0.8,
    top:-50,
  },
  processingText: {
    fontSize: 25,
    color: 'black',
    top:-50,
  },
});

export default ElectrolyteImbalanceScreen;
