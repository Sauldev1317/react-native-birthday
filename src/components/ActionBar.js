import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';
import firebase from '../utils/firebase';

export default function ActionBar() {
    const logout = () => {
        firebase.auth().signOut();
    };

    return (
        <SafeAreaView style={styles.actionBarContent}>
            <View style={styles.viewClose}>
                <Text style={styles.textLogout} onPress={logout}>Logout</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    actionBarContent: {
        width: "100%",
        backgroundColor: "#DB7D90",
        height: 100,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center", 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },

    viewClose: {
        margin: 16,
    },

    textLogout: {
        fontFamily: "OpenSans-Bold",
        fontSize: 16,
        color: "#fff"
    },
})
