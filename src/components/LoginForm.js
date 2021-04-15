import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { validateEmail } from '../utils/validation';
import firebase from '../utils/firebase';


export default function LoginForm(props) {
    const { changeForm } = props;
    const [formData, setFormData] = useState({email: '', password: ''});
    const [formError, setFormError] = useState({});

    const signIn = () => {
        let errors = {};
        if (!formData.email || !formData.password){
            if(!formData.email) errors.email = 'Email is required';
            if(!formData.password) errors.password = 'Password is required';
        }else if(!validateEmail(formData.email)){
            errors.email = 'Invalid email';
        }else{
            firebase
                .auth()
                .signInWithEmailAndPassword(formData.email, formData.password)
                .then((resp) => {
                    console.log(resp);
                })
                .catch((error) => {
                    console.log(error);
                    setFormError({
                        email: 'Email incorrect',
                        password: 'Password incorrect'
                    })
                });
        }
        setFormError(errors);
    };

    const onChange = (value, type) => {
        setFormData({...formData, [type]: value});
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 5 : 0}>
            <View style={styles.cardContent}>
                <Text style={styles.title}>Login</Text>
                <TextField
                    label="Email"
                    keyboardType='email-address'
                    fontSize={16}
                    lineWidth={2}
                    activeLineWidth={2}
                    tintColor='#DB7D90'
                    error = {formError.email}
                    onChangeText={(value) => onChange(value, 'email')}/>
                <TextField
                    label = "Password"
                    secureTextEntry={true}
                    fontSize={16}
                    lineWidth={2}
                    activeLineWidth={2}
                    tintColor='#DB7D90'
                    error = {formError.password}
                    onChangeText={(value) => onChange(value, 'password')}/>

                <TouchableOpacity style={styles.forgotPasswordButton}>
                    <Text>Forgot your password?</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={ signIn } style={styles.signUpButton}>
                    <Text style={styles.signUpTextButton}>Sign in</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={ changeForm } style={styles.signInButton}>
                    <Text style={styles.signInTextButton}>Already have an account? <Text style={styles.signInTextButtonSpan}>Sign Up</Text></Text>
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
        borderRadius: 15,
    },

    title:{
        fontFamily: "OpenSans-Bold",
        fontSize: 24,
    },

    inputStyle: {
        fontFamily: "OpenSans-Regular",
        fontSize: 16,
    },

    forgotPasswordButton:{
        fontFamily: "OpenSans-SemiBold",
        alignSelf: "flex-end",
        color: "#686868",
        marginBottom: 16,
    },

    signUpButton:{
        width: "100%",
        height: 40,
        backgroundColor: "#DB7D90",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 21,
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
})
