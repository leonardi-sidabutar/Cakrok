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
      const normalSize = '\x1D\x21\x00';
      const smallText = '\x1B\x4D\x01'; // font B (lebih kecil, jika didukung)
      const normalFont = '\x1B\x4D\x00'; // font A


      const receipt =
        center +
        '\n' +        
        boldOn +
        'CAKROK BAHAGIA\n' +
        boldOff +
        smallText +
        'Jln. Pantai Halim Marindal I\n' +
        normalFont +
        left +
        '================================\n' +
        'Transaction: #CO-0001           \n' +
        'Tanggal: 18/02/2026             \n' +
        'No. Meja: 12                    \n' +
        '--------------------------------\n' +
        'Sanger                          \n' +
        '2x @12.000              = 24.000\n' +
        'Americano                       \n' +
        '2x @22.000              = 44.000\n' +
        '--------------------------------\n' +
        boldOn +
        'TOTAL                  Rp 68.000\n' +
        boldOff +
        '--------------------------------\n' +
        center +
        smallText +        
        'Terima Kasih Atas Kunjungan Anda\n' +
        'Kritik & Saran\n' +
        '089505053793\n' +
        normalFont +
        '================================\n' +
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
