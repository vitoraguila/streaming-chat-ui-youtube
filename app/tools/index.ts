import { AIState, MutableAIState } from "../lib/types";
import { recipesList } from "./recipeList";

export function tools(aiState: MutableAIState<AIState>) {
    return {
        ...recipesList(aiState)
    }
}