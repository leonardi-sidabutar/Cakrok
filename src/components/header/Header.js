import Icon from "react-native-vector-icons/Ionicons";
import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { supabase } from "../../../lib/supabase/Supabase";

export default function Header() {

  const logOut = async ()=> {
    const {err} = await supabase.auth.signOut()

    // if(err){
    //   Alert.alert('Logout Gagal:',err.message)
    // }else{
    //   Alert.alert('Anda Logout')
    // }
  }
    
  return (
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
  )
}

const styles = StyleSheet.create({})