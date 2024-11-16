import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./images/heartbeat.png')}
        style={styles.ecgImage}
      />
      <Text style={styles.title}>HEART SYNC</Text>
      <Text style={styles.subtitle}>Detect electrolyte imbalances</Text>

      <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#AAA" />
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#AAA" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#AAA" secureTextEntry={true} />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Create an account</Text>
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
      ecgImage: {
        width: 300,
        height: 200,
        resizeMode: 'contain',
        opacity:0.4,
        
      },
      title: {
        fontSize: 80,
        fontFamily: 'Poiret One',
        color: '#D2341B',
        textAlign: 'center',
        fontWeight: '200',
        top: -30,
        lineHeight: 85,
        letterSpacing:2,
      },
      
      subtitle: {
        fontSize: 25,
        color: '#000000',
        fontFamily: 'poppins',
        fontWeight: '300',
        textAlign: 'center',
        marginBottom: 30,
        letterSpacing:1.5, 
        top: -20, 
      },
    
      input: {
        width: '80%',
        height: 50,
        backgroundColor: '#F0F0F0',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        top: -20,
      },

    button: {
        backgroundColor: '#D2341B',
        width: '80%',
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'poppins',
        fontWeight: '600',
    },
});

export default SignUpScreen;
