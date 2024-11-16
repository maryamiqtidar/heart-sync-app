import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<any, any>;
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./images/heartbeat.png')}
        style={styles.ecgImage}
      />
      <Text style={styles.title}>Electrolytes Imbalance</Text>
      <Text style={styles.subtitle}>Detect Imbalances</Text>

      <Text style={styles.sectionTitle}>Details</Text>
      <Text style={styles.detailsText}>
        HeartSync provides the detection of electrolyte imbalances through ECG data analysis. Stay informed about your
        potassium, calcium, and magnesium levels for optimal health.
      </Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Get details</Text>
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
        fontSize: 60,
        fontFamily: 'poppins',
        color: 'black',
        textAlign: 'center',
        fontWeight: '300',
        top: -30,
        lineHeight: 60,
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
        top: -25, 
      },

      sectionTitle: {
        fontSize: 22,
        color: '#000000',
        fontFamily: 'poppins',
        fontWeight: 'bold',
        textAlign: 'left',
        letterSpacing: 1.5,
        top: -25,
        width: '85%',  // Ensures the text component takes the full width
      },
    
      detailsText: {
          fontSize: 22,
          color: '#000000',
          fontFamily: 'poppins',
          textAlign: 'left',
          marginBottom: 50,
          letterSpacing: 1.5,
        
          fontWeight: '300',
          width: '85%',
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


      footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 30,
      },
      
      icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
      },
});

export default ProfileScreen;
