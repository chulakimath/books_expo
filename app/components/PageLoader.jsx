import COLORS from '@/configs/colors';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
export default function PageLoader({ loading }) {
    return (
        <>
            {loading ? (<View style={styles.container}>
                <ActivityIndicator animating={loading} size={30} color={COLORS.primary} />
                <Text style={styles.loderText}>Loding...</Text>
            </View>) : null}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.backgroundLight,
        zIndex: 1000,
    },
    loderText: {
        fontSize: 18,
        color: COLORS.textSecondary,
        textAlign: "center"
    }
})