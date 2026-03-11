import Icon from "react-native-vector-icons/Ionicons";
import { StyleSheet, Text, View,TouchableOpacity,Image, Button, Modal } from 'react-native'
import React, { useState } from 'react'
import { supabase } from "../../../lib/supabase/Supabase";

export default function Header() {

  const [alertPayment, setAlertPayment] = useState(false);

  const today = new Date();
  const options = { 
    weekday: 'long',  // nama hari
    day: '2-digit',   // tanggal
    month: 'short',   // nama bulan 3 huruf
    year: 'numeric'   // tahun 4 digit
  };
  const formattedDate = today.toLocaleDateString('id-ID', options);

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
        style={styles.head}
      >

        <Modal
          animationType="slide"
          transparent={true}
          visible={alertPayment}
          onRequestClose={() => setAlertPayment(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{width:'100%',justifyContent:'space-between',flexDirection:'row',borderBottomWidth:1,borderBottomColor:'#ddd',paddingBottom:10}}>
                <Text style={{fontSize:16,fontWeight:600}}>Tambah Menu</Text>
                <TouchableOpacity onPress={()=>setAlertPayment(false)} style={styles.close}>
                  <Text>x</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={{ width: "50%" }}>
          <View  style={{flexDirection: "row", alignItems: "center"}}
          >
            <TouchableOpacity onPress={()=>setAlertPayment(true)}>
              <Image
                source={require("../../assets/images/splash-icon.png")}
                onPress={()=>console.log('oke')}
                style={{ width: 40, height: 40, borderRadius: 5 }}
              />
            </TouchableOpacity>
            <Text style={styles.text}>
              {formattedDate}
            </Text>
          </View>
        </View>
        <View style={styles.flex}>
          <Text style={{ fontSize: 12 }}>Total Pesanan : 20</Text>
          <View style={styles.laporan}>
            <Text style={{ fontWeight: 600 }}>Laporan</Text>
            <Icon name="clipboard" size={20} color={"#777"} />
          </View>
          <View style={styles.profile}
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

const styles = StyleSheet.create({
  head:{
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,  
  },
  text:{
    fontSize: 15,
    color: "#ff6817",
    fontWeight: 500,
    marginLeft: 15,
  },
  flex:{
    width: "50%",
    justifyContent: "flex-end",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",    
  },
  laporan:{
    width: 110,
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "center",
    height: 40,
    alignItems: "center",
    borderRadius: 10,
    gap: 10,
  },
  profile:{
    width: 115,
    flexDirection: "row",
    backgroundColor: "white",
    height: 40,
    gap: 8,
    alignItems: "center",
    borderRadius: 50    
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
    padding: 10,
    width:500,
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
  close:{
    justifyContent:'center',
    alignItems:'center',
    width:20,
    height:20
  }
})