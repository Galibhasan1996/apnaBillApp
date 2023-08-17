import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

const ProductItem = ({ item, index, onClick }) => {
    return (

        <View>
            <TouchableOpacity style={styles.apicontainer} onPress={() => { onClick(index) }}>

                <View style={styles.image_container}>
                    <Image source={{ uri: item.image }} style={styles.product_image}></Image>
                </View>

                <View style={{ marginLeft: 15, }}>
                    <Text style={styles.apitextdetail}>{item.title.length > 20 ? item.title.substring(0, 20) : item.title}</Text>
                    <Text style={styles.apitextdetail}>{'₹ ' + item.price}</Text>
                </View>

                <View style={styles.cart_item_count}>
                    <Text style={styles.qty}>{item.qty}</Text>
                </View>

                {/* <View style={styles.cart_item_index}>
                    <Text style={styles.qty}>{index}</Text>
                </View> */}

            </TouchableOpacity>
        </View>

    )
}

export default ProductItem

const styles = StyleSheet.create({
    apicontainer: {
        width: '90%',
        height: 100,
        backgroundColor: "#fff",
        marginTop: 5,
        marginBottom: 5,
        alignSelf: 'center',
        borderRadius: 10,
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
    product_image: {
        width: 90,
        height: 90,
        borderRadius: 10,
    },
    image_container: {
        width: 90,
        height: 90,
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 10,
    },
    apitextdetail: {
        color: "#000"
    },
    qty: {
        fontWeight: "900",
        fontSize: 10,
        color: "#fff"
    },
    cart_item_count: {
        position: "absolute",
        right: 10,
        top: 10,
        backgroundColor: "#0098fb",
        width: 20,
        height: 20,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,

    },
    cart_item_index: {
        position: "absolute",
        right: 50,
        top: 10,
        backgroundColor: "#0098fb",
        width: 20,
        height: 20,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
    }
})