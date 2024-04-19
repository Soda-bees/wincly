import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  PanResponder,
} from 'react-native';
import {styles} from './style';
import images from '../../services/utilities/images';
import {colors, sizes} from '../../services';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import backendURL from '../../services/config/backendURL';
import {ActivityIndicator} from 'react-native';
import socket from '../../services/config/io';
import HomeCard from '../../components/HomeCard';
import homeMain from '../../assets/homeMain.png';
import homeMainBg from '../../assets/homeMainBg.png';
import Tooltip from 'react-native-walkthrough-tooltip';
import {
  selectShowTutorial,
  setShowTutorialFalse,
  setShowTutorialTrue,
} from '../../store/showTutorial';

export default function Like({navigation}) {
  const dispatch = useDispatch();
  const showTutorial = useSelector(selectShowTutorial);

  const {userDetalis} = useSelector(state => state.userDetailsSlice);
  const [updatedUserDetails, setUpdatedUserDetails] = useState();
  const [isMatch, setIsMatch] = useState(false);
  const [array, setArray] = useState();
  const [users, setUsers] = useState([]);
  const [matchedUser, setMatchUser] = useState([]);
  const [loader, setLoader] = useState(false);
  const [chatRoomId, setChatRoomId] = useState();
  const [chatRoomData, setChatRoomData] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedCards, setLikedCards] = useState([]);
  const [guideVisible, setGuideVisible] = useState(true);
  const [secondguideVisible, setSecondGuideVisible] = useState(false);
  const scrollViewRef = useRef(null);
  const [imgActive, setImgActive] = useState(0);
  useEffect(() => {
    setGuideVisible(true);
  }, []);

  const handleFirstTooltipPress = () => {
    setGuideVisible(false);
    setSecondGuideVisible(true);
  };

  const handleSecondTooltipPress = () => {
    setSecondGuideVisible(false);
    dispatch(setShowTutorialFalse())
  };

  const handleScroll = event => {
    const slideWidth = Math.round(
      event.nativeEvent.contentOffset.x / slideWidth,
    );
    const slide = Math.round(event.nativeEvent.contentOffset.x / slideWidth);
    if (slide !== imgActive) {
      setImgActive(slide);
    }
  };
  useEffect(() => {
    navigation.addListener('focus', () => {
      // console.log('working-------------->>>');
      getUserDetails();
    });
  }, [navigation]);

  // useEffect(() => {
  //   socket.on(`addLike`, data => {
  //     console.log('addLike--------->', data);
  //     if (users) {
  //       console.log('users--------->', users);
  //       let newUsers = [...users];
  //       console.log('newUsers--------->', newUsers);
  //       // console.log(newUsers[0].like);
  //       const object = newUsers?.find(obj => obj?._id === data?._id);
  //       console.log('object=-=-=-=-=-=--->', object);
  //       if (object) {
  //         object.like?.push(data?.email);
  //         setUsers(newUsers);
  //         console.log('object hai');
  //         console.log('like socket work done');
  //       } else {
  //         console.log('object nh hai');
  //         console.log('updatedUserDetails--------> ', updatedUserDetails?.like);
  //         if (updatedUserDetails?._id === data?._id) {
  //           console.log('id braber hai');
  //           let newUpdatedUserDetails = { ...updatedUserDetails };
  //           // console.log('newUpdatedUserDetails------->', newUpdatedUserDetails);
  //           newUpdatedUserDetails.like.push(data?.email);
  //           setUpdatedUserDetails(newUpdatedUserDetails);
  //           console.log('ad like in user details');
  //           console.log('like socket work done');
  //         } else {
  //           console.log('ye blkul nh chalna chaiye');
  //         }
  //       }
  //     }
  //   });
  // }, [socket, users, updatedUserDetails]);

  useEffect(() => {
    const handleCustomEvent = data => {
      // console.log("socket data", data);
      let newUsers = [...users];
      const object = newUsers?.find(obj => obj?._id === data?.userId);
      if (object) {
        // console.log('object hai');
        object.like?.push(data.likeId);
        // console.log("object m push krdya");
      } else {
        // console.log('object nh hai');
        if (updatedUserDetails._id === data?.userId) {
          // console.log("user data m push ho g " , updatedUserDetails.like);
          let newUpdatedUserDetails = {...updatedUserDetails};
          newUpdatedUserDetails.like.push(data?.likeId);
          setUpdatedUserDetails(newUpdatedUserDetails);
          // console.log("user details m push krdya");
        }
      }
    };

    socket.on('receivedLikeData', handleCustomEvent);

    return () => {
      socket.off('receivedLikeData', handleCustomEvent);
    };
  }, [users]);

  const getUserDetails = async () => {
    setLoader(true);
    try {
      const {data} = await axios.post(backendURL + 'api/wincly/singleUser', {
        _id: userDetalis._id,
      });
      // console.log('SingleUserdata--------------------->>', data.data);
      setUpdatedUserDetails(data.data);
      getAllUsers(data.data.interest);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAllUsers = async interest => {
    try {
      const {data} = await axios.get(backendURL + 'api/wincly/allUser');
      let updatedUser = data.data.filter(
        t => t.interest.filter(n => interest.includes(n)).length > 0,
      );
      // console.log('updatedUser=================>', updatedUser);
      const replaceCurrUser = updatedUser.filter(
        obj => obj._id !== userDetalis._id,
      );
      // console.log('ReplaceCurrUser========>', replaceCurrUser);

      const searchString = userDetalis._id;

      const filteredData = replaceCurrUser.filter(obj => {
        return obj.like.every(item => item !== searchString);
      });
      // console.log('filteredData=============>', filteredData);
      setUsers(filteredData);
      setLoader(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleMatch = async () => {
    console.log('match work');
    const item = users[currentIndex];
    const _id1 = updatedUserDetails._id;
    const _id2 = item._id;
    if (updatedUserDetails.like.includes(item._id)) {
      console.log('us na mjh like krawa hai');
      try {
        const {data} = await axios.post(
          backendURL + 'api/wincly/addLikeWithIncWallet',
          {
            _id: item._id,
            likeId: updatedUserDetails._id,
            userId: userDetalis._id,
          },
        );
        console.log(data);
        if (data.message) {
          const obj = {
            userId: item._id,
            likeId: updatedUserDetails._id,
            userData: updatedUserDetails,
          };
          socket.emit('sendLikeData', obj);
          console.log('done');
          setMatchUser(item);
          setIsMatch(true);
          try {
            const response = await axios.post(
              backendURL + 'api/wincly/findExistingChatroom',
              {
                _id1,
                _id2,
              },
            );
            console.log(response.data);
            console.log(response.data.chatId);
            if (response.data.success) {
              setChatRoomId(response.data.chatId);
              const chatroomId = response.data.chatId;
              const obj2 = {
                userId: item._id,
                likeId: updatedUserDetails._id,
                userData: updatedUserDetails,
                chatroomId,
              };
              socket.emit('sendLikeMatch', obj2);
            }
          } catch (error) {
            console.log('-=-=', error.message);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      console.log('us na mjh like nh krawa');
      try {
        const {data} = await axios.post(backendURL + 'api/wincly/addLike', {
          _id: item._id,
          likeId: updatedUserDetails._id,
        });
        console.log(data);
        if (data.message) {
          const obj = {
            userId: item._id,
            likeId: updatedUserDetails._id,
          };
          socket.emit('sendLikeData', obj);
          console.log('done');
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleRemove = item => {
    const newUsers = [...users];
    const filteredUser = newUsers.filter(obj => obj._id !== item._id);
    setUsers(filteredUser);
  };

  // =============================SWIPER WORK============================

  // useEffect(() => {
  //   if (users.length == 0) {
  //     // let newUsers = [...users]
  //     // setUsers(newUsers)
  //     console.log("---------=-=-=-=-=working");
  //   }
  // }, [users]);
  const swipe = useRef(new Animated.ValueXY()).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const panResponser = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, {dx, dy}) => {
      // console.log('dx:' + dx + ' dy:' + dy);
      swipe.setValue({x: dx, y: dy});
    },
    onPanResponderRelease: (_, {dx, dy}) => {
      // console.log('released:' + 'dx:' + dx + ' dy:' + dy);
      // console.log('dx-------->', dx);
      // console.log('dy-------->', dy);
      let direction = Math.sign(dx);
      let isActionActive = Math.abs(dx) > 200;
      if (isActionActive) {
        Animated.timing(swipe, {
          toValue: {x: 500 * dx, y: dy},
          useNativeDriver: true,
          duration: 500,
        }).start(removeCard);
      } else {
        Animated.spring(swipe, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });
  const removeCard = useCallback(() => {
    setUsers(prepState => prepState.slice(1));
    swipe.setValue({x: 0, y: 0});
  }, [swipe]);
  const handelSelection = useCallback(
    direction => {
      Animated.timing(swipe, {
        toValue: {x: direction * 500, y: 0},
        useNativeDriver: true,
        duration: 500,
      }).start(removeCard);
      // console.log('move', swipe);
    },
    [removeCard],
  );

  return (
    <SafeAreaView>
      {showTutorial && (
        <ScrollView
          // ref={scrollViewRef}
          // style={{flex: 1}}
          horizontal={true}
          // scrollEventThrottle={16}
          // pagingEnabled={true}
          // showsHorizontalScrollIndicator={false}
          // onScroll={handleScroll}
        >
          <Tooltip
            isVisible={guideVisible}
            contentStyle={styles.tooltipStyle}
            content={
              <View>
                <Image source={images.arrowRight} style={styles.guideArrow} />
                <Text style={styles.guideHeading}>Swipe Right</Text>
                <Text style={styles.guideSubText}>
                  Exciting! You're interested in someone. Swipe right to let
                  them know.
                </Text>
                <Image source={images.hand} style={styles.guideHand} />
              </View>
            }
            placement="top"
            onClose={handleFirstTooltipPress}
          />

          <Tooltip
            isVisible={!guideVisible && secondguideVisible}
            contentStyle={styles.tooltipStyle}
            content={
              <TouchableOpacity onPress={handleSecondTooltipPress}>
                <Image source={images.arrowLeft} style={styles.guideArrow} />
                <Text style={styles.guideHeading}>Swipe Left</Text>
                <Text style={styles.guideSubText}>
                  Not feeling a connection? No problem. Swipe left to pass.
                </Text>
                <Image source={images.hand} style={styles.guideHand} />
              </TouchableOpacity>
            }
            placement="top"
            onClose={handleSecondTooltipPress}
          />
        </ScrollView>
      )}

      <View style={styles.container}>
        <View style={styles.header}>
          {/* <TouchableOpacity onPress={()=> {dispatch(setShowTutorialTrue)}}>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
              dispatch(setShowTutorialTrue);
            }}>
            <Image source={images.DrawerBtn} style={styles.headerImgIOS} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (isMatch) {
                navigation.navigate('ChatRoom', {chatId: chatRoomId});
                setIsMatch(false);
              } else {
                navigation.navigate('Interests');
              }
            }}>
            <Image
              source={isMatch ? images.chatIcon : images.filterImg}
              style={isMatch ? styles.chatBtn : styles.headerImgIOS}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.forBtnTbs}></View>
        {loader ? (
          <View
            style={
              Platform.OS == 'ios' ? styles.loaderViewIOS : styles.loaderView
            }>
            <ActivityIndicator size={'large'} color={colors.appTextColor1} />
          </View>
        ) : (
          <View>
            {isMatch ? (
              <View>
                {isMatch && (
                  <TouchableOpacity
                    style={styles.fullScreen}
                    onPress={() => setIsMatch(false)}>
                    <View style={styles.fullScreen} />
                  </TouchableOpacity>
                )}
                {isMatch && showTutorial && 
                  <Tooltip
                    isVisible={true}
                    contentStyle={styles.tooltipStyle}
                    content={
                      <TouchableOpacity
                        onPress={() => {
                          setIsMatch(false);
                          dispatch(setShowTutorialTrue);
                        }}>
                        <Image
                          source={images.chatIcon}
                          style={styles.guideIcon2}
                        />
                        <Image
                          source={images.arrowFour}
                          style={styles.guideArrow2}
                        />
                        <Text style={styles.guideHeading2}>
                          Start Chatting!
                        </Text>
                        <Text style={styles.guideSubText2}>
                          You're ready to start chatting and building
                          connections.
                        </Text>
                        <Image source={images.hand} style={styles.guideHand2} />
                      </TouchableOpacity>
                    }
                    placement="top"
                  />
                }

                <View
                  style={
                    Platform.OS == 'ios' ? styles.imgView2IOS : styles.imgView2
                  }>
                  <Image
                    source={{uri: updatedUserDetails?.profileImg}}
                    style={
                      Platform.OS == 'ios'
                        ? styles.backgroundImg2IOS
                        : styles.backgroundImg2
                    }
                  />
                  <Image
                    source={{
                      uri: matchedUser.profileImg,
                    }}
                    style={
                      Platform.OS == 'ios'
                        ? styles.backgroundImg2IOS
                        : styles.backgroundImg2
                    }
                  />

                  <Image
                    source={images.thumbImg}
                    style={
                      Platform.OS == 'ios'
                        ? styles.likeBtnImgIOS
                        : styles.likeBtnImg
                    }
                  />
                </View>
                <Text style={styles.text4} onPress={() => setIsMatch(!isMatch)}>
                  Its a Match!!
                </Text>
                <Text style={styles.text5}>
                  {`Message ${matchedUser.username} to let them know how interesting you find them`}
                  {/* Message Daniel to let them know how interesting you find them */}
                </Text>
              </View>
            ) : users.length < 0 ? (
              <View>
                <Text style={{color: 'red'}}>empty</Text>
              </View>
            ) : (
              <View>
                {users
                  .map((item, index) => {
                    let isFirst = index === 0;
                    let dragHanlders = isFirst ? panResponser.panHandlers : {};
                    return (
                      <>
                        <HomeCard
                          key={index}
                          item={item}
                          rotate={rotate}
                          isFirst={isFirst}
                          swipe={swipe}
                          {...dragHanlders}
                        />
                      </>
                    );
                  })
                  .reverse()}
                {users?.length > 0 ? (
                  <View
                    style={
                      Platform.OS == 'ios' ? styles.btnViewIOS : styles.btnView
                    }>
                    <TouchableOpacity
                      style={styles.swipeTpuchable}
                      onPress={
                        () =>
                          //  handleRemove(item)
                          handelSelection(-1)
                        // handleSwipeLeft()
                      }>
                      <Image
                        source={images.XBtn}
                        style={
                          Platform.OS == 'ios' ? styles.BtnIOS : styles.Btn
                        }
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.swipeTpuchable}
                      onPress={() =>
                        // handleMatch(item)
                        {
                          handelSelection(1);
                          handleMatch();
                        }
                      }>
                      <Image
                        source={images.DoneBtn}
                        style={
                          Platform.OS == 'ios' ? styles.BtnIOS : styles.Btn
                        }
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    <View style={styles.noPostView}>
                      <Text style={styles.noPostText}>
                        No users found. Change your interests to discover more
                        matches.
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
