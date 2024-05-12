import { createStreamableUI, getMutableAIState } from "ai/rsc";
import { AI } from "../lib/provider";
import { Spoonacular } from "@/services/spoonacular";
import { Spinner } from "@/components/spinner";
import { Info } from "@/components/recipes";
import { nanoid } from "nanoid";
import { runAsyncFnWithoutBlocking, sleep } from "../lib/utils";

export async function recipesGetInfo(id: number, name: string) {
  "use server";

  const aiState = getMutableAIState<typeof AI>();
  const spoonacular = new Spoonacular();

  const recipeDetails = createStreamableUI(
    <div className="inline-flex items-start gap-1 md:item-center">
      <Spinner />
      <p className="mb-2 text-zinc-600">
        Searching for recipe <b>{name}</b>...
      </p>
    </div>
  );

  const systemMessage = createStreamableUI(null);

  runAsyncFnWithoutBlocking(async () => {
    await sleep(1000);

    recipeDetails.update(
      <div className="inline-flex items-start gap-1 md:item-center">
        <Spinner />
        <p className="mb-2 text-zinc-600">
          Loading recipe <b>{name}</b>...
        </p>
      </div>
    );

    await sleep(1000);
    const recipe = await spoonacular.getRecipeInfo(id);

    if (recipe && recipe?.extendedIngredients?.length > 0) {
      for (let i = 0; i < recipe?.extendedIngredients?.length; i++) {
        recipeDetails.update(
          <div className="inline-flex items-start gap-1 md:item-center">
            <Spinner />
            <p className="mb-2 text-zinc-600">
              Loading ingredien <b>{recipe.extendedIngredients?.[i]?.name}</b>
              ...
            </p>
          </div>
        );
        await sleep(300);
      }
    }

    const instructions = await spoonacular.getInstructionsInfo(id);

    recipeDetails.done(<Info recipe={recipe} instructions={instructions} />);

    systemMessage.done(
        <>
            You loaded recipe <b>{name}</b> successfully!
        </>
    )

    aiState.done({
      ...aiState.get(),
      messages: [
        ...aiState.get().messages.slice(0, -1),
        {
          id: nanoid(),
          role: "function",
          name: "showRecipeDetails",
          content: JSON.stringify({
            id,
            name,
            status: "completed",
          }),
        },
      ],
    });
  });

  return {
    recipeDetailsUI: recipeDetails.value,
    newMessage: {
      id: nanoid(),
      display: systemMessage.value,
    },
  };
}
