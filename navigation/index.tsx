import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
    createNativeStackNavigator,
    NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { I18nManager } from 'react-native';
import DetailsScreen from '../screens/DetailsScreen';
import HomeScreen from '../screens/HomeScreen';
import { Strings } from '../i18n';
import { Colors, READ_LIST_KEY } from '../constants/colors';
import { BackButton } from '../components/BackButton';
import { ModeButton } from '../components/ModeButton';
import { AppearanceMode, DarkModeContext } from '../contexts/DarkModeContext';
import { useState, useEffect } from 'react';
import { CustomHeader } from '../components/CustomHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BookContext, BookSection } from '../contexts/BookContext';
import { SplashScreen } from '../screens/SplashScreen';
import EpisodesScreen from '../screens/EpisodesScreen';
import { BOOK_ID } from '../constants/firebase';
import firestore from '@react-native-firebase/firestore';

const sortSections = (a: any, b: any) => a.order - b.order;

const Stack = createNativeStackNavigator();

type RootStackParamList = {
    Home: { onSearchSection: (search: string) => void };
    Details: {
        sectionId: string;
        articleId: string;
        title: string;
        content?: string;
    };
    Episodes: { sectionId: string; title: string };
};

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export type DetailsProps = NativeStackScreenProps<
    RootStackParamList,
    'Details'
>;

export type SectionProps = NativeStackScreenProps<
    RootStackParamList,
    'Episodes'
>;

try {
    I18nManager.forceRTL(true);
} catch (error) { }

export const AppNavigator = () => {
    const [accentColor, setAccentColor] = useState<string>('#AC0AF8');
    const [sections, setSections] = useState<BookSection[]>([]);
    const [mode, setMode] = useState<AppearanceMode>('light');

    useEffect(() => {
        (async () => {
            const documentSnapshot = await firestore()
                .collection('books')
                .doc(BOOK_ID)
                .get();

            const querySnapshot = await firestore()
                .collection('books')
                .doc(BOOK_ID)
                .collection('sections')
                .get();

            const readList = await AsyncStorage.getItem(READ_LIST_KEY);
            const loadedSections: BookSection[] = [];
            querySnapshot.forEach(docRef => {
                loadedSections.push({
                    ...docRef.data(),
                    id: docRef.id,
                    isRead: readList ? readList.includes(docRef.id) : false,
                } as BookSection);
            });
            setSections(loadedSections.sort(sortSections));

            const data = documentSnapshot.data();
            if (data) {
                setAccentColor(data.color);
            }
        })();
    }, []);

    if (sections.length === 0) {
        return <SplashScreen />;
    }

    const handleSetAccentColor = (color: string) => {
        setAccentColor(color);
    };
    const handleToggleMode = (newMode: AppearanceMode) => {
        setMode(newMode);
    };

    const isLight = mode === 'light';
    return (
        <BookContext.Provider value={{ sections }}>
            <DarkModeContext.Provider
                value={{
                    setMode: handleToggleMode,
                    mode,
                    accentColor,
                    setAccentColor: handleSetAccentColor,
                }}>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            header: props => <CustomHeader {...props} />,
                            contentStyle: {
                                backgroundColor: !isLight ? Colors.black : Colors.white,
                            },
                            headerShown: true,
                            headerRight: () => <ModeButton />,
                        }}>
                        <Stack.Screen
                            name="Home"
                            options={{
                                title: Strings.Title,
                            }}
                            component={HomeScreen}
                        />
                        <Stack.Screen
                            name="Details"
                            options={({ navigation, route }) => ({
                                // @ts-ignore
                                title: String(route.params?.title),
                                headerLeft: () => <BackButton navigation={navigation} />,
                            })}
                            component={DetailsScreen}
                        />
                        <Stack.Screen
                            name="Episodes"
                            options={({ navigation, route }) => ({
                                // @ts-ignore
                                title: String(route.params?.title),
                                headerLeft: () => <BackButton navigation={navigation} />,
                            })}
                            component={EpisodesScreen}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </DarkModeContext.Provider>
        </BookContext.Provider>
    );
};
