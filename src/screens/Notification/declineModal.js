import React from 'react'
import { Text, View, TouchableOpacity, Image } from "react-native"
import Modal from "react-native-modal"
import { styles } from './style';
import images from '../../services/utilities/images';


export default function DeclineModal({
    isDeclineModalShow,
    setIsDeclineModalShow,
    rejReqModalData
}) {
    return (
        <Modal isVisible={isDeclineModalShow}>
            <View style={styles.joinReqModalView}>
                <TouchableOpacity style={styles.XbtnView} onPress={() => {setIsDeclineModalShow(false)}}>
                    <Image source={images.XBtn} style={styles.Xbtn} />
                </TouchableOpacity>
                {
                    rejReqModalData && rejReqModalData?.reason === "participantListFull" &&
                    <Text style={styles.rejModalText1}>
                        {`You can't join `} <Text style={styles.joinModalYellowText} >{rejReqModalData && rejReqModalData.eventTitle}</Text> {`event. The limit for number of participants is already exceeded.`}
                    </Text>
                }
                {
                    rejReqModalData && rejReqModalData?.reason === "alreadyParticipent" &&
                    <Text style={styles.rejModalText1}>
                        {`Your request for joining event `} <Text style={styles.joinModalYellowText} >{rejReqModalData && rejReqModalData.eventTitle}</Text> {`has been declined because you're already in the list of participants.`}
                    </Text>
                }
                {
                    rejReqModalData && rejReqModalData?.reason === "eventOrgDecline" &&
                    <Text style={styles.rejModalText1}>
                        <Text style={styles.joinModalYellowText}>
                            {rejReqModalData && rejReqModalData.eventParticipantsData.username}
                        </Text>
                        {` declines your request for join `}
                        <Text style={styles.joinModalYellowText} >{rejReqModalData && rejReqModalData.eventTitle}</Text>
                        {` event.`}
                    </Text>
                }
                <View style={styles.joinReqModalImgView}>
                    <Image source={rejReqModalData && { uri: rejReqModalData?.eventOrganizerData?.profileImg }} style={styles.joinReqModalImg} />
                    <View style={styles.joinReqModalImgViewChild}>
                        <Text style={styles.joinModalText2}>
                            {rejReqModalData && rejReqModalData?.eventOrganizerData?.username}
                        </Text>
                        <View style={styles.joinModalLocationView}>
                            <Image source={images.location} style={styles.locationImg} />
                            <Text style={styles.joinModalText3}>
                                {rejReqModalData && rejReqModalData?.eventOrganizerData?.location}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.joinModalbtnView}>
                    <TouchableOpacity style={styles.joinModalAcceptBtn}
                        onPress={() => {
                            setIsDeclineModalShow(false)
                        }}
                    >
                        <Text style={styles.joinBtnAcceptText}>Done</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
