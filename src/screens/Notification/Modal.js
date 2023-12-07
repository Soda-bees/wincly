import React, { useState } from 'react'
import axios from 'axios'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import Modal from "react-native-modal"
import backendURL from '../../services/config/backendURL'
import { useSelector } from 'react-redux'
import formatToJSON from '../../services/utilities/JsonLog'
import socket from "../../services/config/io"
import { styles } from './style'
import images from '../../services/utilities/images'

export default function ModalComponent({
    isModalShow,
    selectedReq,
    setIsModalShow,
    handleRemoveItemInJoinReq,
    updatedUserData
}) {

    const userData = useSelector((state) => state.userDetailsSlice.userDetalis)

    const handleReject = async () => {
        try {
            const { data } = await axios.post(backendURL + "api/wincly/removeReqNotification", {
                userId: userData._id,
                joinReqId: selectedReq._id
            })
            console.log(data);
            if (data.success) {
                handleRemoveItemInJoinReq()
                socket.emit('eventDeclined', selectedReq);
                setIsModalShow(false)
            } else {
                setIsModalShow(false)
            }
        } catch (error) {
            console.log(data);
            setIsModalShow(false)
        }
    }
    const handleAccept = async () => {
        try {
            const { data } = await axios.post(backendURL + "api/wincly/removeReqNotification", {
                userId: userData._id,
                joinReqId: selectedReq._id
            })
            console.log(data);
            if (data.success) {
                handleRemoveItemInJoinReq()
                socket.emit('eventAccepted', selectedReq);
                setIsModalShow(false)
            } else {
                setIsModalShow(false)
            }
        } catch (error) {
            console.log(data);
            setIsModalShow(false)
        }
    }
    return (
        <Modal isVisible={isModalShow}>
            <View style={styles.joinReqModalView}>
                <TouchableOpacity style={styles.XbtnView} onPress={() => { setIsModalShow(false) }}>
                    <Image source={images.XBtn} style={styles.Xbtn} />
                </TouchableOpacity>
                <Text style={styles.joinModalText1}>
                    <Text style={styles.joinModalYellowText}>
                        {selectedReq && selectedReq?.eventParticipantsData?.username}
                    </Text>
                    {` is interested in participating in your ${selectedReq && selectedReq?.eventTitle} event.`}
                </Text>
                <View style={styles.joinReqModalImgView}>
                    <Image source={selectedReq && { uri: selectedReq?.eventParticipantsData?.profileImg }} style={styles.joinReqModalImg} />
                    <View style={styles.joinReqModalImgViewChild}>
                        <Text style={styles.joinModalText2}>
                            {selectedReq && selectedReq?.eventParticipantsData?.username}
                        </Text>
                        <View style={styles.joinModalLocationView}>
                            <Image source={images.location} style={styles.locationImg} />
                            <Text style={styles.joinModalText3}>
                                {selectedReq && selectedReq?.eventParticipantsData?.location}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.joinModalbtnView}>
                    <TouchableOpacity style={styles.joinModalAcceptBtn} onPress={handleAccept}>
                        <Image source={images.accept} style={styles.joinModalAcceptImg} />
                        <Text style={styles.joinBtnAcceptText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.joinModalDeclineBtn} onPress={handleReject}>
                        <Image source={images.decline} style={styles.joinModalDeclineImg} />
                        <Text style={styles.joinBtnDeclineText}>Decline</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
