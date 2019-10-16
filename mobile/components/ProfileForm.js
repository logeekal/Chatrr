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

    const [userName, setUserName] = useState({
        isFocused: false,
        value: ''
    });

    const captchaForm = useRef(null)

    const {CAPTCHA}  = constants;

    const onMessage = event => {
        if (event && event.nativeEvent.data){
            if(['cancel','error', 'expired'].includes(events.nativeEvent.data)){
                console.log(`Captcha Event resulted in ... ${event.nativeEvent.data}`)
                captchaForm.hide();
                return;
            }else{
                console.log(`Captcha Verified.`);
                setTimeout(()=> {
                    captchaForm.hide();
                }, 1500)
                
                return;
            }
        }
    }


    return <View>
        <ConfirmGoogleCaptcha 
            ref={captchaForm}
            siteKey={CAPTCHA.siteKey}
            baseUrl={"localhost"}
            languageCode="en"
            onMessage={onMessage}
        />
        <View style={styles.input}>
            <FormTextField
                onFocus={() => { 
                    console.log('Firing On focus'); 
                    setUserName({...userName, isFocused: true});
                }}
                value={userName.value}
                onBlur={()=> {setUserName({...userName, isFocused: false})}}
                isFocused={userName.isFocused}
                placeholder={"username"}
                placeholderTextColor={"grey"}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={ value => {
                    setUserName({...userName,
                        value: value
                    });
                }}
                maxLength={20}
            />
        </View>
        <Separater height={60} border={false} ></Separater>
        <View style={styles.input} >
            <TextSwitchToggle />
        </View>
        <Separater height={60} border={false} ></Separater>

        <View style={styles.input} >
            <SubmitButton onPress={()=> captchaForm.current.show()} />
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