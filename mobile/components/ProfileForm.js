import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, Dimensions } from 'react-native';
import { FormTextField } from './inputs/index';
import TextSwitchToggle from './toggles/TextSwitchToggle';
import SubmitButton from './buttons';
import { getScreenDims } from './../globals/helpers/dimensions';
import { Separater } from './misc/index';

const ProfileForm = ({ mode, submitForm }) => {

    const [userName, setUserName] = useState({
        isFocused: false,
        value: ''
    });


    return <View>
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
            <SubmitButton onPress={submitForm} />
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