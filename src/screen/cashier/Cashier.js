import { useState, useMemo,useRef } from "react";
import { Alert, Image, Text, TouchableOpacity, View, Animated, PanResponder,Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { cakrokStyle } from "../../constants/styles";
import { supabase } from "../../../lib/supabase/Supabase"

// Component
import Header from '../../components/header/Header'
import Search from '../../components/search/Search'
import Category from '../../components/category/Category'
import Menu from '../../components/menu/Menu'
import Receipt from '../../components/receipt/Receipt'

const { width } = Dimensions.get("window");

export default function Cashier() {

  return (
    <SafeAreaView style={cakrokStyle.safeArea}>
      
      <Header/>
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: "65%", paddingRight: 10 }}>

          <Search/>
          <Category/>
          <Menu/>

        </View>
        <View style={{ width: "35%" }}>

          <Receipt/>

        </View>
      </View>
    </SafeAreaView>
  );  
}