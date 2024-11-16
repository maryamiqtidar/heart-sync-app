import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from 'react-native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<any, any>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Heartbeat image */}
      <Image
        source={require('./images/heartbeat.png') as ImageSourcePropType}
        style={styles.ecgImage}
      />
      {/* Title */}
      <Text style={styles.title}>HEART{'\n'}SYNC</Text>
      {/* Subtitle */}
      <Text style={styles.subtitle}>Detect electrolyte imbalances</Text>

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#A9A9A9"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#A9A9A9"
        secureTextEntry
      />

      {/* Forgot Password */}
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Sign In Button */}
      <TouchableOpacity
        style={styles.signInButton}
        onPress={() => navigation.navigate('profile')}
      >
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Sign Up Section */}
      <View style={styles.signUpSection}>
        <Text style={styles.signUpText}>Create an account </Text>
        <TouchableOpacity onPress={() => navigation.navigate('signup')}>
          <Text style={styles.signUpLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
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
    opacity: 0.4,
  },
  title: {
    fontSize: 80,
    fontFamily: 'Poiret One',
    color: '#D2341B',
    textAlign: 'center',
    fontWeight: '200',
    top: -30,
    lineHeight: 85,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 25,
    color: '#000000',
    fontFamily: 'poppins',
    fontWeight: '300',
    textAlign: 'center',
    marginBottom: 30,
    letterSpacing: 1.5,
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
  forgotPassword: {
    fontSize: 14,
    color: 'black',
    alignSelf: 'flex-end',
    marginLeft: '50%',
    marginTop: -25,
    marginBottom: 20,
  },
  signInButton: {
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
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'poppins',
    fontWeight: '600',
  },
  signUpSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 14,
    color: '#808080',
    fontFamily: 'poppins',
    left: -40,
    top: 20,
  },
  signUpLink: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'poppins',
    fontWeight: '600',
    right: -30,
    top: 20,
  },
});

export default LoginScreen;
