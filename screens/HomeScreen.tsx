import * as React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { BooksListItem } from '../components/BooksListItem';
import { HomeProps } from '../navigation';
import { Colors, SECTIONS_READ_LIST_KEY } from '../constants/colors';
import { useContext } from 'react';
import { DarkModeContext } from '../contexts/DarkModeContext';
import { BookContext } from '../contexts/BookContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackToAllSections from '../components/BackToAllSections';


const HomeScreen = ({ navigation }: HomeProps) => {
    const [search, setSearch] = React.useState('');
    const { mode } = useContext(DarkModeContext);
    const { sections } = useContext(BookContext);
    const [updatedSections, setUpdatedSections] = React.useState(sections);
    const isLight = mode === 'light';

    const handleSearch = (newSearchValue: string) => {
        setSearch(newSearchValue);
    }

    const handleResetSearch = () => {
        setSearch('');
    }

    React.useEffect(() => {
        navigation.setParams({
            onSearchSection: handleSearch
        });

        const unsubscribe = navigation.addListener('focus', async () => {
            const readList = await AsyncStorage.getItem(SECTIONS_READ_LIST_KEY);

            setUpdatedSections(sections.map(section => ({
                ...section,
                isRead: readList ? readList.includes(section.id) : false
            })));
        });

        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: !isLight ? Colors.black : Colors.lightBrown }}>
            <FlatList
                contentContainerStyle={styles.container}
                data={updatedSections.filter(section => section.title.toLowerCase().includes(search.toLowerCase()))}
                renderItem={({ item }) => <BooksListItem
                    onPress={() => navigation.navigate({
                        name: 'Episodes', params: {
                            sectionId: item.id,
                            title: item.title
                        }
                    })}
                    item={item}
                    key={item.id} />} />
            {search ? <BackToAllSections onPress={handleResetSearch} /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        flex: 1
    }
});

export default HomeScreen;