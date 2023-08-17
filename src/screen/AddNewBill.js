import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Dimensions, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ProductItem from '../component/ProductItem'
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const AddNewBill = ({ navigation }) => {
    const [product, setproduct] = useState([])
    const [productX, setproductX] = useState([])
    const [visible, setvisible] = useState(false)
    const [addedItems, setaddedItems] = useState([])
    const [input_text, setinput_text] = useState('')
    const [biller_model, setbiller_model] = useState(false)
    const [name, setname] = useState('')


    useEffect(() => {
        apidata()
    }, [])

    const apidata = () => {
        fetch('https://fakestoreapi.com/products')
            .then((res) => res.json())
            .then((res) => {
                res.map((item) => {
                    item.qty = 1
                })
                setproduct(res)
                setproductX(res)
            })
    }

    const addItem = (ind) => {
        let tempData = addedItems
        if (tempData.length > 0) {
            let isOld = false
            tempData.map((item) => {
                if (item.id === product[ind].id) {
                    item.qty = item.qty + 1
                    isOld = true
                }
            })
            if (!isOld) {
                tempData.push(product[ind])
            }
        } else {
            tempData.push(product[ind])
        }

        temp = []
        tempData.map((item) => {
            temp.push(item)
        })
        setaddedItems(temp)
    }

    const getTotal = () => {
        let total = 0
        let tempdata = addedItems
        tempdata.map((item) => {
            total = total + item.price * item.qty
        })
        return total.toFixed(2)
    }


    // search item funtctionlity start hare

    const filterItemes = (txt) => {
        const tempData = product
        const newData = tempData.filter((item) => {
            return item.title.toLowerCase().includes(input_text.toLowerCase())
        })
        if (newData.length > 0) {
            setproduct(newData)
        } else {
            setproduct(tempData)
        }
    }


    const saveBill = async () => {
        let data = []
        const data2 = await AsyncStorage.getItem('bills')
        const json = JSON.parse(data2)
        data = json
        const day = new Date().getDate();
        const month = new Date().getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
        const year = new Date().getFullYear();
        const fullDate = day + '/' + month + '/' + year


        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();

        const fullTime = hours + ":" + minutes + ":" + seconds;



        data.push({ data: addedItems, billerName: name, billDate: fullDate, total: getTotal(), time: fullTime })
        const jsonData = JSON.stringify(data)
        await AsyncStorage.setItem('bills', jsonData)
        navigation.goBack()
    }


    return (
        <View style={styles.conainer}>

            <View style={styles.back1}></View>
            <Image source={require('../image/shadow.png')} style={styles.imge}></Image>
            <View style={styles.back2}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../image/back-button.png')} style={styles.header_button} />
                </TouchableOpacity>
                <Text style={{ fontSize: 15, fontWeight: "900" }}>ApnaBillApp</Text>
                <TouchableOpacity onPress={() => setvisible(true)}>
                    <Image source={require('../image/add.png')} style={styles.header_button} />
                </TouchableOpacity>
            </View>
            <View style={{ position: "absolute", marginTop: 60, width: '100%', }}>

                {
                    addedItems.length > 0 ? (<FlatList data={addedItems} renderItem={({ item, index }) => {
                        return (
                            <ProductItem item={item} index={index}></ProductItem>
                        )
                    }} />) : (
                        <View style={styles.no_data_image_container}>
                            <Image source={require('../image/no_data.png')} style={styles.nodataimage} />
                            <Text>No Data Added Yet</Text>
                        </View>)
                }
            </View>
            {
                addedItems.length > 0 ?
                    (
                        <View style={styles.bottom_bar}>
                            <Text style={styles.subtotal}>{'Sub-total : ' + getTotal()}</Text>
                            <TouchableOpacity style={styles.submit_button} onPress={() => setbiller_model(true)}>
                                <Text style={styles.submit_text}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    ) : null
            }

            <Modal visible={visible} animationType='fade'>

                <View style={styles.back1}></View>
                <Image source={require('../image/shadow.png')} style={styles.imge}></Image>
                <View style={styles.back2}>
                    <TouchableOpacity onPress={() => setvisible(false)}>
                        <Image source={require('../image/back-button.png')} style={styles.header_button} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 15, fontWeight: "900" }}>ApnaBillApp</Text>
                    <TouchableOpacity>
                        {/* <Image source={require('../image/add.png')} style={styles.header_button} /> */}
                        <Text style={{ width: 24, height: 24, marginRight: 40, }}>''</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ position: "absolute", marginTop: 50, width: '100%', }}>



                    <View style={styles.searchbox_container}>
                        <Image source={require("../image/search.png")} style={styles.searchbox_icon}></Image>
                        <TextInput placeholder='Search item by name' style={styles.TextInput} value={input_text} onChangeText={(txt) => {
                            setinput_text(txt)
                            filterItemes(txt)
                        }}
                        ></TextInput>
                        <Image source={require('../image/shadow.png')}></Image>
                    </View>
                </View>
                <View style={{ marginBottom: 120, }}>
                    <FlatList data={product} renderItem={({ item, index }) => {
                        return (
                            <ProductItem item={item} index={index} onClick={(ind) => {
                                setinput_text('')
                                setproduct(productX)
                                setvisible(false)
                                addItem(ind)
                            }}></ProductItem>
                        )
                    }} />
                </View>

            </Modal>

            <Modal visible={biller_model} transparent={true} animationType='slide'>
                <View style={styles.model_container}>

                    <View style={styles.model_input}>
                        <TextInput placeholder='Biller Name hare' style={styles.biller_input} value={name} onChangeText={(txt) => setname(txt)} />

                        <View style={styles.input_button}>

                            <TouchableOpacity style={[styles.model_input_button, { backgroundColor: 'red' }]} onPress={() => setbiller_model(false)}>
                                <Text style={{ color: "#fff", fontWeight: "900" }}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.model_input_button} onPress={() => {
                                if (name == '') {
                                    Alert.alert('enter biller name')
                                } else {
                                    setbiller_model(false)
                                    saveBill()
                                }

                            }}>
                                <Text style={{ color: "#fff", fontWeight: "900" }}>Confirm Bill</Text>
                            </TouchableOpacity>
                        </View>






                    </View>

                </View>
            </Modal>

        </View>
    )
}

