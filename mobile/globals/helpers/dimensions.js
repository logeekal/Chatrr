import { Dimensions } from 'react-native';


export const getScreenDims = () => {
    const sw =  Math.round(Dimensions.get('screen').width);
    const sh = Math.round(Dimensions.get('screen').height);
    console.log(`Dimensions are ${sh}X${sw}`);
    return {sw, sh}
}
