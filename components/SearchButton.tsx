import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SearchIcon } from './CustomHeader';

export const SearchButton = ({ onPress }: any) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <SearchIcon />
            </View>
        </TouchableOpacity>
    );
};
