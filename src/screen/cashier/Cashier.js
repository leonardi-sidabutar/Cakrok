import Icon from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { cakrokStyle } from "../../constants/styles";
import { supabase } from "../../../lib/supabase/Supabase"

export default function Cashier() {
  const [hitung, setHitung] = useState(0);
  const [menu,setMenu] = useState([]);

  const getMenu = async()=>{
    const{data,err} = await supabase
      .from('menu')
      .select('*')

    if(err){
      console.log('Error :',err.message)
    }else{
      console.log('Data :',data)
    }
  }

  function tekan() {
    setHitung(hitung + 1);
    getMenu();
  }

  const logOut = async ()=> {
    const {err} = await supabase.auth.signOut()

    if(err){
      Alert.alert('Logout Gagal:',err.message)
    }else{
      Alert.alert('Anda Logout')
    }
  }

  useEffect(()=>{
    getMenu();
  },[])


  return (
    <SafeAreaView style={cakrokStyle.safeArea}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <View style={{ width: "50%" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/images/splash-icon.png")}
              style={{ width: 40, height: 40, borderRadius: 5 }}
            />
            <Text
              style={{
                fontSize: 15,
                color: "#ff6817",
                fontWeight: 500,
                marginLeft: 15,
              }}
            >
              Selasa, 10 Feb 2026
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "50%",
            justifyContent: "flex-end",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 12 }}>Total Pesanan : 20</Text>
          <View
            style={{
              width: 110,
              flexDirection: "row",
              backgroundColor: "white",
              justifyContent: "center",
              height: 40,
              alignItems: "center",
              borderRadius: 10,
              gap: 10,
            }}
          >
            <Text style={{ fontWeight: 600 }}>Laporan</Text>
            <Icon name="clipboard" size={20} color={"#777"} />
          </View>
          <View
            style={{
              width: 115,
              flexDirection: "row",
              backgroundColor: "white",
              height: 40,
              gap: 8,
              alignItems: "center",
              borderRadius: 50,
            }}
          >
            <Icon name="person-circle" size={40} color="#777" />
            <TouchableOpacity onPress={logOut}>
              <Text style={{ fontWeight: 700, fontSize: 12 }}>M. Ridho</Text>
              <Text style={{ fontWeight: 400, fontSize: 12 }}>Cashier</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: "row" }}>
        {/* SearchBar */}
        <View style={{ width: "65%", paddingRight: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              width: "100%",
              height: "45",
              borderWidth: 1.5,
              borderColor: "#ff6817",
              borderRadius: 45,
              marginBottom: 10,
              paddingHorizontal: 10,
            }}
          >
            <Icon name="search" size={20} color={"#777"} />
            <Text style={{ marginLeft: 5, color: "#999" }}>Cari Menu...</Text>
          </View>
          {/* Category */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 10,
              marginBottom: 10,
            }}
          >
            <View
              style={{
                backgroundColor: "#0099b3",
                width: "100%",
                flex: 1,
                borderRadius: 20,
                paddingLeft: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text style={{ color: "white", fontSize: 18, fontWeight: 500 }}>
                  Minuman
                </Text>
                <Text style={{ color: "white", fontSize: 12 }}>20 Items</Text>
              </View>
              <Image
                source={{
                  uri: "https://xwmqhxvihwxbkddnfcal.supabase.co/storage/v1/object/public/cakrok_img/coffe.png",
                }}
                style={{ width: 50, height: 53 }}
              />
            </View>
            <View
              style={{
                backgroundColor: "#28ccb9",
                width: "100%",
                flex: 1,
                borderRadius: 20,
                paddingLeft: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text style={{ color: "white", fontSize: 18, fontWeight: 500 }}>
                  Makanan
                </Text>
                <Text style={{ color: "white", fontSize: 12 }}>20 Items</Text>
              </View>
              <Image
                source={{
                  uri: "https://xwmqhxvihwxbkddnfcal.supabase.co/storage/v1/object/public/cakrok_img/food.png",
                }}
                style={{ width: 65, height: 53 }}
              />
            </View>
          </View>
          {/* Menu */}
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
            <TouchableOpacity
              onPress={tekan}
              style={{
                borderWidth: 1.5,
                borderColor: "#ff6817",
                borderRadius: 20,
                width: "23.6%",
                alignItems: "center",
                backgroundColor: "white",
                height: 150,
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <View style={{ height: "70%", justifyContent: "center" }}>
                <Image
                  source={{
                    uri: "https://xwmqhxvihwxbkddnfcal.supabase.co/storage/v1/object/public/cakrok_img/sanger.png",
                  }}
                  style={{
                    width: 90,
                    height: 70,
                    backgroundColor: "red",
                    borderRadius: 15,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <View>
                  <Text style={{ fontSize: 14, fontWeight: 600 }}>
                    Sanger Coklat
                  </Text>
                  <Text
                    style={{ fontSize: 12, fontWeight: 500, color: "#888888" }}
                  >
                    Rp. 10000
                  </Text>
                </View>
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                    borderWidth: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    borderColor: "#ff6817",
                  }}
                >
                  <Icon name="add" size={20} color={"#ff6817"} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ width: "35%" }}>
          {/* Receipt */}
          <View
            style={{
              backgroundColor: "white",
              width: "100%",
              height: "95%",
              borderRadius: 25,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              padding: 15,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text>Pesanan</Text>
              <Text style={{ fontWeight: 700, marginTop: 3 }}>#CO-001</Text>
            </View>
            <View style={{ width: "100%", flex: 1, marginTop: 10 }}>
              <View
                style={{
                  borderWidth: 1.5,
                  borderColor: "#ff6817",
                  width: "100%",
                  borderRadius: 15,
                  padding: 10,
                  flex: 1,
                }}
              >
                <View
                  style={{ width: "100%", height: 70, flexDirection: "row" }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 10,
                    }}
                  >
                    <Image
                      source={{
                        uri: "https://xwmqhxvihwxbkddnfcal.supabase.co/storage/v1/object/public/cakrok_img/sanger.png",
                      }}
                      style={{
                        width: 70,
                        height: 70,
                        backgroundColor: "red",
                        borderRadius: 15,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        justifyContent: "space-between",
                        height: "80%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          marginBottom: 2,
                          fontWeight: 700,
                        }}
                      >
                        test Sanger
                      </Text>
                      <Text style={{ fontSize: 14 }}>Rp. 10000 x {hitung}</Text>
                    </View>
                    <View>
                      <Text style={{ fontSize: 18, fontWeight: 600 }}>
                        Rp. 10000
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
                          padding: 2,
                        }}
                      >
                        <View
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
                            name="remove"
                            size={18}
                          />
                        </View>
                        <Text style={{ fontSize: 16 }}>{hitung}</Text>
                        <View
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
                            name="remove"
                            size={18}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
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
                  Rp. Gratis
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#ff6817",
                width: "95%",
                height: 50,
                paddingHorizontal: 5,
                alignItems: "center",
                borderRadius: 30,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  width: 42,
                  height: 42,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 50,
                }}
              >
                <Icon
                  name="arrow-forward-sharp"
                  size={20}
                  color={"#ff6817"}
                />
              </View>
              <Text style={{ color: "white", fontWeight: 600 }}>Bayar</Text>
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
        </View>
      </View>
    </SafeAreaView>
  );
}
