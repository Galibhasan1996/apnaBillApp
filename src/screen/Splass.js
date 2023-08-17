import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const Splass = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Main')
        }, 2000);
    }, [])
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>ApnaBillApp</Text>
        </View>
    )
}

export default Splass

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        fontSize: 30,
        fontWeight: "900",
        color: "#000"
    }
})