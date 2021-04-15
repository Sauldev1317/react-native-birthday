import React from 'react'
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Birthday(props) {
    const {birthday, deleteBirth} = props;
    const isPastDate = birthday.days > 0 ? true : false;
    const infoDay = () => {
        if (birthday.days === 0){
            return <Image 
                        style={styles.imgBirthday}
                        source={require("../assets/img/gift-icon.png")}/>
        }else{
            const days = -birthday.days;
            return (
                <View style={styles.textDaysContent}>
                    <Text style={styles.textDaysOne}>{days}</Text>
                    <Text style={styles.textDaysTwo}>{days === 1 ? "dia" : "dias"}</Text>
                </View>
            );
        }
    };

    return (
        <TouchableOpacity
            onPress={() => deleteBirth(birthday)}
            style={[
                styles.card, 
                isPastDate 
                ? styles.past 
                : birthday.days === 0 
                ? styles.actual 
                : styles.current]}>
            <Text style={styles.userText}>{birthday.name} {birthday.lastname}</Text>
            {!isPastDate && infoDay()}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        height: 100,
        flexDirection: "row",
        backgroundColor: "#fff",
        marginBottom: 8,
        borderRadius: 10,
        borderWidth: 3,
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    past:{
        borderColor: "#3fa7d6",
        backgroundColor: "#FAFAFA",
    },
    actual:{
        borderColor: "#59cd90",
    },
    current:{
        borderColor: "#DB7D90",
    },
    userText: {
        fontFamily: "OpenSans-Regular",
        fontSize: 18,
    },
    textDaysContent:{
        flexDirection: "row",
        alignItems: "flex-end",
    },
    textDaysOne: {
        marginEnd: 3,
        fontFamily: "OpenSans-Bold",
        fontSize: 20,
        color: "#DB7D90",
    },
    textDaysTwo: {
        fontFamily: "OpenSans-Bold",
        fontSize: 20,
        color: "#DB7D90",
    }
})
