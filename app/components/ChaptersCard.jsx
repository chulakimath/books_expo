import COLORS from '@/configs/colors';
import { FontAwesome6 } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from "expo-router";
import { useState } from 'react';
import { LayoutAnimation, Platform, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native';


// Enable LayoutAnimation on Android
if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const ChaptersCard = (item) => {
    const {
        name,
        chapter_number,
        chapter_summary,
        image_name,
        name_translation,
        name_meaning,
        name_transliterated,
        verses_count,
        chapter_summary_hindi
    } = item.item;
    const info=item.item;

    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setExpanded(!expanded);
    };

    return (
        <TouchableOpacity onPress={toggleExpand} activeOpacity={0.9}>
            <View style={styles.card}>
                <Image
                    source={{ uri: image_name }}
                    style={styles.image}
                    contentFit="cover"
                />
                <Text style={styles.subtitle}>Chapter {chapter_number}</Text>
                <View style={[styles.expansion]}>
                    <View>
                        <Text style={styles.title}>{name_translation}</Text>
                        <Text style={styles.subtitle}>{name}</Text>
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
                        <Text style={[styles.detailTextHeading]}>Verses : </Text>
                        <Text style={[styles.detailText, { paddingHorizontal: 5 }]}>{verses_count}</Text>
                        <Text style={styles.detailTextHeading}>Transliterate : </Text>
                        <Text style={[styles.detailText, { paddingHorizontal: 5 }]}>{name_transliterated}</Text>
                        <Text style={[styles.detailTextHeading, {}]}>Meaning : </Text>
                        <Text style={[styles.detailText, { paddingHorizontal: 5 }]}>{name_meaning}</Text>
                        <Text style={[styles.summaryTitle]}>Summary (English)</Text>
                        <Text style={[styles.detailText, { paddingHorizontal: 5 }]}>{chapter_summary}</Text>

                        <Text style={[styles.summaryTitle]}>सारांश (Hindi)</Text>
                        <Text style={[styles.detailText, { paddingHorizontal: 5 }]}>{chapter_summary_hindi}</Text>
                        <TouchableOpacity
                            onPress={() => router.push({
                                pathname: '/Verses',
                                params: { ...info }
                            })}
                            activeOpacity={0.8}
                            style={[styles.readButton, { marginTop: 10 }]}>
                            <View style={[{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center", paddingHorizontal: 15 }]}>
                                <Text style={[styles.readButtonText]}>Read</Text>
                                <FontAwesome6 name="circle-chevron-right" size={22} color={COLORS.backgroundLight} />
                            </View>
                        </TouchableOpacity>
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
        maxWidth: '90%'
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
    }

});
