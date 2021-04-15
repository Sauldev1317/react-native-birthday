import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image, TextInput } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TextField } from 'react-native-material-textfield';
import moment from 'moment';
import firebase from '../utils/firebase';
import 'firebase/firestore';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebase);

export default function AddBirthday(props) {
    const {user, setShowList, setIsReloadData} = props;
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [formData, setFormData] = useState({});
    const [formErrors, setFormErrors] = useState({});

    const showDatePicker = () => {
        setIsDatePickerVisible(true);
    };
     
    const hideDatePicker = () => {
        setIsDatePickerVisible(false);
    };
    
    const handleConfirm = (date) => {
        const dateBirth = date;
        dateBirth.setHours(0); 
        dateBirth.setMinutes(0); 
        dateBirth.setSeconds(0); 
        setFormData({
            ...formData,
            dateBirth,
        })
        hideDatePicker();
    };

    const onChange = (value, type) => {
        setFormData({
            ...formData,
            [type]: value,
        });
    };

    const onSubmit = () => {
        const errors = {};
        if(!formData.name || !formData.lastname){
            if(!formData.name) errors.name = 'Name is required';
            if(!formData.lastname) errors.lastname = 'Lastname is required';
            if(!formData.dateBirth) errors.dateBirth = 'Birthday is required';
        }else{
            const data = formData;
            console.log(data);
            data.dateBirth.setYear(0);
            db.collection(user.uid)
                .add(data)
                .then(() => {
                    setIsReloadData(true);
                    setShowList(true);
                })
                .catch(() => {
                    setFormErrors({
                        username: "Invalid data",
                        password: "Invalid data",
                    });
                });

        }
        setFormErrors(errors);
    };

    

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>New birthday</Text>
            <TextField
                label="Name"
                fontSize={16}
                lineWidth={2}
                activeLineWidth={2}
                tintColor='#DB7D90'
                error = {formErrors.name}
                onChangeText={(value) => onChange(value, 'name')}/>
            <TextField
                label="Last name"
                fontSize={16}
                lineWidth={2}
                activeLineWidth={2}
                tintColor='#DB7D90'
                error = {formErrors.lastname}
                onChangeText={(value) => onChange(value, 'lastname')}/>

            <TouchableOpacity 
                style={styles.buttonCalendar}
                onPress={ showDatePicker }>
                <Image 
                    style={styles.iconCalendarButton}
                    source={require('../assets/img/event-icon.png')}/>
                <Text 
                    style={styles.textDate}>
                    {moment(formData.dateBirth).format('LL')}
                </Text>
                
            </TouchableOpacity>
                
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}/>
            <TouchableOpacity onPress={onSubmit} style={styles.addDateButton}>
                <Text style={styles.addDateButtonText}>Save date</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        borderRadius: 5,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },

    titleText:{
        fontFamily: "OpenSans-Bold",
        fontSize: 24,
        marginBottom: 21,
    },

    buttonCalendar: {
        flexDirection: "row",
        alignItems: "flex-end", 
        marginTop: 16,
        marginBottom: 21,
    },

    textDate: {
        fontFamily: "OpenSans-regular",
        fontSize: 16,
    },

    iconCalendarButton: {
        width: 30,
        height: 30,
        marginRight: 8,
    },

    addDateButton: {
        width: "100%",
        height: 40,
        backgroundColor: "#DB7D90",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 21,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },

    addDateButtonText: {
        fontFamily: "OpenSans-Bold",
        fontSize: 16,
        color: "#fff",
    },
})
