import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useContext, useRef, useEffect } from "react";
import { ThemeContext } from "../configs/Context";
import SettingsCard from "./components/SettingsCards";
import { ThemesKeys, Themes } from "../configs/colors";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
const Settings = () => {
  const { theme, toggleTheme, currentTheme } = useContext(ThemeContext);

  const styles = getTheme(theme);
  const handleThemeIconClick = (choosenTheme) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    toggleTheme(choosenTheme);
  };

  const animateRef = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    animateRef.setValue(0);
    Animated.timing(animateRef, {
      // toValue: 1,
      // duration: 1000,
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, [currentTheme]);
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
                      themeName === currentTheme
                        ? theme.success
                        : "transparent",
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
                  <Animated.View
                    style={[
                      { transform: [{ scale: animateRef }] },
                      { position: "absolute", top: 0, left: 2 },
                    ]}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color={theme.error}
                      style={{}}
                    />
                  </Animated.View>
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
