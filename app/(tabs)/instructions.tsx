import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { auth } from "../../scripts/firebaseConfig"; // Ensure the correct path
import { onAuthStateChanged } from "firebase/auth";

type InstructionsScreenProps = {
  navigation: NativeStackNavigationProp<any, any>;
};

const InstructionsScreen: React.FC<InstructionsScreenProps> = ({ navigation }) => {
  // Function to trigger the API
  const triggerCheckElectrolytes = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Error", "User not authenticated. Please log in again.");
      navigation.navigate("LoginScreen");
      return;
    }

    const userId = user.uid; // Retrieve the UID from Firebase Authentication
    const apiUrl = "https://cupnd89ium.us-east-1.awsapprunner.com/trigger";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId, // Send user_id in the request body
        }),
      });

      if (response.ok) {
        Alert.alert("Success", "Check Electrolytes triggered successfully!");
      } else {
        const errorData = await response.json();
        Alert.alert("Error", `Failed to trigger: ${errorData.message}`);
      }
    } catch (error: any) {
      Alert.alert("Error", `Failed to trigger API: ${error.message}`);
    }
  };
  // Authorization: Ensure only authenticated users access this screen
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Redirect to LoginScreen if the user is not authenticated
        navigation.navigate("Login");
      }
    });

    return unsubscribe; // Cleanup subscription on unmount
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button and Title */}
      <View style={styles.header}>
        {/* Back Button on the Left */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require("./images/back.png")} style={styles.backIcon} />
        </TouchableOpacity>

        {/* Title in the center */}
        <Text style={styles.title}>Electrolytes Imbalance</Text>

        {/* Dropdown Button on the Right */}
        <TouchableOpacity onPress={() => { /* Add dropdown functionality here */ }} style={styles.dropdownButton}>
          <Image source={require("./images/user.png")} style={styles.dropdown} />
        </TouchableOpacity>
      </View>

      <Image source={require('./images/sensor.png')} style={styles.deviceImage} />
      <Text style={styles.instructionText}>Ensure Your ECG Device is Ready.</Text>

      <Image source={require('./images/placement.png')} style={styles.sensorsImage} />
      <Text style={styles.instructionText}>Place ECG Sensors Correctly.</Text>

      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionTitle}>Right Arm (RA):</Text>
        <Text style={styles.instructionDetails}>
          Place the electrode on the inside of the right upper arm, just below the shoulder.
        </Text>

        <Text style={styles.instructionTitle}>Left Arm (LA):</Text>
        <Text style={styles.instructionDetails}>
          Place the electrode on the inside of the left upper arm, mirroring the position on the right arm.
        </Text>

        <Text style={styles.instructionTitle}>Right / Left Leg (RL / LL):</Text>
        <Text style={styles.instructionDetails}>
          Place the electrode on the lower part of the right / left leg, just above the ankle.
        </Text>
      </View>

      <Text style={styles.warningText}>Stay Still during Recording.</Text>

      <TouchableOpacity style={styles.button} onPress={triggerCheckElectrolytes}>
          <Text style={styles.buttonText}>Check Electrolytes</Text>
        </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        {/* Left Button - Navigate to History Screen */}
        <TouchableOpacity onPress={() => navigation.navigate('history')}>
          <Image source={require('./images/history.png')} style={styles.icon}  />
        </TouchableOpacity>

        {/* Right Button - Navigate to Welcome Screen */}
        <TouchableOpacity onPress={() => navigation.navigate('welcome')}>
          <Image source={require('./images/logout.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 20,
    paddingTop: 55,
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,

  },
  backButton: {
    marginRight: 10,
  },
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
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
  },
  dropdown: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  deviceImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  sensorsImage: {
    width: 150,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  instructionsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  instructionDetails: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 10,
  },
  warningText: {
    fontSize: 23,
    color: '#E74C3C',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#D2341B',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default InstructionsScreen;
