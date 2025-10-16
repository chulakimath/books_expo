import COLORS from '@/configs/colors';
import LottieView from 'lottie-react-native';
import { StyleSheet, Text, View } from 'react-native';
export default function PageLoader({ loading }) {
    return (
        <>
            {loading ? (<View style={styles.container}>
               
                    <LottieView
                        source={require('../../assets/animations/Document.json')}
                        autoPlay
                        loop
                        speed={1}
                        style={{ width: 100, height: 100 }}
                    />
                {/* <ActivityIndicator animating={loading} size={30} color={COLORS.primary} /> */}
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