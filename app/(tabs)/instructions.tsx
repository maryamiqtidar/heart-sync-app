import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { auth} from "../../scripts/firebaseConfig"; // Ensure the correct path
import { onAuthStateChanged, signOut } from "firebase/auth";
// import database from '@react-native-firebase/database';
import axios from "axios";

type InstructionsScreenProps = {
  navigation: NativeStackNavigationProp<any, any>;
};

const InstructionsScreen: React.FC<InstructionsScreenProps> = ({ navigation }) => {
  // Function to trigger the API
  const [isLoading, setIsLoading] = useState(false);
  const triggerCheckElectrolytes = async () => {
    const user = auth.currentUser;
   

    if (!user) {
      Alert.alert("Error", "User not authenticated. Please log in again.");
      navigation.navigate("Login");
      return;
    }

    const userId = user.uid; // Retrieve the UID from Firebase Authentication
    //HTTP server will be here
    //const response = await fetch("http://192.168.0.72/ecg", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ user_id: user.uid }),
//     });
    const apiUrl = "http://ec2-54-146-247-46.compute-1.amazonaws.com/trigger";

    Alert.alert("Checking Electrolyte",'Stay Still!');
    // try {
    //   const response = await fetch(apiUrl, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       user_id: userId, // Send user_id in the request body
    //     }),
    //   });

    //   if (response.ok) {
    //     Alert.alert("Results are Available Now");
    //   } else {
    //     const errorData = await response.json();
    //     Alert.alert("Error", `Failed to trigger: ${errorData.message}`);
    //   }
    // } catch (error: any) {
    //   Alert.alert("Error", `Failed to trigger API: ${error.message}`);
    // }
    setIsLoading(true);
    try {
      // Construct the Firebase path for the specific user
      const userPath = `/users/${user.uid}/ecg_data/entries`;

      // Fetch data from Firebase
      // const snapshot = await database().ref(userPath).once('value');

      // if (!snapshot.exists()) {
      //   console.error('No ECG data found for the user in Firebase.');
      //   setIsLoading(false);
      //   return;
      // }

      // Retrieve the first entry for the user
      // const entries = snapshot.val();
      // const entryKey = Object.keys(entries)[0]; // Get the first key under entries
      // const ecgData = entries[entryKey]?.ecg_value;

      // if (!ecgData) {
      //   console.error('No ECG data available for the user.');
      //   setIsLoading(false);
      //   return;
      // }

      // // Prepare data for the prediction API
      const dataToSend = { user_id:userId };

      // Call the prediction API using local since updated not deployed waiting on esp32 http server so will deploy everything 
      const response = await axios.post(
        'http://ec2-54-146-247-46.compute-1.amazonaws.com/process-data',
        dataToSend
      );

      const prediction = response.data.prediction.prediction_value;
      console.log(response.data);
      // Navigate to the Imbalance screen with the prediction value
      navigation.navigate('Imbalance', { prediction });
    } catch (error) {
      console.error('Error retrieving data or fetching prediction:', error);
    } finally {
      setIsLoading(false);
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
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate("Welcome"); // Redirect to Welcome screen after logout
    } catch (error) {
      Alert.alert("Logout Failed", "An error occurred while logging out. Please try again.");
      console.error("Logout Error: ", error);
    }
  };

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
        <TouchableOpacity onPress={() => navigation.navigate('History')}>
          <Image source={require('./images/history.png')} style={styles.icon}  />
        </TouchableOpacity>

        {/* Right Button - Navigate to Welcome Screen */}
        <TouchableOpacity onPress={handleLogout}>
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
