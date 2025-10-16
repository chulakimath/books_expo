import COLORS from '@/configs/colors';
import { FontAwesome6 } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { LayoutAnimation, Platform, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native';
import AudioPlayer from './AudioPlayer';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const ChaptersCard = ({ item }) => {
    const { audio_url, chapter_number, verse_number, title, text, transliteration, word_meanings } = item;
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
        setExpanded(!expanded);
    };

    return (
        <TouchableOpacity onPress={toggleExpand} activeOpacity={0.98}>
            <View style={styles.card}>
                {/* <Text style={styles.title}>{title}</Text> */}
                <View style={[styles.titleText]}>
                    <Text style={styles.text}>{text}</Text>
                </View>
                <View style={[styles.expansion]}>
                    <View>

                        <Text style={styles.subtitle}>{title}</Text>
                    </View>
                    <View style={[{ paddingRight: 15 }]}>
                        {
                            expanded ? <FontAwesome6 name="angle-up" size={22} color={COLORS.primary} /> :
                                <FontAwesome6 name="angle-down" size={22} color={COLORS.primary} />
                        }
                    </View>
                </View>
                {expanded && (
                    <TouchableOpacity activeOpacity={1} style={styles.expandedSection}>
                        <Text style={[styles.detailTextHeading]}>Transliteration : </Text>
                        <Text style={[styles.detailText, { paddingHorizontal: 5 }]}>{transliteration}</Text>
                        <Text style={[styles.detailTextHeading]}>Meaning : </Text>
                        <Text style={[styles.detailText, { paddingHorizontal: 5 }]}>{word_meanings}</Text>
                        <AudioPlayer uri={audio_url} />

                    </TouchableOpacity>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default ChaptersCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.background,
        borderRadius: 10,
        padding: 12,
        margin: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
    },
    image: {
        width: '100%',
        height: 400,
        borderRadius: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textSecondary,
        maxWidth: '100%'
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.textSecondary,
        marginBottom: 8,
    },
    expandedSection: {
        marginTop: 10,
        backgroundColor: COLORS.backgroundLight,
        padding: 12,
        borderRadius: 10,
        elevation: 1
    },
    detailTextHeading: {
        fontSize: 14,
        color: COLORS.textPrimary,
        marginBottom: 6,
        fontWeight: 'bold'
    },
    detailText: {
        fontSize: 14,
        color: COLORS.textPrimary,
        marginBottom: 6,
    },
    summaryTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 4,
        color: COLORS.textSecondary,
    },
    expansion: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10
    },
    readButton: {
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 5,
        width: '100%',
        marginTop: 10
    },
    readButtonText: {
        color: COLORS.backgroundLight,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 17,
        textAlign: "justify",
        color: COLORS.textPrimary,
        marginTop: 10,
        fontWeight: '600'
    },
    titleText: {
        backgroundColor: COLORS.backgroundLight,
        padding: 5,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        elevation: 1
    }

});
