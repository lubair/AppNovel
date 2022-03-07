import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import React from 'react';

export const BackButton = ({ onPress }: any) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <BackIcon />
            </View>
        </TouchableOpacity>
    );
};

const BackIcon = (props: any) => (
    <Svg
        width={11}
        height={20}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}>
        <Path
            d="M.367 2.213C-.785 1.026 1.04-.854 2.191.433l8.449 8.605c.48.494.48 1.384 0 1.879L2.19 19.622c-1.152 1.187-2.976-.693-1.824-1.88l7.489-7.715L.367 2.213Z"
            fill="#fff"
        />
    </Svg>
);

export const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 50,
        height: 50,
    },
});
