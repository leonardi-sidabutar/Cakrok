import { StyleSheet, Text, View, Animated, PanResponder, Image, TouchableOpacity } from 'react-native'
import {useState, useMemo, useRef, useContext} from 'react'
import Icon from "react-native-vector-icons/Ionicons";
import { OrderContext } from '../../context/Context';


export default function Receipt() {
  
    const {orders,decreaseQty} = useContext(OrderContext);

    console.log(orders);

    const [hitung, setHitung] = useState(0);
    const [containerWidth,setContainerWidth] = useState(0);

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
                Alert.alert("Pembayaran", "Pembayaran berhasil 🎉");

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

    function tekan() {
        setHitung(hitung + 1);
        getMenu();
    }    

    // 🔹 Hitung total (optimal)
    const total = useMemo(() => {
        return orders.reduce((sum, item) => {
        return sum + item.harga * item.qty;
        }, 0);
    }, [orders]);

  return (
          <View style={styles.wraper}>
            <View style={{ alignItems: "center" }}>
              <Text>Pesanan</Text>
              <Text style={{ fontWeight: 700, marginTop: 3 }}>#CO-001</Text>
            </View>
            <View style={{ width: "100%", flex: 1, marginTop: 10 }}>
              <View style={styles.struk}>
              {
                orders.length === 0 ? (<Text style={{color:'#555'}}>Belum ada pesanan</Text>) :
                (
                  orders.map((item,index)=>(
                  <View style={{ width: "100%", height: 70, flexDirection: "row"}} key={item.id}
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
    }
})