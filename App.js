import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, StatusBar, Button, SafeAreaView} from 'react-native';
import firebase from './src/utils/firebase';
import Auth from "./src/components/Auth";
import ListBirthday from "./src/components/ListBirthday";
import "firebase/auth";

function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((resp) => {
      setUser(resp);
    });
  }, []);


  if (user === undefined) return null;

  return (
    <>
      <StatusBar/>
      <View style={styles.background}>
        {
          user ? <ListBirthday user={user} /> : <Auth /> 
        }
      </View>
    </>
  )
}

const logout = () => {
  firebase.auth().signOut();
}

function Logout(){
  return (
    <SafeAreaView>
      <Text>Estas logeado</Text>
      <Button title="Cerrar sesión" onPress={logout}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
    }
});

export default App;
