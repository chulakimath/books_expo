import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../configs/Context";
import SettingsCard from "./components/SettingsCards";
import { ThemesKeys, Themes } from "../configs/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
const Settings = () => {
  const { theme, toggleTheme, currentTheme } = useContext(ThemeContext);

  const styles = getTheme(theme);
  const handleThemeIconClick = (choosenTheme) => {
    toggleTheme(choosenTheme);
  };

  return (
    <ScrollView style={[styles.container]} showsVerticalScrollIndicator={false}>
      <SettingsCard title={"Choose Theme"}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={[styles.themesContainer]}
        >
          {ThemesKeys.map((themeName, index) => {
            return (
              <TouchableOpacity
                onPress={() => handleThemeIconClick(themeName)}
                key={themeName + index}
                style={[
                  {
                    backgroundColor: Themes[themeName].background,
                  },
                  styles.gridItem,
                  {
                    borderColor:
                      themeName === currentTheme ? theme.success : "red",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.themeTitle,
                    { color: Themes[themeName].textPrimary },
                  ]}
                >
                  {themeName}
                </Text>
                {themeName === currentTheme && (
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={theme.error}
                    style={{ position: "absolute", top: 0, right: 0 }}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </SettingsCard>
    </ScrollView>
  );
};

export default Settings;

const getTheme = (COLORS) =>
  StyleSheet.create({
    container: {
      backgroundColor: COLORS.background,
      padding: 10,
    },
    card: {
      backgroundColor: COLORS.backgroundLight,
      padding: 10,
      borderRadius: 5,
    },
    borderCard: {
      borderWidth: 1,
      borderRadius: 8,
      borderColor: COLORS.border,
      padding: 10,
    },
    themesContainer: {
      flexDirection: "row",
    },
    // themeButtonView: {
    //   margin: 10,
    // },
    title: {
      fontSize: 14,
      color: COLORS.textPrimary,
      marginVertical: 5,
      fontWeight: "600",
    },
    gridWrapper: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    gridItem: {
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      marginHorizontal: 4,
      borderRadius: 8,
      minWidth: 100,
      minHeight: 60,
      position: "relative",
      borderWidth: 0.6,
    },

    themeTitle: {
      fontSize: 14,
    },
  });
