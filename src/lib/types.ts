import type { RiskLevel } from "./crisis";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  skillIds?: string[];
  quickReplies?: string[];
  risk?: RiskLevel;
}

export interface ChatRequest {
  messages: ChatMessage[];
  mood?: string;
}

export interface ChatResponse {
  reply: string;
  skillIds: string[];
  quickReplies: string[];
  risk: RiskLevel;
}
