import React, {useState} from 'react';

import { View, Modal, Text, TouchableOpacity, Image } from 'react-native';
import OverlayMenu from './../../screens/OverlayMenu';

const Menu = ({Iconstyle}) => {
    const [menuVisible, setMenuVisible] = useState(false);
    return (
        <View>
            {
                menuVisible == true ?
                    <Modal
                        animationType={"fade"}
                        transparent={true}
                        onRequestClose={() => Alert.alert('Closing Model', 'Modal is closing now. Thanks!')}
                    >
                        <OverlayMenu
                            visible={menuVisible}
                            onClose={() => {
                                setMenuVisible(false)
                            }}
                        />
                    </Modal>
                    :
                    null
            }

            <TouchableOpacity
                onPress={() => {
                    setMenuVisible(!menuVisible);
                }}>
                <Image
                    style={Iconstyle}
                    source={require('../../assets/icons/menu.png')}
                />
                {/* <SvgXml width="200" height="200" xml={Menu} />; */}
            </TouchableOpacity>
        </View>

    );
};



export default Menu;