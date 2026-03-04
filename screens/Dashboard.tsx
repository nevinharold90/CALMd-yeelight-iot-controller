import { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LayoutAnimation, Platform, UIManager } from "react-native";


if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


import { useRoute, RouteProp } from "@react-navigation/native";
import { sendColorCommand } from "../services/YeeLightServices";
import { RootStackParamList } from "../App";

type Emotion = 
  | "Joy" | "Sadness" | "Anger" | "Fear" | "Disgust" 
  | "Anxiety" | "Envy" | "Embarrassment" | "Ennui";

export default function Dashboard() {
  const route = useRoute<RouteProp<RootStackParamList, "Dashboard">>();
  const { bulbIp } = route.params;

  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [calmQuote, setCalmQuote] = useState<string>("");

  const emotions: Emotion[] = [
    "Joy", "Sadness", "Anger", "Fear", "Disgust",
    "Anxiety", "Envy", "Embarrassment", "Ennui",
  ];

  const buttonStyles: Record<Emotion, string> = {
  Joy: '#FFFF00', Sadness: '#0000FF', Anger: '#FF0000',
  Fear: '#800080', Disgust: '#00FF00', Anxiety: '#FFA500',
  Envy: '#00FFFF', Embarrassment: '#FFB6C1', Ennui: '#9966CC'
};

  // RGB decimal values inspired by Inside Out 2 official palettes
  // const emotionColors: Record<Emotion, number> = {
  //   Joy: 16776960,        // #FFFF00 bright yellow
  //   Sadness: 255,         // #0000FF deep blue
  //   Anger: 16711680,      // #FF0000 vivid red
  //   Fear: 8388736,        // #800080 purple
  //   Disgust: 65280,       // #00FF00 lime green
  //   Anxiety: 16750848,    // #FFA500 orange
  //   Envy: 65535,          // #00FFFF turquoise/cyan
  //   Embarrassment: 16738740, // #FFB6C1 soft pink
  //   Ennui: 10040115,      // #9966CC purplish-grey/indigo
  // };
  
const emotionColors: Record<Emotion, number> = {
    Joy: 16777215,           // #FFFFFF - To ground and stabilize
    Sadness: 16766720,       // #FFD700 - To fight "Deep Blue" with "Sunlight"
    Anger: 8900331,          // #87CEEB - To "cool down" the Vivid Red
    Fear: 8454115,           // #80FF63 (Soft Mint/Teal) - To counteract the Purple "Void"
    Disgust: 15132666,       // #E6E6FA - To wash away the "Lime Green" visceral feeling
    Anxiety: 9419919,        // #8FBC8F - To calm the "High Alert" Orange
    Envy: 16758706,          // #FFB7B2 - To soften the "Cold" Turquoise envy
    Embarrassment: 13260,    // #003366 - To hide the "Pink" blush in a safe dark blue
    Ennui: 16750848,         // #FFA500 - To wake up the "Purplish-grey" with energy
  };

  const emotionIcons: Record<Emotion | "default", string> = {
    default: "😐",
    Joy: "😄",
    Sadness: "😢",
    Anger: "😣",
    Fear: "😨",
    Disgust: "🤢",
    Anxiety: "😰",
    Envy: "😒",
    Embarrassment: "😳",
    Ennui: "🥱",
  };

  const emotionQuotes: Partial<Record<Emotion, string[]>> = {
    Joy: [
      "Happiness is not something ready-made. It comes from your own actions. — Dalai Lama",
      "Joy is the simplest form of gratitude. — Karl Barth",
    ],
    Sadness: [
      "Sadness flies away on the wings of time. — Jean de La Fontaine",
      "Tears come from the heart and not from the brain. — Leonardo da Vinci",
    ],
    Anger: [
      "For every minute you remain angry, you give up sixty seconds of peace of mind. — Ralph Waldo Emerson",
      "Anger is a short madness. — Horace",
    ],
    // Expand as needed for other emotions
  };

  const calmQuotes = [
    "Peace begins with a smile. — Mother Teresa",
    "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment. — Buddha",
    "Every day may not be good, but there is something good in every day. — Alice Morse Earle",
    "Inhale the future, exhale the past. — Unknown",
  ];

  const toggleEmotion = (emotion: Emotion) => {
    // 1. Prepare the "Fade" animation
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    if (selectedEmotion === emotion) {
      setSelectedEmotion(null);
      // ... rest of your reset logic
      return;
    }

    // 2. Add a tiny delay before the UI and Bulb "Transform" 
    // This makes the press feel intentional
    setTimeout(() => {
      setSelectedEmotion(emotion);

      const color = emotionColors[emotion];
      const payload = JSON.stringify({
        id: 1,
        method: "set_rgb",
        params: [color, "smooth", 2000], // 2 second smooth transition on the bulb
      }) + "\r\n";
      
      sendColorCommand(bulbIp, payload);
    }, 300); // 300ms delay: just enough to feel "thoughtful" but not "laggy"
  };

  const generateAdvice = (emotion: Emotion) => {
    // Your long-form advice here (kept as-is from previous version)
    const baseAdvice = {
      Joy: {
        comment: `Feeling Joy is a beautiful state—it's that warm, expansive energy that makes everything feel lighter and more possible. In moments like these, the world seems full of opportunity and connection. Take time to savor this feeling without rushing past it; true joy often lives in the small, everyday moments we sometimes overlook. Let it remind you of your capacity for wonder, gratitude, and playfulness. Sharing this energy with others can create ripples of positivity that come back to you in unexpected ways. Remember that joy isn't about constant highs—it's about noticing and appreciating the good that already exists around and within you.`,
        tips: [
          "Write down five specific things that brought you joy today, no matter how small.",
          "Spend 10–15 minutes doing something purely for fun with no goal attached.",
          "Reach out to someone you care about and share a positive memory or compliment.",
          "Take a slow walk outside and notice three beautiful or interesting things.",
          "Practice a random act of kindness, like leaving an encouraging note.",
          "Create something—doodle, cook, dance—just let creativity flow freely.",
          "Reflect on a past joyful moment and why it felt so meaningful to you.",
        ],
      },
      Sadness: {
        comment: `Sadness is a natural and important emotion—it signals that something matters deeply to you, and it gives you permission to slow down, reflect, and heal. It's okay to feel this way; it doesn't mean you're broken or weak. In fact, allowing yourself to sit with sadness often leads to greater self-understanding and emotional clarity. This feeling can help you process loss, disappointment, or change, and it opens the door to compassion—both for yourself and others. Be gentle with yourself right now. Small acts of care, like resting, crying if it comes, or talking to someone safe, can help the heaviness gradually lift. Over time, sadness teaches us resilience and deepens our capacity for empathy and connection.`,
        tips: [
          "Allow yourself to feel without judgment—set aside 10 minutes to sit quietly with your emotions.",
          "Journal freely about what's weighing on your heart; don't worry about making sense.",
          "Listen to music or watch something that matches your mood—it can feel validating.",
          "Reach out to a trusted friend or family member and share what you're going through.",
          "Practice gentle self-care: warm drink, blanket, favorite scent, or cozy lighting.",
          "Try a short guided compassion meditation focused on kindness toward yourself.",
          "Take slow, deep breaths and name what you notice in your body without trying to fix it.",
        ],
      },
      Anger: {
        comment: `Anger is a powerful signal that a boundary has been crossed, something important is threatened, or an injustice has occurred. It's energy in motion—meant to protect and motivate change. While it can feel overwhelming or destructive if unchecked, when understood and channeled constructively, anger becomes a force for clarity, assertiveness, and positive action. Give yourself space to feel it fully before responding. Name what triggered it, what value or need feels violated, and what you might want or need as a result. Physical movement often helps release the intensity safely. Once the heat cools, you can decide on calm, effective steps forward. Processing anger this way prevents regret and turns raw emotion into meaningful change or stronger boundaries.`,
        tips: [
          "Step away for a moment and take 10 slow, deep breaths to create space between feeling and reaction.",
          "Write an unfiltered anger letter (don't send it)—get everything out on paper.",
          "Move your body intensely for a few minutes: walk fast, punch a pillow, do jumping jacks.",
          "Identify the core need or value underneath the anger—what feels unfair or threatened?",
          "Talk it out with someone neutral who can listen without judging or fixing.",
          "Practice a cooling visualization: imagine the anger as fire slowly turning to warm light.",
          "After calming, ask: 'What one small, constructive step can I take right now?'",
        ],
      },
      // ... (add expanded blocks for Fear, Disgust, Anxiety, Envy, Embarrassment, Ennui as needed)
      Anxiety: {
        comment: `Anxiety often feels like your mind is racing ahead to every possible 'what if,' trying to prepare for threats that may never happen. It's your brain's overprotective alarm system working overtime. While exhausting, it comes from a place of care—wanting safety and control. The key is to gently reassure your nervous system that you're okay in this moment. Grounding techniques help bring you back to the present, where most catastrophes aren't actually unfolding. Over time, you can teach anxiety that not every worry needs immediate action. Be patient with yourself; progress isn't linear. Small, consistent practices build trust in your ability to handle uncertainty, turning overwhelming waves into manageable ripples.`,
        tips: [
          "Use the 5-4-3-2-1 grounding: name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.",
          "Try box breathing: inhale 4, hold 4, exhale 4, hold 4—repeat 5–10 times.",
          "Write worries in two columns: 'What I can control' vs. 'What I can't'—focus only on the first.",
          "Limit news/social media when anxiety spikes; set a 10-minute timer if you must check.",
          "Do gentle body scans: notice tension and breathe into those areas to release.",
          "Remind yourself: 'This feeling is temporary and will pass—I've survived it before.'",
          "Plan one tiny, doable step for today instead of solving everything at once.",
        ],
      },

      Fear: {
        comment: `Fear is your mind's early warning system — it's there to keep you safe by anticipating danger and preparing you to respond. While it can sometimes feel paralyzing or exaggerated (especially when the "threat" is more social or emotional than physical), fear at its core is protective and adaptive. It sharpens focus, heightens senses, and motivates caution or escape when needed. The challenge is distinguishing real threats from imagined ones, especially in modern life where many fears stem from uncertainty, rejection, or failure rather than immediate physical harm. Acknowledge fear without letting it take over; thank it for trying to help, then gently evaluate whether the danger is as big as it feels. With practice, you can turn fear from a roadblock into a signal that guides wiser choices, building courage along the way. Remember: feeling afraid doesn't mean you're weak — acting despite fear is what defines bravery.`,
        tips: [
          "Name the fear out loud or in writing — simply labeling it often reduces its intensity.",
          "Ask yourself: 'What's the worst that could realistically happen?' then 'What's the best?' and 'What's most likely?'",
          "Practice gradual exposure: start with small, safe steps toward what scares you instead of avoiding it completely.",
          "Use grounding techniques like holding something cold, focusing on your feet on the floor, or slow breathing to stay present.",
          "Visualize a protective 'safe place' in your mind — return there mentally when fear spikes.",
          "Talk to someone trusted about the fear; external perspective often makes it feel more manageable.",
          "Celebrate small acts of courage, even if they feel minor — each one rewires your response over time.",
        ],
      },
      Disgust: {
        comment: `Disgust evolved to protect us from contamination, toxins, or harmful social influences — it's your internal 'no thanks' button that helps set boundaries and maintain standards. In everyday life, it shows up not just with bad smells or food, but also with people, ideas, behaviors, or situations that feel morally off, icky, or beneath your values. While it can sometimes be overly judgmental or snobby if unchecked, healthy disgust is a valuable moral compass that helps you avoid toxic relationships, environments, or choices. Listen to it as information rather than absolute truth — ask what exactly feels wrong and why. Use that clarity to politely but firmly say no, walk away, or advocate for better. When channeled well, disgust becomes a tool for self-respect, authenticity, and protecting your peace instead of just turning up your nose.`,
        tips: [
          "Pause and identify exactly what triggered the disgust — is it physical, moral, relational, or something else?",
          "Practice saying 'That doesn't feel right for me' calmly instead of reacting with strong judgment.",
          "Set clear personal boundaries early to prevent resentment or passive disgust from building up.",
          "Reflect on whether the disgust is protecting something important (values, health, safety) or if it's rooted in bias/fear.",
          "Expose yourself gradually to mild 'disgust' triggers in safe ways to build tolerance where needed (e.g., trying new foods).",
          "Channel the energy into positive action: clean your space, curate better influences, or speak up against something unfair.",
          "Remind yourself that it's okay to have standards — you don't have to like or accept everything.",
        ],
      },
      Envy: {
        comment: `Envy arises when we notice someone has something we deeply want — whether it's success, relationships, looks, freedom, or ease — and it stings because it highlights a gap between where we are and where we wish to be. While it can feel painful or shameful, envy is actually useful feedback: it points directly to your true desires and values. Instead of letting it fester into bitterness or self-criticism, treat it as a compass. Ask: 'What part of their life do I really want for myself?' Then shift energy from comparison to quiet, focused action toward your own version of that thing. Celebrate others' wins when you can — it frees up mental space and often creates goodwill. Over time, transforming envy from a heavy emotion into motivation builds self-compassion and genuine progress. You're not 'less than' — you're simply on your own timeline, and your path is valid.`,
        tips: [
          "Name it honestly: 'I'm feeling envious because I want X too' — acknowledgment reduces its secret power.",
          "Make a private list of what you admire in their situation — then brainstorm small steps you can take toward similar things.",
          "Limit social media scrolling when envy spikes; curate feeds that inspire rather than compare.",
          "Practice 'mudita' (sympathetic joy): consciously wish others well — it feels good and shifts your energy.",
          "Focus on your own progress markers — track your wins weekly, no matter how small.",
          "Talk to a friend about the feeling; they often remind you of your unique strengths.",
          "Redirect the energy: channel envy into one concrete goal or skill-building action this week.",
        ],
      },
      Embarrassment: {
        comment: `Embarrassment is that hot, cringing wave when you feel you've violated a social rule, been seen in a vulnerable or awkward moment, or simply fear negative judgment. It's intensely uncomfortable because humans are wired for connection and belonging — anything that threatens our place in the group triggers this response. The good news? Most embarrassment fades quickly from other people's minds long before it leaves ours. People are usually too focused on themselves to dwell on your slip-up. Use the feeling as a reminder to be kind to yourself in these moments — treat yourself with the same compassion you'd offer a friend who tripped in public. Laugh it off when possible, apologize sincerely if needed, then let it go. Over time, embracing that everyone has awkward moments normalizes them and reduces their sting, freeing you to take more risks, be authentic, and connect more deeply without fear of minor missteps.`,
        tips: [
          "Use the 'spotlight effect' reminder: others notice and remember your mistakes far less than you think.",
          "Physically shake it off — literally wiggle your body or take deep breaths to discharge the nervous energy.",
          "Reframe: 'Everyone has embarrassing moments — this is just my turn, and it will pass.'",
          "Share the story later with humor — turning it into a funny anecdote often neutralizes the shame.",
          "Practice self-compassion phrases: 'I'm human, I'm learning, this doesn't define me.'",
          "Do something small and grounding right after (drink water, fix posture, change topic).",
          "Celebrate the courage it took to be seen, even imperfectly — vulnerability builds real connection.",
        ],
      },
      Ennui: {
        comment: `Ennui (deep boredom or listlessness) creeps in when life feels monotonous, meaningless, or lacking stimulation — everything seems 'meh,' and motivation flatlines. It's more than casual boredom; it's a subtle signal that your current routine, environment, or activities aren't engaging your curiosity, purpose, or growth. Teens and adults alike experience it during transitions or when external pressures drown out inner spark. Instead of fighting it or numbing out (endless scrolling, autopilot), lean in gently: treat ennui as an invitation to rediscover what lights you up. Small experiments — new hobbies, slight routine changes, deeper questions about values — often break the fog. It's okay if answers come slowly; the feeling itself is data, not failure. Over time, honoring ennui by seeking novelty, meaning, or rest prevents it from becoming chronic disconnection and helps you reconnect with aliveness.`,
        tips: [
          "Do a 10-minute 'curiosity scan': list 5 things that mildly interest you right now, no pressure to act.",
          "Change one tiny thing in your day — new route home, different music, eat somewhere else.",
          "Ask bigger questions: 'What would feel meaningful?' or 'When did I last feel truly engaged?'",
          "Try a low-effort novelty: watch a documentary on a random topic, learn one new skill via YouTube.",
          "Move your body differently — dance alone, stretch, walk backward for fun — to wake up the senses.",
          "Limit passive entertainment for a day; replace with creation (write, doodle, cook something new).",
          "Connect with someone — even a short, real conversation can interrupt the fog.",
        ],
      },
      // Add remaining emotions with similarly long content...
    };

    return baseAdvice[emotion] || { comment: "Select an emotion to receive guidance.", tips: [] };
  };

  const selectedAdvice = selectedEmotion ? generateAdvice(selectedEmotion) : null;

  const getRandomQuote = () => {
    if (selectedEmotion && emotionQuotes[selectedEmotion]) {
      const quotes = emotionQuotes[selectedEmotion]!;
      return quotes[Math.floor(Math.random() * quotes.length)];
    }
    return calmQuote || calmQuotes[Math.floor(Math.random() * calmQuotes.length)];
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello! 👋</Text>
          <Text style={styles.subGreeting}>
            How are you feeling today? Tap one to receive thoughtful guidance.
          </Text>
          <Text style={styles.emotionIcon}>
            {selectedEmotion ? emotionIcons[selectedEmotion] : emotionIcons.default}
          </Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.emotionsScroll}>
          <View style={styles.emotionsRow}>
            {emotions.map((emotion) => {
              const isSelected = selectedEmotion === emotion;
              const antidoteHex = `#${emotionColors[emotion].toString(16).padStart(6, '0')}`;
              const symptomHex = buttonStyles[emotion];
              // 3. THE LOGIC: 
              // If NOT pressed: background is very faint symptom color.
              // If PRESSED: background becomes the SOLID antidote color.
              const currentBg = isSelected ? antidoteHex : `${symptomHex}1A`;
              const currentBorder = isSelected ? antidoteHex : symptomHex;
              
              // Text is white when "fighting" the emotion, or the symptom color when idle
              const textColor = isSelected ? "#FFFFFF" : symptomHex;

              return (
              <TouchableOpacity
                  key={emotion}
                  onPress={() => toggleEmotion(emotion)}
                  style={[
                    styles.emotionButton,
                    {
                      backgroundColor: currentBg, 
                      // Force the border to match the background so it's "seamless"
                      borderColor: isSelected ? antidoteHex : symptomHex,
                      borderWidth: 2, // Keep it consistent
                      // Remove default shadows that might look gray
                      shadowOpacity: isSelected ? 0.4 : 0.05, 
                      elevation: isSelected ? 4 : 1,
                    },
                  ]}
                >
                  <Text style={{ color: isSelected ? "#FFF" : symptomHex }}>
                    {emotion}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

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
              <Text style={styles.quoteText}>
                "{getRandomQuote()}"
              </Text>
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
  emotionIcon: { fontSize: 60, marginTop: 16 },
  emotionsScroll: { marginBottom: 32 },
  emotionsRow: { flexDirection: "row", gap: 12 },
  emotionButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 110,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  emotionText: { 
    fontSize: 17, 
    fontWeight: "600",
    // color set dynamically above
  },
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
  bullet: { fontSize: 20, marginRight: 12, color: "#64748B" },
  tipText: { flex: 1, fontSize: 16, color: "#475569", lineHeight: 24 },
  quoteCard: {
    backgroundColor: "#E0F2FE", // original light blue background
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