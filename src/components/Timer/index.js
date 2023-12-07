import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './style';

export default function Timer({
    hours,
    minutes,
    seconds,
    setHours,
    setMinutes,
    setSeconds,
}) {
    useEffect(() => {
        let myInterval;

        myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            } else if (minutes > 0) {
                setMinutes(minutes - 1);
                setSeconds(59);
            } else if (hours > 0) {
                setHours(hours - 1);
                setMinutes(59);
                setSeconds(59);
            } else {
                clearInterval(myInterval);
            }
        }, 1000);

        return () => {
            clearInterval(myInterval);
        };
    }, [hours, minutes, seconds]);

    return (
        <View style={{ flexDirection: 'row' }}>
            {hours > 0 ? (
                <Text
                    style={styles.timerText}
                >
                    {hours > 9 ? (
                        <Text>
                            {hours}:
                        </Text>
                    ) : (
                        <Text>
                            0{hours}:
                        </Text>
                    )}
                </Text>
            ) :
                // null
                <Text
                    style={styles.timerText}
                >0{hours}:</Text>
            }
            {minutes > 9 ? (
                <Text
                    style={styles.timerText}
                >
                    {minutes}:{seconds > 9 ? (
                        <Text>
                            {seconds}
                        </Text>
                    ) : (
                        <Text>
                            0{seconds}
                        </Text>
                    )}
                </Text>
            ) : (
                <Text
                    style={styles.timerText}
                >
                    0{minutes}:{seconds > 9 ? (
                        <Text>
                            {seconds}
                        </Text>
                    ) : (
                        <Text>
                            0{seconds}
                        </Text>
                    )}
                </Text>
            )}
        </View>
    );
}
