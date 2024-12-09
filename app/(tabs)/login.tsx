import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../scripts/firebaseConfig"; // Ensure the correct path

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<any, any>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  // const navigation = useNavigation();
  const [email, setEmail] = useState(""); // Added state for email
  const [password, setPassword] = useState(""); // Added state for password

  // Handle Login with Firebase Authentication
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      Alert.alert(" Login Successful", `for, ${userCredential.user.email}!`);
      
      // Navigate to ProfileScreen after successful login
      navigation.navigate("ProfileScreen");
    } catch (error: any) {
      Alert.alert("Login Error", error.message);
    }
  };
  

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjusts for all platforms
      
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            {/* Image */}
            <Image
              source={require("./images/heartbeat.png")}
              style={styles.ecgImage}
            />
            {/* Title */}
            <Text style={styles.title}>HEART{"\n"}SYNC</Text>
            {/* Subtitle */}
            <Text style={styles.subtitle}>Detect electrolyte imbalances</Text>

            {/* Email Input */}
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#A9A9A9"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            {/* Password Input */}
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#A9A9A9"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {/* Login Button */}
            <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
              <Text style={styles.signInButtonText}>Login</Text>
            </TouchableOpacity>

            {/* Sign Up Navigation */}
            <View style={styles.signUpSection}>
              <Text style={styles.signUpText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text style={styles.signUpLink}>Sign up</Text>
              </TouchableOpacity>
            </View>
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
