import { createAI } from "ai/rsc";
import { AIState, UIState } from "./types";
import * as actions from "@/app/actions"
import { nanoid } from "nanoid";

export const AI = createAI<AIState, UIState[], typeof actions>({
    actions,
    initialUIState: [],
    initialAIState: { chatId: nanoid(), messages: []}
})