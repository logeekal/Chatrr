import React, { useState, useRef } from 'react';
import { Text, View, TextInput, StyleSheet, Dimensions } from 'react-native';
import { FormTextField } from './inputs/index';
import TextSwitchToggle from './toggles/TextSwitchToggle';
import SubmitButton from './buttons';
import { getScreenDims } from './../globals/helpers/dimensions';
import { Separater } from './misc/index';
import ConfirmGoogleCaptcha from 'react-native-google-recaptcha-v2';
import { constants } from '../globals/constants';

const ProfileForm = ({ mode, submitForm }) => {

    const [user, setUser] = useState({
        userName: '',
        loggedIn: true,
        gender: 'M'
    });

    const [userName, setUserName] = useState({
        isFocused: false,
        value: ''
    });

    const captchaForm = useRef(null)

    const {CAPTCHA}  = constants;


    const setGender = (gender) => {
        setUser({
            ...user,
            gender: gender
        })
    }


    const onMessage = event => {
        if (event && event.nativeEvent.data){
            console.log(event.nativeEvent.data)
            if(['cancel','error', 'expired'].includes(event.nativeEvent.data)){
                console.log(`Captcha Event resulted in ... ${event.nativeEvent.data}`)
                captchaForm.current.hide();
                return;
            }else{
                console.log(`Captcha Verified.`);       
                captchaForm.current.hide();
                
                setTimeout(()=> {
                    submitForm(user);
                }, 300);
                
                return;
            }
        }

    }


    return <View>
        {
            process.env.NODE_ENV === 'production' &&
        
            <ConfirmGoogleCaptcha 
            ref={captchaForm}
            siteKey={CAPTCHA.siteKey}
            baseUrl={CAPTCHA.url}
            languageCode="en"
            onMessage={onMessage}
            />
        }
        
        <View style={styles.input}>
            <FormTextField
                onFocus={() => { 
                    console.log('Firing On focus'); 
                    setUserName({...userName, isFocused: true});
                }}
                value={user.userName}
                onBlur={()=> {setUserName({...userName, isFocused: false})}}
                isFocused={userName.isFocused}
                placeholder={"username"}
                placeholderTextColor={"grey"}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={ value => {
                    setUser({
                        ...user,
                        userName: value
                    });
                }}
                maxLength={20}
            />
        </View>
        <Separater height={60} border={false} ></Separater>
        <View style={styles.input} >
            <TextSwitchToggle 
                setGender={setGender}
            />
        </View>
        <Separater height={60} border={false} ></Separater>

        <View style={{
            
        }} >
            <SubmitButton onPress={()=> {
                process.env.NODE_ENV === 'production'
                ?
                 captchaForm.current.show()
                 :
                 submitForm(user)

            }} 
            buttonTheme="light"
            width={200}
            height={70}
            textSize={36}
            text="Start"
            radius={35}
            
            />
        </View>
        
    </View>
}


const styles =  StyleSheet.create({
    input:{ 
    
    },
    toggle:{
    },
    submit: {
    }

})
export default ProfileForm;