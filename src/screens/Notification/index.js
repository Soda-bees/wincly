import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, Image } from "react-native"
import { useSelector } from 'react-redux'
import { styles } from './style';
import BackButton from '../../components/BackButton';
import axios, { formToJSON } from 'axios';
import backendURL from '../../services/config/backendURL';
import formatToJSON from '../../services/utilities/JsonLog';
import socket from "../../services/config/io"
import ModalComponent from "./Modal"
import DeclineModal from './declineModal';
import AcceptModal from './acceptModal';

export default function Notification({ route }) {

  const userData = useSelector((state) => state.userDetailsSlice.userDetalis)
  // console.log(userData);
  const [tabName, setTabName] = useState('joinReq')
  const [joinReq, setJoinReq] = useState([])
  const [acceptReq, setAcceptReq] = useState([])
  const [rejectReq, setRejectReq] = useState([])
  const [isModalShow, setIsModalShow] = useState(false)
  const [selectedReq, setSelectedReq] = useState()
  const [selectedIndex, setSelectedIndex] = useState()
  const [updatedUserData, setUpdatedUserData] = useState()
  const [isDeclineModalShow, setIsDeclineModalShow] = useState(false)
  const [rejReqModalData, setRejReqModalData] = useState()
  const [isAcceptModalShow, setIsAcceptModalShow] = useState(false)
  const [acceptReqModalData, setAcceptReqModalData] = useState()

  const getUserData = async () => {
    // console.log("work");
    try {
      const { data } = await axios.post(backendURL + "api/wincly/singleUser", {
        _id: userData._id
      })
      if (data.message === "User Data") {
        // console.log(data.data.joinReq);
        // console.log(data.data.acceptReq);
        setUpdatedUserData(data.data)
        setJoinReq(data.data.joinReq)
        setRejectReq(data.data.rejectReq)
        setAcceptReq(data.data.acceptReq)
      } else {
        console.log("error-=-=-=", data.message);
      }
    } catch (error) {
      console.log("error==-=->", error);
    }
  }

  useEffect(() => {
    getUserData()
  }, [])
  useEffect(() => {
    const name = route.params
    // console.log("name==-=-=-==-", name);
    if (name) {
      setTabName(name)
    }
  }, [])

  useEffect(() => {
    const handleCustomEvent = data => {
      // const currentUser = { ...updatedUserDetails };
      if (data.eventOrganizer_id === userData._id) {
        // setEventJoinReqData(eventJoinReqData => [...eventJoinReqData, data]);
        setJoinReq(joinReq => [...joinReq, data])
      }
      // Update state or perform other actions
      // console.log('received data socket',  data.eventOrganizer_id);
      // console.log('=-==-=--=>' , userData._id);
    };

    socket.on('sendEventJoinReq', handleCustomEvent);

    return () => {
      socket.off('sendEventJoinReq', handleCustomEvent);
    };
  }, []);

  useEffect(() => {
    const handleCustomEvent = data => {
      if (data.eventParticipantsData._id === userData._id) {
        // setEventJoinReqData(eventJoinReqData => [...eventJoinReqData, data]);
        setRejectReq(rejectReq => [...rejectReq, data])
      }
    };

    socket.on('sendEventDeclined', handleCustomEvent);

    return () => {
      socket.off('sendEventDeclined', handleCustomEvent);
    };
  }, []);

  useEffect(() => {
    const handleCustomEvent = data => {
      if (data.eventParticipantsData._id === userData._id) {
        // setEventJoinReqData(eventJoinReqData => [...eventJoinReqData, data]);
        setAcceptReq(acceptReq => [...acceptReq, data])
      }
    };

    socket.on('sendEventAccepted', handleCustomEvent);

    return () => {
      socket.off('sendEventAccepted', handleCustomEvent);
    };
  }, []);



  const handleRemoveItemInJoinReq = (selectedIndex) => {
    const updatedJoinReq = [...joinReq];
    updatedJoinReq.splice(selectedIndex, 1);
    setJoinReq(updatedJoinReq);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <BackButton title={'Notifications'} />
        <View style={styles.tabView}>
          <TouchableOpacity onPress={() => setTabName('joinReq')} style={tabName === 'joinReq' ? styles.tabBtnActive : styles.tabBtnInactive}>
            <Text style={styles.tabBtnText}>Join requests</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTabName('acceptReq')} style={tabName === 'acceptReq' ? styles.tabBtnActive : styles.tabBtnInactive}>
            <Text style={styles.tabBtnText}>Accepted requests</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTabName('rejectReq')} style={tabName === 'rejectReq' ? styles.tabBtnActive : styles.tabBtnInactive}>
            <Text style={styles.tabBtnText}>Rejected requests</Text>
          </TouchableOpacity>
        </View>
        {
          tabName === 'joinReq' &&
          <View>
            {
              joinReq.length > 0 ? (
                <ScrollView>
                  {
                    joinReq?.map((item, index) => {
                      return (
                        <TouchableOpacity key={index} style={styles.joinReqMapView} onPress={() => {
                          setSelectedReq(item)
                          setSelectedIndex(index)
                          setIsModalShow(true)

                        }}>
                          <Image source={{ uri: item.eventParticipantsData.profileImg }} style={styles.joinReqMapViewImg} />
                          <View style={styles.textView}>

                            <Text style={styles.text1}>
                              {item.eventParticipantsData.username}
                            </Text>
                            <Text numberOfLines={1} style={styles.text2}>
                              {`${item.eventParticipantsData.username} is interested in participating in ${item.eventTitle} event.`}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )
                    }).reverse()
                  }
                  <View style={styles.marginBottom}></View>
                </ScrollView>
              ) : (
                <View style={styles.notDataTextContainer}>
                  <Text style={styles.notDataText}>
                    No pending join requests
                  </Text>
                </View>
              )
            }
          </View>
        }
        {
          tabName === 'acceptReq' &&
          <View>
            {
              acceptReq.length > 0 ? (
                <ScrollView>
                  {
                    acceptReq?.map((item, index) => {
                      return (
                        <TouchableOpacity key={index} style={styles.joinReqMapView} onPress={() => {
                          setAcceptReqModalData(item)
                          setIsAcceptModalShow(true)
                        }}>
                          <Image source={{ uri: item.eventOrganizerData.profileImg }} style={styles.joinReqMapViewImg} />
                          <View style={styles.textView}>

                            <Text style={styles.text1}>
                              {item.eventOrganizerData.username}
                            </Text>
                            <Text numberOfLines={1} style={styles.text2}>
                              {`${item.eventOrganizerData?.username} accept your's request for join ${item.eventTitle} event.`}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )
                    }).reverse()
                  }
                  <View style={styles.marginBottom}></View>
                </ScrollView>
              ) : (
                <View style={styles.notDataTextContainer}>
                  <Text style={styles.notDataText}>
                    No pending accepted requests
                  </Text>
                </View>
              )
            }
          </View>
        }
        {
          tabName === 'rejectReq' &&
          <View>
            {
              rejectReq.length > 0 ? (
                <ScrollView>
                  {
                    rejectReq?.map((item, index) => {
                      item.reason
                      return (
                        <TouchableOpacity key={index} style={styles.joinReqMapView} onPress={() => {
                          setRejReqModalData(item)
                          setIsDeclineModalShow(true)
                        }}>
                          <Image source={{ uri: item.eventOrganizerData.profileImg }} style={styles.joinReqMapViewImg} />
                          <View style={styles.textView}>

                            <Text style={styles.text1}>
                              {item.eventOrganizerData.username}
                            </Text>
                            {
                              item.reason === 'eventOrgDecline' &&
                              <Text numberOfLines={1} style={styles.text2}>
                                {`${item.eventOrganizerData.username} declines your's request for join ${item.eventTitle} event.`}
                              </Text>
                            }
                            {
                              item.reason === 'participantListFull' &&
                              <Text numberOfLines={1} style={styles.text2}>
                                {`You can't join ${item.eventTitle} event. The limit for number of participants is already exceeded`}
                              </Text>
                            }
                            {
                              item.reason === 'alreadyParticipent' &&
                              <Text numberOfLines={1} style={styles.text2}>
                                {`Your request for joining event ${item.eventTitle} has been declined because you're already in the list of participants.`}
                              </Text>
                            }
                          </View>
                        </TouchableOpacity>
                      )
                    }).reverse()
                  }
                  <View style={styles.marginBottom}></View>
                </ScrollView>
              ) : (
                <View style={styles.notDataTextContainer}>
                  <Text style={styles.notDataText}>
                    No pending rejected requests
                  </Text>
                </View>
              )
            }
          </View>
        }
      </View>
      <ModalComponent
        isModalShow={isModalShow}
        selectedReq={selectedReq}
        setIsModalShow={setIsModalShow}
        handleRemoveItemInJoinReq={handleRemoveItemInJoinReq}
        updatedUserData={updatedUserData}
      />
      <DeclineModal
        isDeclineModalShow={isDeclineModalShow}
        setIsDeclineModalShow={setIsDeclineModalShow}
        rejReqModalData={rejReqModalData}
      />
      <AcceptModal
        isAcceptModalShow={isAcceptModalShow}
        setIsAcceptModalShow={setIsAcceptModalShow}
        acceptReqModalData={acceptReqModalData}
      />
    </SafeAreaView>
  )
}
