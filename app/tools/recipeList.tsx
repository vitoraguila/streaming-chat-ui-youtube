import { Spinner } from "@/components/spinner";
import { AIState, MutableAIState } from "../lib/types";
import { z } from "zod";
import { Spoonacular } from "@/services/spoonacular";
import { nanoid } from "nanoid";
import { List } from "@/components/recipes/list";

const parameters = z
  .object({
    ingredients: z.string().describe("ingredients"),
  })
  .required();

interface Props {
  ingredients: string;
}

const funcName = "get_recipes_list";

export function recipesList(aiState: MutableAIState<AIState>) {
  return {
    [funcName]: {
      description: "get the a list of recipes based on the given ingredients",
      parameters,
      generate: async function* (params: Props) {
        yield <Spinner />;

        const spoonacular = new Spoonacular();
        const data = await spoonacular.getRecipes(params.ingredients);

        aiState.done({
          ...aiState.get(),
          messages: [
            {
              id: nanoid(),
              role: "function",
              name: funcName,
              content: JSON.stringify(data),
            },
          ],
        });

        return <List data={data} />;
      },
    },
  };
}
