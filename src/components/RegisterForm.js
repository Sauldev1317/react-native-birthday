import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TextInput, View, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { validateEmail } from '../utils/validation';
import firebase from '../utils/firebase';

export default function RegisterForm(props) {
    const { changeForm } = props;
    const [formData, setFormData] = useState({email: '', username: '', password: '', confirmPassword: ''});
    const [formError, setFormError] = useState({});

    const signUp = () => {
        let errors = {};
        if(!formData.email || !formData.username || !formData.password){
            if(!formData.email) errors.email = 'Email is required';
            if(!formData.username) errors.username = 'Username is required';
            if(!formData.password) errors.password = 'Password is required';
        }else if(!validateEmail(formData.email)){
            errors.email = 'Invalid email';
        }else if(formData.password !== formData.confirmPassword){
            errors.confirmPassword = 'The password does not match';
        }else{
            firebase
                .auth()
                .createUserWithEmailAndPassword(formData.email, formData.password)
                .then(() => {
                    console.log('cuenta creada');
                })
                .catch(() => {
                    setFormError({
                        email: true,
                        username: true, 
                        password: true,
                        confirmPassword: true,
                    });
                });
        }
        setFormError(errors);
        console.log(errors);
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 5 : -50}>
            <View style={styles.cardContent}>
                <Text style={styles.title}>Sign up</Text>
                <TextField
                    label='Email'
                    value= {formData.email}
                    keyboardType='email-address'
                    fontSize={16}
                    lineWidth={2}
                    activeLineWidth={2}
                    tintColor = '#DB7D90'
                    baseColor = '#9A9A9A'
                    error = {formError.email}
                    onChangeText = { (value) => setFormData({...formData, email: value }) }/>
                <TextField
                    label = "Username"
                    value= {formData.username}
                    fontSize={16}
                    lineWidth={2}
                    activeLineWidth={2}
                    tintColor = '#DB7D90'
                    error = {formError.username}
                    onChangeText = {(value) => setFormData({...formData, username: value })}/>
                <TextField
                    label = "Password"
                    value= {formData.password}
                    secureTextEntry={true}
                    fontSize={16}
                    lineWidth={2}
                    activeLineWidth={2}
                    tintColor = '#DB7D90'
                    error = {formError.password}
                    onChangeText = {(value) => setFormData({...formData, password: value })}/>
                <TextField
                    label = "Confirm Password"
                    value= {formData.confirmPassword}
                    secureTextEntry={true}
                    fontSize={16}
                    lineWidth={2}
                    activeLineWidth={2}
                    tintColor = '#DB7D90'
                    error = {formError.confirmPassword}
                    onChangeText = {(value) => setFormData({...formData, confirmPassword: value })}/>
               
                <TouchableOpacity onPress={ signUp } style={styles.signUpButton}>
                    <Text style={styles.signUpTextButton}>Sign up</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={ changeForm } style={styles.signInButton}>
                    <Text style={styles.signInTextButton}>Already have an account? <Text style={styles.signInTextButtonSpan}>Sign in</Text></Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    cardContent: {
        width: 340,
        padding: 24,
        backgroundColor: "#fff",
        borderRadius: 15
    },

    title:{
        fontFamily: "OpenSans-Bold",
        fontSize: 24,
    },

    inputStyle: {
        fontFamily: "OpenSans-Regular",
        fontSize: 16,
    },

    signUpButton:{
        width: "100%",
        height: 40,
        backgroundColor: "#DB7D90",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 21,
        marginTop: 16,
    },

    signUpTextButton:{
        fontFamily: "OpenSans-Bold",
        fontSize: 16,
        color: "#fff",
    },

    signInButton: {
        alignSelf: "center",
    },

    signInTextButton:{
        fontFamily: "OpenSans-SemiBold",
        fontSize: 14,
    },

    signInTextButtonSpan:{
        color: "#DB7D90"
    },

    errorInputStyle: {
        borderColor: "red",
        borderStyle: "solid",
        borderWidth: 1,
    }
});
