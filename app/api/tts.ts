import {
  AudioConfig,
  SpeechConfig,
  SpeechSynthesizer,
  SpeakerAudioDestination,
  SpeechSynthesisResult,
} from "microsoft-cognitiveservices-speech-sdk";
import { getLang } from "../locales";
import { useAccessStore } from "../store";

export async function speak(
  text: string,
  callback: ((e: SpeechSynthesisResult) => void) | undefined,
) {
  if (!text) return;
  const accessStore = useAccessStore.getState();
  const player = new SpeakerAudioDestination();
  const audioConfig = AudioConfig.fromSpeakerOutput(player);
  const speechConfig = SpeechConfig.fromSubscription(
    accessStore.ttsKey ?? "",
    "eastus",
  );
  speechConfig.speechSynthesisVoiceName =
    getLang() === "cn" ? "zh-CN-XiaoxiaoNeural" : "en-US-AriaNeural";
  const synthesizer = new SpeechSynthesizer(speechConfig, audioConfig);
  synthesizer.speakTextAsync(text, callback);

  player.resume();
}
