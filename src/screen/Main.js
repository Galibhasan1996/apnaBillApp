import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Dimensions, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const Main = ({ navigation }) => {
    const [bills, setbills] = useState([])
    const isFocused = useIsFocused()
    useEffect(() => {
        getBills()
    }, [isFocused])


    const getBills = async () => {
        const data = await AsyncStorage.getItem('bills')
        const json = JSON.parse(data)
        // console.log('data start hare  ' + JSON.stringify(json));
        setbills(json)
        // console.log(json);
    }

    return (


        <View style={styles.container}>
            <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />

            {
                bills.length > 0 ? (
                    <FlatList data={bills} renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={styles.billItem} onPress={() => navigation.navigate('BillDetail', { item })}>
                                <View style={{ marginLeft: 20, flexDirection: "row" }}>
                                    <View>
                                        <Text style={{ color: "#000", fontSize: 15, fontWeight: "900" }}>{'Biller Name'}</Text>
                                        <Text Text style={{ color: "#000", fontSize: 15, fontWeight: "900" }}>{'Bill Date'}</Text>
                                        <Text Text style={{ color: "#000", fontSize: 15, fontWeight: "900" }}>{'Total Amount'}</Text>
                                    </View>

                                    <View style={{ marginLeft: 20, }}>
                                        <Text style={{ color: "#000", fontSize: 15, fontWeight: "900" }}>{':'}</Text>
                                        <Text Text style={{ color: "#000", fontSize: 15, fontWeight: "900" }}>{':'}</Text>
                                        <Text Text style={{ color: "#000", fontSize: 15, fontWeight: "900" }}>{':'}</Text>
                                    </View>

                                    <View style={{ marginLeft: 20, }}>
                                        <Text Text style={{ color: "#000", fontSize: 15, fontWeight: "900" }}>{item.billerName.toUpperCase()}</Text>
                                        <Text Text style={{ color: "#000", fontSize: 15, fontWeight: "900" }}>{item.billDate.toUpperCase()}</Text>
                                        <Text Text style={{ color: "#000", fontSize: 15, fontWeight: "900" }}>{item.total.toUpperCase()}</Text>
                                    </View>

                                </View>
                            </TouchableOpacity>
                        )
                    }} />
                ) : (
                    <View>
                        <Image source={require('../image/no_data.png')} style={styles.image_no_bill} />
                        <Text>No Bill Found Yet</Text>
                    </View>
                )
            }

            <TouchableOpacity style={styles.add_button} onPress={() => navigation.navigate('AddNewBill')}>
                <Text style={styles.add}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Main

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center',
    },
    add_button: {
        position: "absolute",
        width: 40,
        height: 40,
        backgroundColor: "green",
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        bottom: 20,
        elevation: 10
    },
    add: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "900"
    },
    image_no_bill: {
        width: 100,
        height: 100,
    },
    billItem: {
        width: Dimensions.get('window').width - 50,
        alignSelf: 'center',
        marginTop: 10,
        height: 100,
        borderRadius: 10,
        backgroundColor: "#fff",
        elevation: 3,
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        justifyContent: 'center',
    }
})