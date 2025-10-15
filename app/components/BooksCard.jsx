import COLORS from "@/configs/colors";
import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const apiUrl = "http://10.196.153.165:3000";

const BooksCard = ({ item }) => {

    return (
        <TouchableOpacity style={styles.item}
            activeOpacity={0.8}
            onPress={() => router.push({
                pathname: '/Chapters',
                params: { ...item }
            })}
        >
            <View style={styles.card}>
                {/* Left: Image + Title */}
                <View style={styles.leftContainer}>
                    <Image
                        source={{ uri: `${apiUrl}/${item.image}` }}
                        style={styles.image}
                        contentFit="cover"
                    />
                    <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
                        {item.name}
                    </Text>
                </View>

                {/* Right: Description */}
                <View style={styles.rightContainer}>
                    <Text style={styles.description} numberOfLines={9} ellipsizeMode="tail">
                        {item.summary}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default BooksCard;
const styles = StyleSheet.create({
    item: {
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    card: {
        flexDirection: "row",
        borderWidth: 0.5,
        borderColor: COLORS.border,
        borderRadius: 7,
        padding: 10,
        alignItems: "flex-start",
        backgroundColor: COLORS.backgroundLight,
        height: 200,
        elevation: 3,
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10.5,
    },
    leftContainer: {
        width: 100,
        alignItems: "center",
        marginRight: 10,
    },
    rightContainer: {
        flex: 1,
        flexShrink: 1,
    },
    image: {
        width: 100,
        height: 150,
        borderRadius: 7,
        marginBottom: 5,
    },
    title: {
        fontSize: 14,
        color: COLORS.textPrimary,
        textAlign: "center",
    },
    description: {
        fontSize: 14,
        color: COLORS.textSecondary,
        textAlign: "justify",
        flexWrap: "wrap",
    },
});
