import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { useState,useEffect, useContext } from 'react'
import { supabase } from '../../../lib/supabase/Supabase';
import Icon from "react-native-vector-icons/Ionicons";
import { OrderContext } from '../../context/Context';
export default function Menu() {

    const {addItem} = useContext(OrderContext);

    const [menu,setMenu] = useState([]);

    const getMenu = async()=>{
        const{data,err} = await supabase
        .from('menu')
        .select('*')

        if(err){
        console.log('Error :',err.message)
        }else{
        console.log(data)
        setMenu(data)
        }
    }    

    useEffect(()=>{
        getMenu();
    },[])
    
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
    {
        menu.map((item,index)=>(
        <TouchableOpacity
            // onPress={tekan}
            style={styles.menu}
            key={item.id}
            onPress={()=>addItem(item)}
        >
            <View style={{ width:'100%', justifyContent: "center"}}>
            <Image
                source={{uri: item.img_url}}
                style={styles.menuImg}
            />
            </View>
            <View
            style={styles.menuInfo}
            >
            <View>
                <Text style={{ fontSize: 14, fontWeight: 600 }}>{item.nama}</Text>
                <Text style={{ fontSize: 12, fontWeight: 500, color: "#888888" }}>Rp. {item.harga}</Text>
            </View>
            <View style={styles.menuAdd}>
                <Icon name="add" size={20} color={"#ff6817"} />
            </View>
            </View>
        </TouchableOpacity>              
        
    ))}
    </View>
  )
}

const styles = StyleSheet.create({
    menu:{
        flexDirection:'column',
        borderWidth: 1.5,
        borderColor: "#ff6817",
        borderRadius: 20,
        width: "23.6%",
        alignItems: "center",
        backgroundColor: "white",
        height: 170,
        padding: 10,
        justifyContent:'space-between'        
    },
    menuImg:{
        width:'100%',
        height:100,
        borderRadius:15        
    },
    menuInfo:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"        
    },
    menuAdd:{
        width: 30,
        height: 30,
        borderRadius: 50,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#ff6817"        
    }
})