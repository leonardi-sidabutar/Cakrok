import React from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';

export default function Print() {
  const requestPermissions = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 31) {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);
    }
  };

  const printTest = async () => {
    try {
      await requestPermissions();

      const devices = await RNBluetoothClassic.getBondedDevices();

      if (devices.length === 0) {
        Alert.alert('Tidak ada device terpairing');
        return;
      }

      // GANTI sesuai nama printer kamu
      const printer = devices.find(device =>
        device.name === 'RPP02N'
      );

      if (!printer) {
        Alert.alert('Printer tidak ditemukan di device pairing');
        return;
      }

      const connected = await printer.connect();

      if (!connected) {
        Alert.alert('Gagal connect ke printer');
        return;
      }

      // ===== ESC/POS COMMAND =====
      const ESC = '\x1B';
      const boldOn = ESC + '\x45\x01';
      const boldOff = ESC + '\x45\x00';
      const center = ESC + '\x61\x01';
      const left = ESC + '\x61\x00';
      const cut = ESC + '\x64\x03';

      const receipt =
        center +
        boldOn +
        'toko ginting jaya RN\n' +
        boldOff +
        left +
        '--------------------------------\n' +
        'Nasi Goreng        15000\n' +
        'Es Teh              5000\n' +
        '--------------------------------\n' +
        boldOn +
        'TOTAL              20000\n' +
        boldOff +
        '\n' +
        center +
        'Jangan Lupa Bahagia\n\n\n' +
        cut;

      await printer.write(receipt);

      await printer.disconnect();

      Alert.alert('Print berhasil ✅');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Test Print Thermal</Text>
      <Button title="PRINT TEST" onPress={printTest} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
});
