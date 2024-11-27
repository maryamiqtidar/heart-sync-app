import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView, Keyboard, Platform } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { auth } from '../../scripts/firebaseConfig'; // Adjust path if needed

type SignupScreenProps = {
  navigation: NativeStackNavigationProp<any, any>;
};
const SignUpScreen : React.FC<SignupScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', `User registered: ${userCredential.user.email}`);
      navigation.navigate("Login");
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({
        ios: 'padding',
        android: 'height',
        default: undefined, // Default for unsupported platforms
      })}
      // keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Image
              source={require('./images/heartbeat.png')}
              style={styles.ecgImage}
            />
            <Text style={styles.title}>HEART SYNC</Text>
            <Text style={styles.subtitle}>Detect electrolyte imbalances</Text>

            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#AAA"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#AAA"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#AAA"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Create an account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
