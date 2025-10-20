import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import * as Haptics from "expo-haptics";
import { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "../../configs/Context";
import AudioPlayer from "./AudioPlayer";
import * as Speech from "expo-speech";

const ChaptersCard = ({ item }) => {
  const { theme } = useContext(ThemeContext);
  const styles = getTheme(theme);

  const {
    audio_url,
    chapter_number,
    verse_number,
    title,
    text,
    transliteration,
    word_meanings,
    translations,
  } = item;
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    setExpanded(!expanded);
  };

  const textToSpeech = async (text, language) => {
    // const cleanText=text.replace(/[,.()]g/,"");
    const cleanText = text.replace(/[0-9|[\];()+\-_]/g, "");
    const isSpeaking = await Speech.isSpeakingAsync();
    if (isSpeaking) {
      Speech.stop();
      return false;
    }
    const pitch = 1.0;
    let rate = 0.8;
    let speaklanguage;
    if (language === "english") {
      speaklanguage = "en-IN";
    } else {
      speaklanguage = "hi-IN";
      rate = 0.8;
    }

    const options = {
      speaklanguage,
      pitch,
      rate,
      onDone: () => console.log("Speech finished"),
      onError: (err) => console.error("Speech error:", err),
    };

    Speech.speak(cleanText, options);
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
            {expanded ? (
              <FontAwesome6 name="angle-up" size={22} color={theme.primary} />
            ) : (
              <FontAwesome6 name="angle-down" size={22} color={theme.primary} />
            )}
          </View>
        </View>
        {expanded && (
          <TouchableOpacity activeOpacity={1} style={styles.expandedSection}>
            <AudioPlayer uri={audio_url} />
            <Text
              style={[
                styles.detailTextHeading,
                { textAlign: "center", fontSize: 18, marginBottom: 15 },
              ]}
            >
              Transliteration
            </Text>
            <Text style={[styles.detailText, { paddingHorizontal: 5 }]}>
              {transliteration}
            </Text>

            <Text
              style={[
                styles.detailTextHeading,
                { textAlign: "center", fontSize: 18, marginBottom: 15 },
              ]}
            >
              Verse Translation
            </Text>
            <View style={[{ paddingHorizontal: 5 }]}>
              {translations.map((translation, index) => {
                return (
                  <View key={index} style={[{ marginVertical: 5 }]}>
                    <Text
                      style={[styles.detailTextHeading, { fontWeight: "600" }]}
                    >
                      {translation.lang.toUpperCase()} :
                    </Text>
                    <Text style={[styles.detailText, { paddingHorizontal: 5 }]}>
                      {translation.description
                        .replace(/[0-9|।[\];+\-_]/g, "")
                        .trim()}
                    </Text>
                    <TouchableOpacity
                      style={[
                        {
                          backgroundColor: theme.background,
                          padding: 15,
                          borderRadius: 8,
                          elevation: 2,
                          shadowColor: theme.primary,
                          shadowOpacity: 0.25,
                          shadowOffset: { width: 0, height: 2 },
                          shadowRadius: 5,
                        },
                      ]}
                      onPress={() =>
                        textToSpeech(
                          translation.description.trim(),
                          translation.lang,
                        )
                      }
                    >
                      <View
                        style={[
                          {
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            gap: 10,
                            paddingHorizontal: 10,
                          },
                        ]}
                      >
                        <MaterialIcons
                          name="record-voice-over"
                          size={22}
                          color={theme.primary}
                        />
                        <Text
                          style={[
                            {
                              color: theme.textPrimary,
                              fontWeight: "600",
                            },
                          ]}
                        >
                          Read Aloud
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ChaptersCard;

const getTheme = (COLORS) =>
  StyleSheet.create({
    card: {
      backgroundColor: COLORS.background,
      borderRadius: 10,
      padding: 12,
      margin: 10,
      elevation: 3,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
    },
    image: {
      width: "100%",
      height: 400,
      borderRadius: 10,
      marginBottom: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: COLORS.textSecondary,
      maxWidth: "100%",
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
      elevation: 1,
    },
    detailTextHeading: {
      fontSize: 14,
      color: COLORS.textPrimary,
      marginBottom: 6,
      fontWeight: "bold",
    },
    detailText: {
      fontSize: 14,
      color: COLORS.textPrimary,
      marginBottom: 6,
    },
    summaryTitle: {
      fontSize: 15,
      fontWeight: "bold",
      marginTop: 10,
      marginBottom: 4,
      color: COLORS.textSecondary,
    },
    expansion: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
    },
    readButton: {
      backgroundColor: COLORS.primary,
      padding: 10,
      borderRadius: 5,
      width: "100%",
      marginTop: 10,
    },
    readButtonText: {
      color: COLORS.backgroundLight,
      fontWeight: "bold",
    },
    text: {
      fontSize: 17,
      textAlign: "justify",
      color: COLORS.textPrimary,
      marginTop: 10,
      fontWeight: "600",
    },
    titleText: {
      backgroundColor: COLORS.backgroundLight,
      padding: 5,
      borderRadius: 10,
      marginTop: 10,
      marginBottom: 10,
      elevation: 1,
    },
  });
