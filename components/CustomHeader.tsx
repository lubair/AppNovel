import { getHeaderTitle } from '@react-navigation/elements';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useContext, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Colors } from '../constants/colors';
import { DarkModeContext } from '../contexts/DarkModeContext';
import { BackButton } from './BackButton';
import { ModeButton } from './ModeButton';
import { SearchButton } from './SearchButton';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const CustomHeader = ({
    navigation,
    route,
    options,
    back,
}: NativeStackHeaderProps) => {
    const [isSearchEnabled, setSearchEnabled] = useState<boolean>(false);
    const title = getHeaderTitle(options, route.name);
    const { mode, accentColor } = useContext(DarkModeContext);
    const isLight = mode === 'light';
    const [search, setSearch] = useState('');

    const updateSearch = (newValue: string) => {
        setSearch(newValue);
    };

    const handleSearch = () => {
        setSearchEnabled(false);
        // @ts-ignore
        route.params?.onSearchSection(search);
    };

    const handleToggleSearch = () => {
        setSearchEnabled(prevState => !prevState);
    };

    return (
        <View
            style={[
                styles.headerStyle,
                { backgroundColor: isLight ? accentColor : Colors.gray },
                { paddingStart: isSearchEnabled ? 10 : 24 },
            ]}>
            {back ? <BackButton onPress={navigation.goBack} /> : null}
            {!back && !isSearchEnabled ? (
                <SearchButton onPress={handleToggleSearch} />
            ) : null}
            {!isSearchEnabled && <Text style={styles.headerTitleStyle}>{title}</Text>}
            {isSearchEnabled && (
                <View style={{ flex: 1 }}>
                    <Searchbar
                        autoFocus
                        onSubmitEditing={handleSearch}
                        iconColor={Colors.white}
                        icon={() => <SearchIcon />}
                        style={{ backgroundColor: 'transparent', elevation: 0 }}
                        placeholderTextColor="#ffffffba"
                        inputStyle={styles.input}
                        placeholder="البحث عن ..."
                        onChangeText={updateSearch}
                        focusable
                        value={search}
                    />
                </View>
            )}
            <ModeButton />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        color: Colors.white,
        fontFamily: 'NotoSansArabic-Regular',
    },
    headerStyle: {
        paddingHorizontal: 24,
        flexDirection: 'row',
        paddingTop: 44,
        height: 100,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    headerTitleStyle: {
        fontFamily: 'NotoSansArabic-Regular',
        flex: 1,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.white,
    },
});

export const SearchIcon = props => (
    <Svg
        width={20}
        height={20}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}>
        <Path
            d="M12.5 4.242c.217.22.422.45.61.696l-.198-.256c.37.484.678 1.012.915 1.573l-.127-.303c.241.577.406 1.182.49 1.801l-.044-.338a7.236 7.236 0 0 1 0 1.911l.045-.338a7.205 7.205 0 0 1-.49 1.801c.041-.101.084-.203.126-.302a7.127 7.127 0 0 1-.915 1.573l.198-.256a7.343 7.343 0 0 1-1.306 1.306l.256-.198a7.223 7.223 0 0 1-1.573.915c.102-.042.203-.084.303-.127a7.197 7.197 0 0 1-1.801.49l.338-.044a7.225 7.225 0 0 1-1.911 0l.338.045a7.19 7.19 0 0 1-1.8-.49l.302.126a7.126 7.126 0 0 1-1.573-.915l.256.198a7.345 7.345 0 0 1-1.307-1.306l.2.256a7.226 7.226 0 0 1-.916-1.573c.042.101.084.203.127.302a7.201 7.201 0 0 1-.49-1.8l.044.337a7.231 7.231 0 0 1 0-1.91l-.045.337a7.2 7.2 0 0 1 .49-1.8l-.126.302c.237-.563.545-1.091.915-1.573l-.199.256A7.348 7.348 0 0 1 4.94 3.63l-.256.199a7.223 7.223 0 0 1 1.573-.916l-.303.127a7.197 7.197 0 0 1 1.801-.49l-.338.044a7.228 7.228 0 0 1 1.91 0l-.337-.044c.619.084 1.223.25 1.8.49l-.302-.127c.563.237 1.091.546 1.573.916l-.256-.199c.245.188.476.393.695.611.23.23.571.372.897.372.31 0 .682-.137.896-.372.222-.241.387-.558.372-.896-.015-.336-.129-.656-.372-.897a8.275 8.275 0 0 0-2.07-1.513 8.147 8.147 0 0 0-2.341-.8C9.06.002 8.243-.05 7.418.059 6.958.12 6.503.19 6.055.32a9.053 9.053 0 0 0-1.306.504 8.227 8.227 0 0 0-2.095 1.429A8.272 8.272 0 0 0 1.062 4.28a8.224 8.224 0 0 0-.87 2.309c-.168.81-.24 1.65-.16 2.475.045.459.113.92.225 1.37.101.406.243.795.406 1.18.165.389.344.767.566 1.129.248.401.537.78.844 1.14.249.29.522.561.813.809a9.03 9.03 0 0 0 1.154.845c.404.248.831.44 1.269.62.334.137.678.251 1.03.338a8.315 8.315 0 0 0 2.47.237c.818-.05 1.642-.199 2.412-.489a9.206 9.206 0 0 0 1.28-.585 9.118 9.118 0 0 0 1.172-.812c.676-.535 1.249-1.197 1.725-1.913a8.186 8.186 0 0 0 1.033-2.273c.127-.448.199-.902.258-1.363.046-.36.068-.723.06-1.087a8.372 8.372 0 0 0-.41-2.437 8.158 8.158 0 0 0-1.14-2.252 9.504 9.504 0 0 0-.9-1.074 1.306 1.306 0 0 0-.897-.372c-.31 0-.683.138-.896.372-.222.241-.387.558-.372.897.008.338.123.655.365.898Z"
            fill="#fff"
        />
        <Path
            d="m12.5 14.292 4.68 4.68c.215.216.428.436.646.647l.009.009c.23.23.57.372.896.372.31 0 .682-.137.896-.372.222-.241.387-.558.372-.896a1.32 1.32 0 0 0-.372-.897l-4.68-4.68c-.215-.216-.429-.436-.647-.647l-.008-.009c-.23-.23-.57-.372-.896-.372-.311 0-.683.138-.897.372-.221.241-.386.558-.372.897.015.336.13.655.372.896Z"
            fill="#fff"
        />
    </Svg>
);
