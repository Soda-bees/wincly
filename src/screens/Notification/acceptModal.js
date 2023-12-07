import React from 'react'
import { Text, View, TouchableOpacity, Image } from "react-native"
import Modal from "react-native-modal"
import { styles } from './style';
import images from '../../services/utilities/images';
import formatToJSON from '../../services/utilities/JsonLog';
import axios from 'axios';
import backendURL from '../../services/config/backendURL';
import {useNavigation} from '@react-navigation/native';

export default function AcceptModal({
    isAcceptModalShow,
    setIsAcceptModalShow,
    acceptReqModalData
}) {
    const navigation = useNavigation();
    const handleNavigateChat = async () => {
        const _id1 = acceptReqModalData?.eventOrganizerData?._id;
        const _id2 = acceptReqModalData?.eventParticipantsData?._id
        try {
            const { data } = await axios.post(backendURL + "api/wincly/findExistingChatroom", {
                _id1,
                _id2
            })
            console.log(data);
            if (data.success) {
                navigation.navigate('ChatRoom', { chatId: data.chatId })
                setIsAcceptModalShow(false)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal isVisible={isAcceptModalShow}>
            <View style={styles.joinReqModalView}>
                <TouchableOpacity style={styles.XbtnView} onPress={() => { setIsAcceptModalShow(false) }}>
                    <Image source={images.XBtn} style={styles.Xbtn} />
                </TouchableOpacity>
                <Text style={styles.joinModalText1}>
                    <Text style={styles.joinModalYellowText}>
                        {acceptReqModalData && acceptReqModalData?.eventOrganizerData?.username}
                    </Text>
                    {`  has accepted your  `}
                    <Text style={styles.joinModalYellowText}>
                        {acceptReqModalData && acceptReqModalData?.eventTitle}
                    </Text>
                    {`  event invitation.`}
                </Text>
                <View style={styles.joinReqModalImgView}>
                    <Image source={acceptReqModalData && { uri: acceptReqModalData?.eventOrganizerData?.profileImg }} style={styles.joinReqModalImg} />
                    <View style={styles.joinReqModalImgViewChild}>
                        <Text style={styles.joinModalText2}>
                            {acceptReqModalData && acceptReqModalData?.eventOrganizerData?.username}
                        </Text>
                        <View style={styles.joinModalLocationView}>
                            <Image source={images.location} style={styles.locationImg} />
                            <Text style={styles.joinModalText3}>
                                {acceptReqModalData && acceptReqModalData?.eventOrganizerData?.location}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.joinModalbtnView}>
                    <TouchableOpacity style={styles.joinModalAcceptBtn}
                        // onPress={() => {
                        //     setIsAcceptModalShow(false)
                        // }}
                        onPress={handleNavigateChat}
                    >
                        <Text style={styles.joinBtnAcceptText}>Message Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
