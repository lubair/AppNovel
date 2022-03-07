import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { DarkModeContext } from '../contexts/DarkModeContext';
import Svg, { Path } from 'react-native-svg';
import React from 'react';

export const ModeButton = () => {
    const { mode, setMode } = useContext(DarkModeContext);
    const isLight = mode === 'light';
    return (
        <TouchableOpacity
            onPress={() => setMode(mode === 'light' ? 'dark' : 'light')}>
            <View style={styles.container}>
                {isLight ? <SunIcon /> : <SunIcon />}
            </View>
        </TouchableOpacity>
    );
};

const SunIcon = (props: any) => (
    <Svg
        width={20}
        height={20}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}>
        <Path
            d="M19.333 9.333h-2.03a7.331 7.331 0 0 0-1.667-4.023l1.437-1.437a.667.667 0 0 0-.943-.943l-1.44 1.437A7.334 7.334 0 0 0 10.667 2.7V.667a.667.667 0 1 0-1.334 0v2.03A7.332 7.332 0 0 0 5.31 4.363L3.873 2.927a.667.667 0 0 0-.943.943l1.437 1.437A7.334 7.334 0 0 0 2.7 9.33H.667a.666.666 0 1 0 0 1.333h2.03a7.333 7.333 0 0 0 1.666 4.024l-1.436 1.436a.667.667 0 0 0 .943.944l1.437-1.437a7.334 7.334 0 0 0 4.023 1.667v2.036a.666.666 0 1 0 1.333 0v-2.03a7.333 7.333 0 0 0 4.024-1.666l1.436 1.436a.668.668 0 0 0 .944-.943l-1.434-1.44a7.334 7.334 0 0 0 1.667-4.023h2.033a.666.666 0 1 0 0-1.334ZM10 6a4 4 0 0 0-4 4 .667.667 0 1 1-1.334 0A5.334 5.334 0 0 1 10 4.667.667.667 0 1 1 10 6Z"
            fill="#fff"
        />
    </Svg>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: 50,
        height: 50,
    },
});
