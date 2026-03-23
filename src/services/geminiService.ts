import { GoogleGenAI, GenerateContentResponse, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const geminiService = {
  async chat(message: string, history: { role: string; parts: { text: string }[] }[] = []) {
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: "You are MyET, an advanced financial intelligence assistant. Provide concise, authoritative, and data-driven insights. Use a professional, editorial tone.",
      },
      history: history,
    });

    const response = await chat.sendMessage({ message });
    return response.text;
  },

  async searchGrounding(query: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    return {
      text: response.text,
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || [],
    };
  },

  async analyzeComplex(content: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: `Analyze the following financial content and provide a bento-style impact analysis with key drivers and strategic shifts: ${content}`,
    });
    return response.text;
  },

  async textToSpeech(text: string) {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      return `data:audio/mpeg;base64,${base64Audio}`;
    }
    return null;
  },

  async transcribeAudio(base64Audio: string, mimeType: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          inlineData: {
            data: base64Audio,
            mimeType: mimeType,
          },
        },
        { text: "Transcribe this audio exactly as spoken." },
      ],
    });
    return response.text;
  }
};
