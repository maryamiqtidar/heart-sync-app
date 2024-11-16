import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageSourcePropType } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<any, any>;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HEART{'\n'}SYNC</Text>
      <Text style={styles.subtitle}>Detect electrolyte imbalances{'\n'}with ECG data analysis</Text>
      <Image source={require('./images/heart.png') as ImageSourcePropType} style={styles.image} />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('login')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
   
  },
  title: {
    fontSize: 90,
    fontFamily: 'Poiret One',
    color: '#D2341B',
    textAlign: 'center',
    fontWeight: '200', // Use '100' or '200' for an even thinner appearance
    top: 30,
    lineHeight: 85,
    letterSpacing:2,
  },
  
  subtitle: {
    fontSize: 25,
    color: '000000',
    textAlign: 'center',
    lineHeight: 30,
    fontFamily: 'poppins',
    fontWeight: '300',
    top: 50,  
    letterSpacing:1.5,  
  },

  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 30,
    top: 70,
    left: -5,

  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    top: 80,
  },
  buttonText: {
    fontFamily: 'poppins',
    color: '#000000',
    fontSize: 20,
   
    fontWeight: '300',
  },
});

export default WelcomeScreen;
