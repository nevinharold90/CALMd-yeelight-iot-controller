import { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Dashboard() {
  const [selectedEmotion, setSelectedEmotion] = useState<"Happy" | "Sad" | "Angry" | null>(null);
  const [calmQuote, setCalmQuote] = useState<string>("");

  const emotions: Array<"Happy" | "Sad" | "Angry"> = ["Happy", "Sad", "Angry"];

  // Quotes per emotion
  const emotionQuotes: { [key: string]: string[] } = {
    Happy: [
      `"Happiness is not something ready-made. It comes from your own actions." — Dalai Lama`,
      `"For every minute you are angry you lose sixty seconds of happiness." — Ralph Waldo Emerson`,
      `"Joy is not in things; it is in us." — Richard Wagner`,
    ],
    Sad: [
      `"Sadness flies away on the wings of time." — Jean de La Fontaine`,
      `"Tears come from the heart and not from the brain." — Leonardo da Vinci`,
      `"Every human walks around with a certain kind of sadness." — Brad Pitt`,
    ],
    Angry: [
      `"Speak when you are angry and you will make the best speech you will ever regret." — Ambrose Bierce`,
      `"For every minute you remain angry, you give up sixty seconds of peace of mind." — Ralph Waldo Emerson`,
      `"Anger is a short madness." — Horace`,
    ],
  };

  // Calm quotes when no emotion is selected
  const calmQuotes: string[] = [
    `"Peace begins with a smile." — Mother Teresa`,
    `"Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment." — Buddha`,
    `"Happiness is not something ready-made. It comes from your own actions." — Dalai Lama`,
    `"Every day may not be good, but there is something good in every day." — Alice Morse Earle`,
    `"Inhale the future, exhale the past." — Unknown`,
    `"The best way to capture moments is to pay attention. This is how we cultivate mindfulness." — Jon Kabat-Zinn`,
  ];

  // Toggle selection (unclick if same emotion)
  const toggleEmotion = (emotion: "Happy" | "Sad" | "Angry") => {
    if (selectedEmotion === emotion) {
      setSelectedEmotion(null);
      const randomIndex = Math.floor(Math.random() * calmQuotes.length);
      setCalmQuote(calmQuotes[randomIndex]);
    } else {
      setSelectedEmotion(emotion);
    }
  };

  // Generate long advice + tips
  const generateAdvice = (emotion: "Happy" | "Sad" | "Angry") => {
    let comment = "";
    let tips: string[] = [];

    if (emotion === "Happy") {
      comment = `Feeling happy is wonderful! Cherish the small wins, notice the little joys around you, and let your positivity influence others. Take a moment today to reflect on what brings you genuine satisfaction, whether it's a small act of kindness, a shared laugh, or something creative you enjoy. These moments compound to build a lasting sense of fulfillment.`;
      tips = [
        "Write down 3 things you are grateful for today.",
        "Do something kind for someone else.",
        "Take 15 minutes to engage in a hobby you love.",
        "Reflect on a recent accomplishment, however small.",
        "Share your joy by sending a positive message to a friend.",
      ];
    } else if (emotion === "Sad") {
      comment = `It's okay to feel sad. Emotions like this allow us to pause and reflect. Give yourself permission to rest, process your feelings, and find gentle ways to nurture yourself. Even small actions like listening to music, writing down your thoughts, or talking with a friend can bring comfort. Remember, acknowledging your sadness is the first step toward healing and self-awareness.`;
      tips = [
        "Write down your feelings in a journal.",
        "Take a walk to clear your mind.",
        "Listen to calming music or sounds of nature.",
        "Talk to someone you trust for support.",
        "Try 5 minutes of deep breathing to relax.",
      ];
    } else if (emotion === "Angry") {
      comment = `Anger is natural, and it's a sign that something matters to you. Channel this energy safely by moving your body, taking deep breaths, or writing down what's bothering you. Reflect before acting, and consider constructive steps to resolve the issue. Understanding and processing anger helps you gain clarity and prevent regret, turning a strong emotion into positive action.`;
      tips = [
        "Take 10 deep breaths before reacting.",
        "Write down triggers and feelings to process them.",
        "Engage in physical activity to release energy.",
        "Talk to someone you trust to gain perspective.",
        "Try a mindfulness or relaxation exercise.",
      ];
    }

    return { comment, tips };
  };

  const selectedAdvice = selectedEmotion ? generateAdvice(selectedEmotion) : null;

  const getRandomEmotionQuote = (emotion: "Happy" | "Sad" | "Angry") => {
    const quotes = emotionQuotes[emotion];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  const getEmotionIcon = (emotion: "Happy" | "Sad" | "Angry" | null) => {
    if (!emotion) return "😐";
    if (emotion === "Happy") return "😄";
    if (emotion === "Sad") return "😢";
    if (emotion === "Angry") return "😠";
  };

  // Emotion button styles per emotion
  const getEmotionButtonStyle = (emotion: "Happy" | "Sad" | "Angry", isSelected: boolean) => {
    const base = {
      flex: 1,
      borderRadius: 999,
      paddingVertical: 14,
      marginHorizontal: 6,
      alignItems: "center" as const,
      borderWidth: 1,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 1,
    };

    const colors: any = {
      Happy: { bg: "#FEF3C7", border: "#FCD34D", text: "#B45309", selectedBg: "#FBBF24", selectedText: "#FFFFFF" },
      Sad: { bg: "#DBEAFE", border: "#3B82F6", text: "#1E40AF", selectedBg: "#3B82F6", selectedText: "#FFFFFF" },
      Angry: { bg: "#FEE2E2", border: "#EF4444", text: "#991B1B", selectedBg: "#EF4444", selectedText: "#FFFFFF" },
    };

    const c = colors[emotion];

    return {
      ...base,
      backgroundColor: isSelected ? c.selectedBg : c.bg,
      borderColor: isSelected ? c.selectedBg : c.border,
      color: isSelected ? c.selectedText : c.text,
    };
  };

  const getEmotionTextColor = (emotion: "Happy" | "Sad" | "Angry", isSelected: boolean) => {
    const colors: any = {
      Happy: { text: "#B45309", selectedText: "#FFFFFF" },
      Sad: { text: "#1E40AF", selectedText: "#FFFFFF" },
      Angry: { text: "#991B1B", selectedText: "#FFFFFF" },
    };
    return isSelected ? colors[emotion].selectedText : colors[emotion].text;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello! 👋</Text>
          <Text style={styles.subGreeting}>
            How are you feeling today? Tap one to receive guidance.
          </Text>
          <Text style={styles.emotionIcon}>{getEmotionIcon(selectedEmotion)}</Text>
        </View>

        {/* Emotion Chips */}
        <View style={styles.emotionsRow}>
          {emotions.map((emotion) => {
            const isSelected = selectedEmotion === emotion;
            return (
              <TouchableOpacity
                key={emotion}
                activeOpacity={0.85}
                onPress={() => toggleEmotion(emotion)}
                style={getEmotionButtonStyle(emotion, isSelected)}
              >
                <Text style={{ fontSize: 17, fontWeight: "600", color: getEmotionTextColor(emotion, isSelected) }}>
                  {emotion}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Advice Section */}
        {selectedEmotion && selectedAdvice ? (
          <>
            <View style={styles.adviceCard}>
              <Text style={styles.adviceComment}>{selectedAdvice.comment}</Text>
              <View style={{ marginTop: 24 }}>
                {selectedAdvice.tips.map((tip, idx) => (
                  <View key={idx} style={styles.tipRow}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.tipText}>{tip}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.quoteCard}>
              <Text style={styles.quoteText}>{getRandomEmotionQuote(selectedEmotion)}</Text>
            </View>
          </>
        ) : (
          <View style={styles.motivationCard}>
            <Text style={styles.motivationTitle}>Today's Calm Note</Text>
            <Text style={styles.motivationQuote}>
              {calmQuote || calmQuotes[Math.floor(Math.random() * calmQuotes.length)]}
            </Text>
            <Text style={styles.motivationSub}>
              Take a moment to breathe, reflect, and carry this thought with you.
            </Text>
          </View>
        )}

        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  scrollContent: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 60 },
  header: { alignItems: "center", marginBottom: 32 },
  greeting: { fontSize: 36, fontWeight: "700", color: "#0F172A", letterSpacing: -0.5 },
  subGreeting: { fontSize: 17, color: "#64748B", textAlign: "center", marginTop: 8, lineHeight: 24 },
  emotionIcon: { fontSize: 60, marginTop: 16, },
  emotionsRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 32 },
  adviceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 20,
  },
  adviceComment: { fontSize: 16, color: "#475569", lineHeight: 28 },
  tipRow: { flexDirection: "row", marginBottom: 12 },
  bullet: { fontSize: 20, marginRight: 12 },
  tipText: { flex: 1, fontSize: 16, color: "#475569", lineHeight: 24 },
  quoteCard: {
    backgroundColor: "#E0F2FE",
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  quoteText: { fontSize: 16, fontStyle: "italic", color: "#1E40AF", lineHeight: 26, textAlign: "center" },
  motivationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 28,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  motivationTitle: { fontSize: 22, fontWeight: "700", color: "#0F172A", marginBottom: 16 },
  motivationQuote: { fontSize: 17, fontStyle: "italic", color: "#475569", textAlign: "center", lineHeight: 26, marginBottom: 12 },
  motivationSub: { fontSize: 15, color: "#64748B", textAlign: "center" },
});