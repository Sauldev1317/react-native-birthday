import React, { useState } from 'react';
import { StyleSheet, ImageBackground, View, StatusBar, Platform, SafeAreaView } from 'react-native';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const backgroundURL = isLogin ? require(`../assets/img/login-background.jpg`) : require(`../assets/img/register-background.jpg`);
    const changeForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <>
            <StatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'}/>
            <ImageBackground source={backgroundURL} style={styles.background}>
                <SafeAreaView style={styles.view}>
                    { isLogin ? <LoginForm changeForm={ changeForm }/> : <RegisterForm changeForm={ changeForm }/> }
                </SafeAreaView>
            </ImageBackground>
        </>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        padding: 40
    }
});
