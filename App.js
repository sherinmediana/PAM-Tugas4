import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Tidak Melakukan Scan')

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  useEffect(() => {
    askForCameraPermission();
  }, []);


  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data)
    console.log('Type: ' + type + '\nData: ' + data)
  };

  
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>)
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>Akses Tidak di Izinkan</Text>
        <Button title={'Izinkan'} onPress={() => askForCameraPermission()} />
      </View>)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Selamat Datang di Aplikasi QBaR-code
      </Text>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 500, width: 500 }} />
      </View>
      <Text style={styles.maintext}>{text}</Text>

      {scanned && <Button title={'Scan ulang'} onPress={() => setScanned(false)} color='#21325E' />}
      
      <View>
          <Text style={styles.copyright}>Sherin Mediana Putri 119140050</Text>
        </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom:20,
    marginTop:5,
    paddingLeft:10,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 350,
    width: 350,
    overflow: 'hidden',
    borderRadius: 40,
    backgroundColor: '#21325E'
  },
  copyright: {
    color : 'black',
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 30,
    textAlign: 'center'
  }
});