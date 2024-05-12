import { getMutableAIState, streamUI } from "ai/rsc";
import { openai } from "@ai-sdk/openai";
import { nanoid } from "nanoid";
import { tools } from "../tools";

export async function submitUserMessage(userInput: string) {
  "use server";

  const aiState = getMutableAIState();

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: "user",
        content: userInput,
      },
    ],
  });

  const result = await streamUI({
    model: openai("gpt-3.5-turbo"),
    system: `You suggest recipes and detalhes of receitas based on given ingredients.
        Refuse to answer any other topic or question not related to food. Make sure that you are specialist in recipes.
        `,
    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        name: message.name,
        content: message.content,
      })),
    ],
    text: ({ content, done }) => {
      if (done) {
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: "assistant",
              content,
            },
          ],
        });
      }

      return <p>{content}</p>;
    },
    tools: tools(aiState)
  });

  return {
    id: Date.now(),
    display: result.value
  }
}
