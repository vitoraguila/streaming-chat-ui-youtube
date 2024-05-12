export type MutableAIState<AIState> = {
  get: () => AIState;
  update: (newState: AIState) => void;
  done: (newState: AIState) => void | (() => void);
};

export type Message = {
  id: string;
  name: string;
  content: string;
  role: "user" | "assistant" | "system" | "function";
};

export type AIState = {
  chatId: string;
  messages: Message[];
};

export type UIState = {
  id: string;
  display: React.ReactNode;
};