export default AddNewBill

const styles = StyleSheet.create({
    conainer: {
        flex: 1,
        backgroundColor: "#fff"
    },
    header: {
        width: '100%',
        height: 50,
        backgroundColor: "#fff",
        // elevation: 5,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    header_button: {
        width: 24,
        height: 24,
    },
    bottom_bar: {
        width: '100%',
        height: 60,
        backgroundColor: "#fff",
        position: "absolute",
        bottom: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderTopWidth: 1,
        borderTopColor: "#eee",
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: "row",
        paddingLeft: 20,
        paddingRight: 20,
    },
    submit_button: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 10,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submit_text: {
        color: "#fff",
        fontWeight: "800"
    },
    subtotal: {
        color: "#000",
        fontWeight: "900",
        fontSize: 18
    },
    modal_back_button: {
        width: 24,
        height: 24,
        marginLeft: 20,
        marginTop: 20,
    },
    searchbox_container: {
        width: '90%',
        height: 40,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 10,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 2,
        flexDirection: "row",
        alignItems: 'center',
    },
    searchbox_icon: {
        width: 24,
        height: 24,
        marginLeft: 10,
        marginRight: 10,
    },
    TextInput: {
        width: '85%',
    },
    nodataimage: {
        width: 100,
        height: 100,
    },
    no_data_image_container: {
        height: height,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shadow_image: {
        width: '100%',
        height: 100,
        position: "absolute",
        top: 29,
        zIndex: -1,
    },
    back1: {
        width: '100%',
        height: 50,
        backgroundColor: "#fff",
    },
    back2: {
        width: '100%',
        height: 50,
        backgroundColor: "#fff",
        position: "absolute",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    imge: {
        width: '100%',
        height: 70,
        overflow: "hidden",
        // backgroundColor:"green",
        marginTop: -4,
        zIndex: -1,
    },
    header_button: {
        width: 24,
        height: 24,
        marginLeft: 20,
        marginRight: 20,
    },
    model_container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    model_input: {
        backgroundColor: "#fff",
        width: '90%',
        height: 150,
        borderRadius: 10,
        // justifyContent: 'center',
        alignItems: 'center',
        elevation: 10
    }, biller_input: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingLeft: 20,
        marginTop: 20,
    },
    input_button: {
        flexDirection: "row",
        width: '90%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    model_input_button: {
        backgroundColor: "green",
        padding: 10,
        borderRadius: 10,
        width: 150,
        alignItems: 'center',
    }

})