import firestore from '@react-native-firebase/firestore';
import { useState, useEffect } from 'react';
import { BOOK_ID } from '../constants/firebase';
import { Episode } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { READ_LIST_KEY } from '../constants/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const useGetSectionEpisodes = (
    sectionId: string,
    navigation: NativeStackNavigationProp<any>,
) => {
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | unknown>(null);

    const getEpisodesAsync = async () => {
        try {
            const querySnapshot = await firestore()
                .collection('books')
                .doc(BOOK_ID)
                .collection('sections')
                .doc(sectionId)
                .collection('episodes')
                .get();

            const loadedEpisodes: Episode[] = [];
            let readList: string[] = [];
            try {
                const list = await AsyncStorage.getItem(READ_LIST_KEY);
                if (list) {
                    readList = JSON.parse(list);
                }
            } catch (redListError) {
                console.log(redListError);
            }

            querySnapshot.forEach(docRef => {
                loadedEpisodes.push({
                    ...docRef.data(),
                    id: docRef.id,
                    isRead: readList.includes(docRef.id),
                } as Episode);
            });
            setEpisodes(loadedEpisodes);
            setIsLoading(false);
        } catch (firebaseError) {
            setError(firebaseError);
        }
    };

    useEffect(() => {
        getEpisodesAsync();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            await getEpisodesAsync();
            const list = await AsyncStorage.getItem(READ_LIST_KEY);
            const readList = list ? JSON.parse(list) : [];
            setEpisodes(prevState =>
                prevState.map(episode => ({
                    ...episode,
                    isRead: readList ? readList.includes(episode.id) : false,
                })),
            );
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return {
        episodes,
        isLoading,
        error,
    };
};
