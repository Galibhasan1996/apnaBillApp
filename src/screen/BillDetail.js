import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

const BillDetail = ({ item }) => {
    const route = useRoute()
    const name = route.params.item.billerName
    const date = route.params.item.billDate
    const total = route.params.item.total
    const time = route.params.item.time





    return (
        <View style={styles.container}>
            <View style={styles.billerName}>
                <Text style={{ fontWeight: "900", fontSize: 20, color: "#000" }}>{name}</Text>
            </View>

            <View style={styles.billDetail}>
                <View>
                    <Text>Date</Text>
                    <Text>time</Text>
                    <Text>Totol</Text>
                </View>

                <View>
                    <Text>:</Text>
                    <Text>:</Text>
                    <Text>:</Text>
                </View>

                <View>
                    <Text>{date}</Text>
                    <Text>{time}</Text>
                    <Text>{total}</Text>
                </View>

            </View>

        </View>
    )
}

export default BillDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    billerName: {
        backgroundColor: "#fff",
        width: '90%',
        height: 40,
        elevation: 2,
        alignSelf: 'center',
        marginTop: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    billDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 15,

    }
})