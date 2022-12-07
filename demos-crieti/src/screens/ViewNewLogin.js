import React, { useEffect, useState, useContext } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import { theme } from '../styles/Theme';
import Checkbox from 'expo-checkbox';
const base64 = require('base-64');
import * as SecureStore from 'expo-secure-store';
import { AppContext } from '../context/AppContext';
import LoginScreen from "react-native-login-screen";
import axios from 'axios';

// import { Container } from './styles';

const ViewNewLogin = ({ navigation }) => {

    const fieldUser = "myapp_usuario";
    const fieldPassword = "myapp_senha";
    const [loading, setLoading] = useState(false);

    const { username, password, saveUser } = useContext(AppContext);
    console.log('VARS=>', username, password);

    /*const [usuario, setUsuario] = useState({
        username: '',
        password: '',
        saveUser: false,
    });*/

    const usuario = {
        username: '',
        password: ''
    };

    async function login(user, pass) {

        setLoading(true);

        // async function testLogin() {
        //     const response = await fetch('http://177.44.248.60:3000/auth', {
        //         method: 'POST',
        //         headers: {
        //             'Authorization': 'Basic ' +
        //                 base64.encode(user + ":" + pass)
        //         }
        //     });
        //     const json = await response.json();

        //     console.log('json=>', json);


        //     setLoading(false);
        //     if (json.id) {

        //         //DADOS OK => navegar adiante
        //         saveUser(user, pass);
        //         //navigation.navigate("ViewUsers");

        //         navigation.reset({
        //             index: 0,
        //             routes: [{ name: "ViewUsers" }]
        //         })

        //     } else {
        //         Alert.alert('Que pena 😥', json.message);
        //     }
        // }


        try {

            // Manda junto com o headers as informações para authentications confirmar.
            const response = await axios.get("http://177.44.248.60:3000/auth", {
                headers: {
                    "Authorization": "Basic" + base64.encode(user + ":" + pass),
                    "Content-Type:": "application/json",
                }
            })

            // const json = await response.json();
            // console.log('json=>', json);

            setLoading(false);
            if (response.status === 200) {
                const json = await response.json();
                console.log('json=>', json);
                
                saveUser(user, pass);

                navigation.reset({
                    index: 0,
                    routes: [{ name: "ViewUsers" }]
                });
            } else if (response.status === 400) {
                Alert.alert('Erro ao login', response.data.message);
            }

        } catch (error) {
            Alert.alert('Erro ao login', response.data.message);
        } finally {
            setLoading(false);
        }


        const json = await response.json();
        console.log('json=>', json);

        setLoading(false);
        if (response.status === 200) {
            const json = await response.json();
            console.log('json=>', json);
            saveUser(user, pass);
            navigation.reset({
                index: 0,
                routes: [{ name: "ViewUsers" }]
            });
        } else if (response.status === 400) {
            Alert.alert('Erro ao login', response.data.message);
        }

    }

    return (
        <KeyboardAvoidingView
            // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[theme.login, styles.container]}>

            <TextInput
                style={styles.textInput}
                placeholder="Username"
            />

            {/* {loading == true ? <ActivityIndicator size='large' color='#fff' />
                :
                <LoginScreen
                    style={[theme.login, { marginTop: 8 }]}
                    logoImageSource={require("../assets/logo.png")}
                    onLoginPress={() => login(usuario.username, usuario.password)}
                    onSignupPress={() => { }}
                    onEmailChange={(user) => { usuario.username = user }}
                    onPasswordChange={(password) => { usuario.password = password }}>
                </LoginScreen>
            }  */}
        </KeyboardAvoidingView>
    );
}

export default ViewNewLogin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});