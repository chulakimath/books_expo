import { StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../../configs/Context";

const SettingsCard = ({ children, title }) => {
  const { theme } = useContext(ThemeContext);
  const styles = getTheme(theme);

  return (
    <View style={[styles.card]}>
      <Text style={[styles.title]}>{title}</Text>
      <View style={[styles.borderCard]}>{children}</View>
    </View>
  );
};

export default SettingsCard;

const getTheme = (COLORS) =>
  StyleSheet.create({
    container: {
      backgroundColor: COLORS.backgroundColor,
      padding: 10,
    },
    card: {
      backgroundColor: COLORS.backgroundLight,
      padding: 10,
      borderRadius: 5,
      elevation: 2,
    },
    borderCard: {
      borderWidth: 1,
      borderRadius: 8,
      borderColor: COLORS.border,
      paddingHorizontal: 10,
      paddingVertical: 18,
    },
    themesContainer: {
      flexDirection: "row",
    },
    themeButtonView: {
      margin: 10,
    },
    title: {
      fontSize: 14,
      color: COLORS.textPrimary,
      marginVertical: 5,
      fontWeight: "600",
    },
  });
