import React from 'react';
import { View, Text,Image,  StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { auth} from "../../scripts/firebaseConfig"; 
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';

type Prediction = {
  Calcium: 'High'|'Normal'|'Low';
  Magnesium: 'High'|'Normal'|'Low';
  Potassium: 'High'|'Normal'|'Low';
};

// Define the route parameter type
type ImbalanceScreenParams = {
  prediction: Prediction | null;
};
type ImbalanceScreenProps = {
  navigation: NativeStackNavigationProp<any, any>;
};

const ElectrolytesImbalanceScreen : React.FC<ImbalanceScreenProps> = ({ navigation })=>{
  
  const user = auth.currentUser;
   

  if (!user) {
    Alert.alert("Error", "User not authenticated. Please log in again.");
    navigation.navigate("Login");
    return;
  }
  
  const route = useRoute<RouteProp<{ Imbalance: ImbalanceScreenParams }, 'Imbalance'>>();
  const { prediction } = route.params || { prediction: null };
  console.log(prediction);
  const Calcium=prediction?.Calcium
  const Potassium=prediction?.Potassium
  const Magnesium=prediction?.Magnesium


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* Back Button on the Left */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('./images/back.png')} style={styles.backIcon} />
        </TouchableOpacity>

        {/* Title in the center */}
        <Text style={styles.title}>Electrolytes Imbalance</Text>

        {/* Dropdown Button on the Right */}
        <TouchableOpacity onPress={() => {/* Add dropdown functionality here */}} style={styles.dropdownButton}>
          <Image source={require('./images/user.png')} style={styles.dropdown} />
        </TouchableOpacity>
      </View>

      <View style={[styles.card,Potassium==='High'?styles.high:Potassium==='Normal'?styles.normal:styles.low]}>
        <Text style={styles.levelType}>Potassium Levels</Text>
        <Text style={Potassium==='High'?styles.levelStatusHigh:Potassium==='Normal'?styles.levelStatusNormal:styles.levelStatusLow}>{Potassium}</Text>
      </View>

      <View style={[styles.card,Calcium==='High'?styles.high:Calcium=='Normal'?styles.normal:styles.low]}>
        <Text style={styles.levelType}>Calcium Levels</Text>
        <Text style={Calcium==='High'?styles.levelStatusHigh:Calcium==='Normal'?styles.levelStatusNormal:styles.levelStatusLow}>{Calcium}</Text>
      </View>

      <View style={[styles.card,Magnesium==='High'?styles.high:Magnesium==='Normal'?styles.normal:styles.low]}>
        <Text style={styles.levelType}>Magnesium Levels</Text>
        <Text style={Magnesium==='High'?styles.levelStatusHigh:Magnesium==='Normal'?styles.levelStatusNormal:styles.levelStatusLow}>{Magnesium}</Text>
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
  card: {
    padding: 30,
    borderRadius: 20,
    marginBottom: 14,
    margin: 20,
  },
  normal: {
    backgroundColor: '#d3eedd',
  },
  low: {
    backgroundColor: '#f5f5dc',
  },
  high: {
    backgroundColor: '#f8d7da',
  },
  levelType: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  levelStatusNormal: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'green',
  },
  levelStatusLow: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#b0a217',
  },
  levelStatusHigh: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#d9534f',
  },

  backIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  }

});

export default ElectrolytesImbalanceScreen;
