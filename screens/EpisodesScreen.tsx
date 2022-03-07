import * as React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { BooksListItem } from '../components/BooksListItem';
import { HomeProps, SectionProps } from '../navigation';
import { Colors } from '../constants/colors';
import { useContext } from 'react';
import { DarkModeContext } from '../contexts/DarkModeContext';
import { useGetSectionEpisodes } from '../hooks/useGetSectionEpisodes';


const EpisodesScreen = ({ navigation, route }: SectionProps) => {
    const { mode } = useContext(DarkModeContext);
    const { sectionId } = route.params;

    const isLight = mode === 'light';
    const { episodes, isLoading, error } = useGetSectionEpisodes(sectionId, navigation);
    console.log({ episodes, sectionId });
    if (isLoading) {
        return <View />;
    }

    return (
        <View style={{ flex: 1, backgroundColor: !isLight ? Colors.black : Colors.lightBrown }}>
            <FlatList
                contentContainerStyle={styles.container}
                data={episodes}
                renderItem={({ item }) => <BooksListItem
                    onPress={() => navigation.navigate({
                        name: 'Details', params: {
                            sectionId,
                            articleId: item.id,
                            title: item.title,
                            content: item.content
                        }
                    })}
                    item={item}
                    key={item.id} />} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        flex: 1
    }
});

export default EpisodesScreen;