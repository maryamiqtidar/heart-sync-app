import React from 'react';
import { View, Text, Image , StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HistoryScreen = () => {
  // Sample data for history records
  const historyData = [
    { date: '23/10/2024', time: '11:39', potassium: 'Normal', calcium: 'High', magnesium: 'Low' },
    { date: '23/10/2024', time: '22:21', potassium: 'High', calcium: 'High', magnesium: 'Normal' },
    
  ];

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.header}>
        {/* Back Button on the Left */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('./images/back.png')} style={styles.backIcon} />
        </TouchableOpacity>

        {/* Title in the center */}
        <Text style={styles.title}>History</Text>

        {/* Dropdown Button on the Right */}
        <TouchableOpacity onPress={() => {/* Add dropdown functionality here */}} style={styles.dropdownButton}>
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
              <Text style={[styles.tableCell, item.potassium === 'Normal' ? styles.normal : styles.high]}>
                {item.potassium}
              </Text>
              <Text style={[styles.tableCell, item.calcium === 'Normal' ? styles.normal : styles.high]}>
                {item.calcium}
              </Text>
              <Text style={[styles.tableCell, item.magnesium === 'Normal' ? styles.normal : styles.low]}>
                {item.magnesium}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

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
