import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

export default function Category() {
  return (
    <View style={styles.wraper}>
    <View style={styles.category}>
        <View>
            <Text style={styles.titleCategory}>Minuman</Text>
            <Text style={styles.countCategory}>20 Items</Text>
        </View>
        <Image source={{ uri: "https://xwmqhxvihwxbkddnfcal.supabase.co/storage/v1/object/public/cakrok_img/coffe.png",}} style={styles.gambar} />
    </View>
    <View style={[styles.category,{backgroundColor: "#28ccb9"}]}>
        <View>
            <Text style={styles.titleCategory}>Makanan</Text>
            <Text style={styles.countCategory}>20 Items</Text>
        </View>
        <Image source={{uri: "https://xwmqhxvihwxbkddnfcal.supabase.co/storage/v1/object/public/cakrok_img/food.png"}} style={styles.gambar}/>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    wraper:{
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
        marginBottom: 10        
    },
    category:{
        backgroundColor: "#0099b3",
        width: "100%",
        flex: 1,
        borderRadius: 20,
        paddingLeft: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",        
    },
    titleCategory:{
        color: "white", fontSize: 18, fontWeight: 500         
    },
    countCategory:{
        color: "white", fontSize: 12         
    },
    gambar:{
        width: 50, height: 53        
    }
})