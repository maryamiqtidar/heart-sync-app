import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { auth } from '@/scripts/firebaseConfig';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { onAuthStateChanged, signOut } from "firebase/auth";

interface HistoryItem {
  date: string;
  time: string;
  "K+": string;
  "Ca+": string;
  "Mg+": string;
}

type HistoryProps = {
  navigation: NativeStackNavigationProp<any, any>;
};

const HistoryScreen: React.FC<HistoryProps> = ({ navigation }) => {
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigation.navigate("Login"); // Redirect to LoginScreen if the user is not authenticated
      }
    });

    return unsubscribe; // Cleanup subscription on unmount
  }, [navigation]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) {
          Alert.alert("Error", "User ID is missing.");
          setLoading(false);
          return;
        }

        const response = await fetch(`http://ec2-54-146-247-46.compute-1.amazonaws.com/history?user_id=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          setHistoryData(data.prediction || []);
        } else {
          Alert.alert("Error", data.message || "Failed to fetch history.");
        }
      } catch (error) {
        console.error("Error fetching history:", error);
        Alert.alert("Error", "An error occurred while fetching history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate("Welcome"); // Redirect to Welcome screen after logout
    } catch (error) {
      Alert.alert("Logout Failed", "An error occurred while logging out. Please try again.");
      console.error("Logout Error: ", error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('./images/back.png')} style={styles.backIcon} />
        </TouchableOpacity>

        <Text style={styles.title}>History</Text>

        <TouchableOpacity onPress={() => handleLogout()} style={styles.dropdownButton}>
          <Image source={require('./images/user.png')} style={styles.dropdown} />
        </TouchableOpacity>
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Date</Text>
          <Text style={styles.tableHeaderText}>Time</Text>
          <Text style={styles.tableHeaderText}>K+</Text>
          <Text style={styles.tableHeaderText}>Ca+</Text>
          <Text style={styles.tableHeaderText}>Mg</Text>
        </View>

        <ScrollView>
          {historyData.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.date}</Text>
              <Text style={styles.tableCell}>{item.time}</Text>
              <Text style={[styles.tableCell, item["K+"] === 'Normal' ? styles.normal : styles.high]}>
                {item["K+"]}
              </Text>
              <Text style={[styles.tableCell, item["Ca+"] === 'Normal' ? styles.normal : styles.high]}>
                {item["Ca+"]}
              </Text>
              <Text style={[styles.tableCell, item["Mg+"] === 'Normal' ? styles.normal : styles.low]}>
                {item["Mg+"]}
              </Text>
            </View>
          ))}
        </ScrollView>
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
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  menuButton: {
    fontSize: 24,
    color: 'black',
  },
  tableContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    margin: 20,
    top:-20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  tableCell: {
    fontSize: 14,
    color: 'black',
    flex: 1,
    textAlign: 'center',
  },
  normal: {
    color: 'green',
  },
  low: {
    color: '#b0a217',
  },
  high: {
    color: '#d9534f',
  },
  footer: {
    position: 'absolute', // Makes the footer stick to the bottom
    bottom: 0, // Aligns it at the very bottom
    left: 0, // Ensures it stretches to the left
    right: 0, // Ensures it stretches to the right
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Optional: Background color to make it stand out
    paddingVertical: 10,
    borderTopWidth: 1, // Optional: Add a border at the top of the footer for better separation
    borderTopColor: '#ccc',
  },
  
  footerButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default HistoryScreen;
