import { View, Text, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { styles } from './style'
import images from '../../services/utilities/images'
import Button from '../../components/Button'

export default function GetStarted({navigation}) {
    const handleJoin = ()=>{
        navigation.navigate("Introduction")
    }
  return (
    <SafeAreaView>
    <View style={styles.container}>
      <Image source={images.landingBg} style={styles.bg} />
      <View style={styles.padding}>
        <Text style={styles.heading}>Let's dive into the world of Wincly!</Text>
        <Text style={styles.subText}>
        Sign up now and begin your journey to meaningful connections.
        </Text>
       <View style={styles.btnTop}>
          <Button title={'Get Started'} 
          onPress={handleJoin}
           />
        </View>
      </View>
    </View>
  </SafeAreaView>
  )
}