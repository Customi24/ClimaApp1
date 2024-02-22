import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity,Image} from 'react-native';

export default function App() {

  const [city, setCity] = useState('');
  const [weatherData, setweatherData] = useState(null);
  const [error, setError] = useState(null);
  
  const fetchWeatherData = async () => {
    
    const API_KEY = '6a0ade60d48d4b09b07140221242202'
    
    try{
      const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=yes&alerts=no`)
      const data = await res.json();
      setweatherData(data);
      setError(null);
    }
    catch (e){
      console.error(e)
      setError('Error fetching weather data');
    }
  };

  useEffect( () => {
    city ? fetchWeatherData : setError;
  }, [city]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.encabezado}>
        <Text style={styles.title}>Welcome to WeatherApp</Text>
        <TextInput 
          style={styles.textInput}
          placeholder='Enter your location'
          value={city}
          onChangeText={(text) =>{
            setCity(text);
          }}
        />
        <TouchableOpacity 
          style={styles.button}
          onPress={fetchWeatherData}>
          <Text>CONSULT WEATHER</Text>
        </TouchableOpacity>
      </View>
      {error && (<Text>{error}</Text>)}
      {weatherData && (
        <View style={styles.clima}>
          <>
          <Text style={styles.weatherTxt2}>CITY</Text>
          <Text style={styles.weatherTxt}>{weatherData.location.name}</Text>
          
          <Text style={styles.weatherTxt1}>{weatherData.current.temp_c}°C</Text>
          <Text style={styles.weatherTxt2}>{weatherData.current.condition.text}</Text>
          </>
        </View>
        )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom:20,
    alignContent: 'center',
    backgroundColor: '#99C3D1',
    height:'100%',
  },
  clima:{
    
    marginTop: 170,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'rgba(245, 252, 255, 0.9)',
    elevation: 5,
    borderRadius: 10, 
    width: 250,
    height: 250,
    marginLeft: 70,
    
  },
  encabezado:{
    marginTop: 55,
    backgroundColor: 'rgba(245, 252, 255, 0.9)',
    alignContent: 'center',
    justifyContent: 'center',
    marginRight:25,
    marginLeft:18,
    height: 180,
    borderRadius: 10,
    
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 5,
    marginTop: 20,
    marginBottom: 15,
    marginLeft: '15%',
    width: 250,
  },
  button: {
    backgroundColor: '#0BD5C4',
    width: 250,
    height: 35,
    borderRadius: 5,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '15%',
    
  },
  
  
  weatherTxt: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginVertical:15,
    backgroundColor: '#C4DBE2',
    borderRadius:5,

  },
  weatherTxt1: {
    color: 'black',
    fontSize: 70,
    textAlign: 'center',
    
    
  },
  weatherTxt2: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
    marginVertical:8,
    
  },
  
  icono:{
    marginTop: 20,
    alignItems: 'center',
    justifyContent:'center',
    width: 30,
    height: 30,
  },
});