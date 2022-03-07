import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {
    Colors,
    READ_LIST_KEY,
    SECTIONS_READ_LIST_KEY,
} from '../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';
import { DarkModeContext } from '../contexts/DarkModeContext';
import { useGetSectionEpisodes } from '../hooks/useGetSectionEpisodes';
import Svg, { Path } from 'react-native-svg';

const DetailsScreen = ({ route, navigation }: any) => {
    const { mode } = useContext(DarkModeContext);
    const isLight = mode === 'light';
    const { articleId, sectionId } = route.params;
    const { episodes, isLoading, error } = useGetSectionEpisodes(
        sectionId,
        navigation,
    );
    const episodeIndex = episodes.findIndex(episode => episode.id === articleId);
    const nextEpisodeIndex = episodeIndex + 1;
    const nextEpisode = episodes[nextEpisodeIndex];

    const handleGoToNextEpisode = async () => {
        const episodesReadList = await JSON.parse(
            (await AsyncStorage.getItem(READ_LIST_KEY)) || '[]',
        );
        const sectionsReadList = await JSON.parse(
            (await AsyncStorage.getItem(READ_LIST_KEY)) || '[]',
        );
        const updatedEpisodesRedList = [...episodesReadList, nextEpisode.id];
        await AsyncStorage.setItem(
            READ_LIST_KEY,
            JSON.stringify(updatedEpisodesRedList),
        );
        if (updatedEpisodesRedList.length >= episodes.length - 1) {
            const updatedSectionsReadList = [...sectionsReadList, sectionId];
            await AsyncStorage.setItem(
                SECTIONS_READ_LIST_KEY,
                JSON.stringify(updatedSectionsReadList),
            );
        }
        navigation.push('Details', {
            articleId: nextEpisode.id,
            title: nextEpisode.title,
            content: nextEpisode.content,
        });
    };

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                backgroundColor: isLight ? 'white' : Colors.black,
            }}>
            <ScrollView
                contentContainerStyle={styles.ScrollView}
                style={{ width: '100%' }}>
                <View style={{ direction: 'rtl', padding: 20 }}>
                    <Text
                        style={[styles.Content, { color: isLight ? Colors.black : 'white' }]}>
                        {route.params.content}
                    </Text>
                </View>
                {nextEpisode && (
                    <TouchableOpacity onPress={handleGoToNextEpisode}>
                        <View
                            style={[styles.Touchable, !isLight && { borderColor: 'white' }]}>
                            <Text
                                style={[
                                    styles.ButtonText,
                                    { color: isLight ? Colors.black : 'white' },
                                ]}>
                                التالي
                            </Text>
                            <View style={[styles.NextIcon]}>
                                <BackIcon isDarkMode={!isLight} />
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    ScrollView: {
        justifyContent: 'center',
        direction: 'rtl',
        paddingBottom: 60,
    },
    Content: {
        textAlign: 'left',
        fontFamily: 'NotoSansArabic-Regular',
    },
    Touchable: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: Colors.lightGray,
        borderRadius: 87 / 2,
        height: 87,
        flex: 1,
        paddingEnd: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginHorizontal: 40,
    },
    ButtonText: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '600',
        justifyContent: 'center',
        marginStart: 55,
        flex: 1,
        fontFamily: 'NotoSansArabic-Regular',
    },
    NextIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 55,
        height: 55,
        borderRadius: 55 / 2,
    },
});

export default DetailsScreen;

const BackIcon = (props: { isDarkMode: boolean }) => (
    <Svg
        width={21}
        height={16}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}>
        <Path
            d="M11.362 5.442H3.868l3.626-3.556a1.084 1.084 0 0 0 0-1.56 1.136 1.136 0 0 0-1.592 0l-5.57 5.44A1.09 1.09 0 0 0 0 6.548c0 .282.11.564.332.78L5.88 12.77a1.133 1.133 0 0 0 1.592 0 1.084 1.084 0 0 0 0-1.561L3.868 7.653h7.494c4.068 0 7.383 3.252 7.383 7.241 0 .607.509 1.106 1.128 1.106.619 0 1.127-.499 1.127-1.106 0-5.225-4.333-9.452-9.638-9.452Z"
            fill={props.isDarkMode ? '#fff' : '#000'}
        />
    </Svg>
);
