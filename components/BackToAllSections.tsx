import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    TouchableOpacity,
    View,
} from 'react-native';
import { Strings } from '../i18n';
import { DarkModeContext } from '../contexts/DarkModeContext';

interface Props {
    onPress: () => void;
}

const BackToAllSections = ({ onPress }: Props) => {
    const CTouchable =
        Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    const { mode } = React.useContext(DarkModeContext);
    const isDarkMode = mode === 'dark';
    // @ts-ignore
    return (
        <CTouchable onPress={onPress} style={{ alignItems: 'center' }}>
            <View style={[styles.Container]}>
                <BackArrow isDarkMode={isDarkMode} />
                <Text style={[styles.Text, isDarkMode && styles.TextDarkMode]}>
                    {Strings.backToAllSections}
                </Text>
            </View>
        </CTouchable>
    );
};

const BackArrow = (props: any) => (
    <View>
        <Svg
            width={16}
            height={11}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <Path
                d="M8.9825 1.2694C8.68935 0.982052 8.68935 0.507212 8.9825 0.219861C9.26985 -0.0732871 9.74469 -0.0732871 10.032 0.219861L13.7845 3.96646C14.0718 4.25961 14.0718 4.72865 13.7845 5.02182L10.032 8.76842C9.74469 9.06157 9.26985 9.06157 8.9825 8.76842C8.68935 8.48107 8.68935 8.00623 8.9825 7.71888L11.4568 5.23865H0.744637C0.334183 5.23865 0 4.90446 0 4.49401C0 4.08355 0.334183 3.74937 0.744637 3.74937H11.4568L8.9825 1.26914V1.2694Z"
                fill={props.isDarkMode ? '#fff' : '#000'}
            />
        </Svg>
    </View>
);

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        paddingVertical: 60,
    },
    Text: {
        fontSize: 18,
        marginHorizontal: 11,
        fontFamily: 'NotoSansArabic-Regular',
    },
    TextDarkMode: {
        color: 'white',
    },
});
export default BackToAllSections;
