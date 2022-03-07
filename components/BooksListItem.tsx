import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    TouchableNativeFeedback,
} from 'react-native';
import { Colors } from '../constants/colors';
import { useContext } from 'react';
import { DarkModeContext } from '../contexts/DarkModeContext';
import Svg, { Path } from 'react-native-svg';
import React from 'react';

export const BooksListItem = ({ item, onPress }: any) => {
    const { mode } = useContext(DarkModeContext);
    const isLight = mode === 'light';
    let CTouchable: typeof TouchableOpacity | typeof TouchableNativeFeedback =
        TouchableOpacity;
    if (Platform.OS === 'android') {
        CTouchable = TouchableNativeFeedback;
    }

    return (
        <View
            style={[
                Platform.OS === 'android' && {
                    ...styles.Touchable,
                    overflow: 'hidden',
                },
            ]}>
            {/*/ @ts-ignore */}
            <CTouchable
                style={[Platform.OS === 'ios' && styles.Touchable]}
                onPress={onPress}>
                <View
                    style={[
                        styles.Container,
                        isLight
                            ? { backgroundColor: '#fff' }
                            : { backgroundColor: Colors.gray },
                    ]}>
                    <Text
                        style={[styles.Title, isLight ? { color: '#000' } : { color: '#fff' }]}>
                        {item.title}
                    </Text>
                    <View
                        style={[
                            styles.Icon,
                            item.isRead ? { borderColor: Colors.green } : {},
                        ]}>
                        {item.isRead ? <CheckMark /> : null}
                    </View>
                </View>
            </CTouchable>
        </View>
    );
};

export const CheckMark = (props: any) => (
    <Svg
        width={24}
        height={24}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}>
        <Path
            d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12Zm-1.17-7.396c.341 0 .68-.13.94-.39l6.605-6.605c.52-.52.518-1.362-.003-1.883a1.328 1.328 0 0 0-1.883-.002l-5.66 5.659-1.884-1.885a1.335 1.335 0 0 0-1.887 0 1.33 1.33 0 0 0 0 1.885l2.83 2.829c.26.261.601.391.942.391Z"
            fill="#00CA99"
        />
    </Svg>
);

const styles = StyleSheet.create({
    Touchable: {
        height: 88,
        borderRadius: 12,
        marginVertical: 10,
        shadowColor: '#000',
        marginHorizontal: 20,
        elevation: 20,
        shadowOpacity: 0.07,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 0 },
    },
    Icon: {
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 24 / 2,
        justifyContent: 'center',
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderStyle: 'solid',
        width: 24,
        height: 24,
    },
    Container: {
        direction: 'rtl',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 12,
        paddingHorizontal: 24,
    },
    Title: {
        fontSize: 18,
        fontWeight: '500',
        fontFamily: 'NotoSansArabic-Regular',
    },
});
