import { StyleSheet, Text, View } from "react-native";
import { Strings } from "../i18n";
import React from 'react';

export const SplashScreen = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#AC0AF8',
            }}
        >
            <Text style={styles.Text}>{Strings.Title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    Text: {
        color: '#fff',
        fontSize: 48,
        fontWeight: '700',
        textAlign: 'center',
        width: 257,
    },
});
