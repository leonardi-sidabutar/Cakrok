import { ScrollView, StyleSheet, Text, View, Animated, PanResponder, Image, TouchableOpacity, Modal, Button, Alert, Platform, PermissionsAndroid } from 'react-native'
import {useState, useMemo, useRef, useContext, useEffect, useCallback} from 'react'
import Icon from "react-native-vector-icons/Ionicons";
import { OrderContext } from '../../context/Context';
// bluetooth
import RNBluetoothClassic from 'react-native-bluetooth-classic';

export default function Receipt() {

    const {orders,total,decreaseQty} = useContext(OrderContext);

    const today = new Date();
    const options = { 
      weekday: 'long',  // nama hari
      day: '2-digit',   // tanggal
      month: 'short',   // nama bulan 3 huruf
      year: 'numeric'   // tahun 4 digit
    };
    const formattedDate = today.toLocaleDateString('id-ID', options);

    const day = String(today.getDate()).padStart(2, '0');       // 18
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Februari = 02
    const year = today.getFullYear();                            // 2026
    const dateReceipt = `${day}/${month}/${year}`;    
    
    const orderRef = useRef(orders);
    const totalRef = useRef(total);

    useEffect(()=>{
      orderRef.current = orders;
      totalRef.current = total;
    },[orders, total])

    const requestPermissions = async () => {
      if (Platform.OS === 'android' && Platform.Version >= 31) {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);
      }
    };

    const printTest = useCallback( async () => {
      try {
        await requestPermissions();

        const devices = await RNBluetoothClassic.getBondedDevices();

        if (devices.length === 0) {
          // Alert.alert('Tidak ada device terpairing');
          setAlertPayment(true)
          return;
        }

        // GANTI sesuai nama printer kamu
        const printer = devices.find(device =>
          device.name === 'RPP02N'
        );

        if (!printer) {
          // Alert.alert('Printer tidak ditemukan di device pairing');
          console.log('Printer tidak ditemukan di device pairing');
          return;
        }

        const connected = await printer.connect();

        if (!connected) {
          // Alert.alert('Gagal connect ke printer');
          console.log('Gagal connect ke printer');
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

        let receipt = '';
        receipt += center;
        receipt += '\n';
        receipt += boldOn ;
        receipt += 'CAKROK BAHAGIA\n' ;
        receipt += boldOff ;
        receipt += smallText ;
        receipt += 'Jln. Pantai Halim Marindal I\n' ;
        receipt += normalFont ;
        receipt += left ;
        receipt += '================================\n';
        receipt +=  'Transaction: #CO-0001           \n';
        receipt +=  `Tanggal: ${dateReceipt}         \n`;
        receipt +=  'No. Meja: 12                    \n';
        receipt +=  '--------------------------------\n'; 

        // // Loop orders
        orderRef.current.forEach(item => {
          receipt += `${item.nama.padEnd(32, ' ')}\n`;
          receipt += `${item.qty}x @${item.harga.toLocaleString('id-ID').padEnd(16,' ')}= ${(item.qty*item.harga).toLocaleString('id-ID')}\n`;
        });

        receipt += '--------------------------------\n';
        receipt += boldOn;
        receipt += `TOTAL               Rp. ${(totalRef.current).toLocaleString('id-ID')}\n`;
        receipt += boldOff;
        receipt += '--------------------------------\n';
        receipt += center;
        receipt += smallText;
        receipt += 'Terima Kasih Atas Kunjungan Anda\n';
        receipt += 'Kritik & Saran\n';
        receipt += '089505053793\n';
        receipt += normalFont;
        receipt += '================================\n';
        receipt += '\n';
        receipt += center;
        receipt += 'Jangan Lupa Bahagia\n';
        receipt += cut;
        
        // const receipt =
        //   center +
        //   '\n' +        
        //   boldOn +
        //   'CAKROK BAHAGIA\n' +
        //   boldOff +
        //   smallText +
        //   'Jln. Pantai Halim Marindal I\n' +
        //   normalFont +
        //   left +
        //   '================================\n' +
        //   'Transaction: #CO-0001           \n' +
        //   'Tanggal: 18/02/2026             \n' +
        //   'No. Meja: 12                    \n' +
        //   '--------------------------------\n' +
        //   'Sanger                          \n' +
        //   '2x @12.000              = 24.000\n' +
        //   '--------------------------------\n' +
        //   boldOn +
        //   'TOTAL                  Rp 68.000\n' +
        //   boldOff +
        //   '--------------------------------\n' +
        //   center +
        //   smallText +        
        //   'Terima Kasih Atas Kunjungan Anda\n' +
        //   'Kritik & Saran\n' +
        //   '089505053793\n' +
        //   normalFont +
        //   '================================\n' +
        //   '\n' +
        //   center +
        //   'Jangan Lupa Bahagia\n\n\n' +
        //   '\n\n\n'
        //   cut;

        await printer.write(receipt);

        await printer.disconnect();

        // Alert.alert('Print berhasil ✅');
      } catch (error) {
        console.log(error);
        Alert.alert('Error', error.message);
      }
    },[orders,total]);

    const [hitung, setHitung] = useState(0);
    const [containerWidth,setContainerWidth] = useState(0);
    const [alertPayment, setAlertPayment] = useState(false);

    const translateX = useRef(new Animated.Value(0)).current;

    const MAX_SLIDE = 350 ; // sesuaikan jika perlu    


    function formatRupiah(angka) {
        return 'Rp ' + angka.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }

    const panResponder = useRef(
        PanResponder.create({
        onMoveShouldSetPanResponder: () => true,

        onPanResponderMove: (_, gesture) => {
            if (gesture.dx > 0 && gesture.dx <= MAX_SLIDE) {
            translateX.setValue(gesture.dx);
            }
        },

        onPanResponderRelease: (_, gesture) => {
            if (gesture.dx > MAX_SLIDE) {
            Animated.timing(translateX, {
                toValue: MAX_SLIDE,
                duration: 150,
                useNativeDriver: false,
            }).start(() => {
                // Alert.alert("Pembayaran", "Pembayaran berhasil 🎉");
                printTest()
                setAlertPayment(true)

                // reset kembali setelah alert
                Animated.spring(translateX, {
                toValue: 0,
                useNativeDriver: false,
                }).start();
            });
            } else {
            Animated.spring(translateX, {
                toValue: 0,
                useNativeDriver: false,
            }).start();
            }
        },
        })
    ).current;

  return (
          <View style={styles.wraper}>

            <Modal
              animationType="slide"
              transparent={true}
              visible={alertPayment}
              onRequestClose={() => setAlertPayment(false)}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text>Pembayaran Berhasil</Text>

                  <Button
                    title="X"
                    onPress={() => setAlertPayment(false)}
                  />
                </View>
              </View>
            </Modal>
          
            <View style={{ alignItems: "center" }}>
              <Text>Pesanan</Text>
              <Text style={{ fontWeight: 700, marginTop: 3 }}>#CO-001</Text>
            </View>
              <View style={{ width: "100%", flex: 1, marginTop: 10 }}>
                  <View style={styles.struk}>
                  <ScrollView style={{width:'100%',height:'100%'}}>
                  {
                    orders.length === 0 ? (<Text style={{color:'#555'}}>Belum ada pesanan</Text>) :
                    (
                      orders.map((item,index)=>(
                      <View style={{ width: "100%", height: 70, flexDirection: "row",marginBottom:5}} key={item.id}
                        >
                          <View style={styles.wrapStruk}>
                            <Image
                              source={{uri: item.img_url}}
                              style={styles.imgStruk}/>
                          </View>
                          <View style={styles.flexStruk}>
                            <View
                              style={{justifyContent: "space-between",height: "80%"}}
                            >
                              <Text style={styles.titleStruk}>
                                {item.nama}
                              </Text>
                              <Text style={{ fontSize: 14 }}>Rp. 10000 x {item.qty}</Text>
                            </View>
                            <View>
                              <Text style={{ fontSize: 18, fontWeight: 600 }}>
                                {formatRupiah(item.harga * item.qty)}
                              </Text>
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  marginTop: 10,
                                  width: 100,
                                  height: 30,
                                  alignItems: "center",
                                  backgroundColor: "#ddd",
                                  borderRadius: 20,
                                  padding: 2
                                }}
                              >
                                <TouchableOpacity
                                    style={{
                                      backgroundColor: "white",
                                      width: 25,
                                      height: 25,
                                      justifyContent: "center",
                                      alignItems: "center",
                                      borderRadius: 20,
                                    }}
                                    onPress={()=>decreaseQty(item.id)}
                                >
                                  <Icon
                                    name="remove"
                                    size={18}
                                  />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 16 }}>{item.qty}</Text>
                                <TouchableOpacity
                                    style={{
                                      backgroundColor: "white",
                                      width: 25,
                                      height: 25,
                                      justifyContent: "center",
                                      alignItems: "center",
                                      borderRadius: 20,
                                    }}
                                >
                                  <Icon
                                    name="add"
                                    size={18}
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </View>
                      ))
                    )
                  }
                  </ScrollView>
                  </View>
              </View>
            <View
              style={{
                flexDirection: "column",
                width: "100%",
                paddingVertical: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  borderTopWidth: 1,
                  borderTopColor: "#ddd",
                  justifyContent: "space-between",
                  paddingTop: 10,
                }}
              >
                <Text>Total Bayar</Text>
                <Text style={{ fontSize: 16, fontWeight: 700 }}>
                  {formatRupiah(total)}
                </Text>
              </View>
            </View>

    <View
      onLayout={(e) =>
        setContainerWidth(e.nativeEvent.layout.width)
      }    
      style={{
        flexDirection: "row",
        backgroundColor: "#ff6817",
        width: "100%",
        height: 50,
        paddingHorizontal: 5,
        alignItems: "center",
        borderRadius: 30,
        justifyContent: "space-between",
        overflow: "hidden",
      }}
    >
      {/* SLIDER BUTTON */}
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          backgroundColor: "white",
          width: 42,
          height: 42,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 50,
          transform: [{ translateX }],
        }}
      >
        <Icon
          name="arrow-forward-sharp"
          size={20}
          color={"#ff6817"}
        />
      </Animated.View>

      {/* TEXT */}
      <Text style={{ color: "white", fontWeight: "600" }}>
        Bayar {formatRupiah(total)}
      </Text>

      {/* RIGHT CHEVRON */}
      <View
        style={{
          flexDirection: "row",
          width: 42,
          height: 42,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 50,
        }}
      >
        <Icon
          name="chevron-forward"
          size={20}
          color={"white"}
          style={{ marginRight: -10 }}
        />
        <Icon
          name="chevron-forward"
          size={20}
          color={"white"}
          style={{ marginRight: -10 }}
        />
        <Icon
          name="chevron-forward"
          size={20}
          color={"white"}
          style={{ marginRight: 0 }}
        />
      </View>
    </View>
          </View>
  )
}

const styles = StyleSheet.create({
    wraper:{
        backgroundColor: "white",
        width: "100%",
        height:'97%',
        borderRadius: 25,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        padding: 15,
        justifyContent: "space-between",
        alignItems: "center"        
    },
    struk:{
        borderWidth: 1.5,
        borderColor: "#ff6817",
        width: "100%",
        borderRadius: 15,
        padding: 10,
        flex: 1
    },
    wrapStruk:{
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10        
    },
    imgStruk:{
        width: 70,
        height: 70,
        backgroundColor: "red",
        borderRadius: 15,        
    },
    flexStruk:{
        flex: 1,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center"        
    },
    titleStruk:{
        fontSize: 16,
        marginBottom: 2,
        fontWeight: 700        
    },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#f32121',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },        
})