import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, View, TouchableOpacity, StatusBar, Text, ScrollView, Alert } from 'react-native'
import ActionBar from "./ActionBar";
import Birthday from "./Birthday";
import AddBirthday from "./AddBirthday";
import firebase from '../utils/firebase';
import moment from 'moment';
import 'firebase/firestore';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebase);

export default function ListBirthday(props) {
    const {user} = props;
    const [showList, setShowList] = useState(true);
    const [birthday, setBirthday] = useState([]);
    const [pastBirthday, setPastBirthday] = useState([]);
    const [isReloadData, setIsReloadData] = useState(false);

    console.log(birthday);

    useEffect(() => {
        setBirthday([]);
        db.collection(user.uid)
            .orderBy("dateBirth", "asc")
            .get()
            .then((resp) => {
                const itemArray = [];
                resp.forEach((doc) => {
                    const data = doc.data();
                    data.id = doc.id;
                    itemArray.push(data);
                });
                formData(itemArray);
            })
            .catch();
            setIsReloadData(false);
    }, [isReloadData]);

    const formData = (items) => {
        const currentDate = moment().set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0,
        });

        const birthdayTempArray = [];
        const pastBirthdayTempArray = [];

        items.forEach((item) =>{
            const dateBirth = new Date(item.dateBirth.seconds * 1000);
            const dateBirthday = moment(dateBirth);
            const currentYear = moment().get('year');
            dateBirthday.set({year: currentYear});

            const diffDate = currentDate.diff(dateBirthday, 'days');
            const itemTemp = item;
            itemTemp.dateBirth = dateBirthday;
            itemTemp.days = diffDate;

            if(diffDate <= 0){
                birthdayTempArray.push(itemTemp);
            }else{
                pastBirthdayTempArray.push(itemTemp);
            }
        });

        setBirthday(birthdayTempArray);
        setPastBirthday(pastBirthdayTempArray);
    };

    const deleteBirth = (birthday) => {
        Alert.alert(
            'Delete birthday',
            `Estas seguro que quieres eliminar el cumpleaños de ${birthday.name} ${birthday.lastname}`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        db.collection(user.uid)
                            .doc(birthday.id)
                            .delete()
                            .then(() => {
                                setIsReloadData(true);
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }
                }
            ],
            {cancelable: false}
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={"#000"}/>
            <ActionBar />
            <View style={styles.content}>
                { 
                    showList ? (
                        <ScrollView style={styles.scrollView}>
                            {birthday.map((item, index) => (
                                <Birthday 
                                    key={index} 
                                    birthday={item}
                                    deleteBirth={deleteBirth}/>
                            ))}

                            {pastBirthday.map((item, index) => (
                                <Birthday 
                                    key={index} 
                                    birthday={item}
                                    deleteBirth={deleteBirth}/>
                            ))}
                        </ScrollView>
                    ): (
                        <AddBirthday 
                            user={user} 
                            setIsReloadData={setIsReloadData} 
                            setShowList={setShowList}/>
                    )
                }
            </View>
            <TouchableOpacity 
                style={styles.floatingButton} 
                onPress={() => setShowList(!showList)}>
                <Image
                    style={!showList && styles.tinyLogo}
                    source={require('../assets/img/add.png')}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFA",
    },

    title:{
        fontFamily: "OpenSans-Bold",
        fontSize: 24,
        marginBottom: 21,
    },

    content: {
        flex: 1,
        padding: 16,
    },

    scrollView:{
        width: "100%",
    },

    floatingButton: {
        width: 65,  
        height: 65,   
        borderRadius: 40,            
        backgroundColor: '#DB7D90',                                    
        position: 'absolute',     
        justifyContent: "center",   
        alignItems: "center",                                  
        bottom: 16,                                                    
        right: 16, 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },

    tinyLogo:{
        transform: [{ rotate: '45deg' }]
    },
})
