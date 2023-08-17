import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Main from '../screen/Main'
import Splass from '../screen/Splass'
import AddNewBill from '../screen/AddNewBill'
import BillDetail from '../screen/BillDetail'



const Stack = createNativeStackNavigator()

const Navigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Splass' component={Splass} options={{ headerShown: false }} />
                <Stack.Screen name='Main' component={Main} options={{ headerShown: false }} />
                <Stack.Screen name='AddNewBill' component={AddNewBill} options={{ headerShown: false }} />
                <Stack.Screen name='BillDetail' component={BillDetail} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator

const styles = StyleSheet.create({})