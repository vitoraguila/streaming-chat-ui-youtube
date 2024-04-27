"use client";

import { useActions, useUIState } from "ai/rsc";
import Image from "next/image";
import { useState } from "react";
import { AI } from "@/app/lib/provider";
import { Button } from "@/components/ui/Button";
import { Recipe } from "@/services/spoonacular.types";

interface Props {
  data: Recipe[];
}

export const List = ({ data }: Props) => {
  const [detailsUI, setDetailsUI] = useState<null | React.ReactNode>(null);
  const { recipesGetInfo } = useActions<typeof AI>();
  const [_, setMessages] = useUIState();

  return (
    <div className="grid gap-2 rounded-2xl border border-zinc-200 bg-white p-2 sm:p-4">
      {detailsUI && (<Button type="button" size="icon" onClick={() => setDetailsUI(null)}>
        <span>{`<`}</span>
      </Button>)}

      {detailsUI ? (
        detailsUI
      ) : (
        <>
          <div className="grid gap-2 sm:flex sm:flex-row justify-between border-b p-2">
            <div className="sm:basis-1/4">
              <div className="text-xs text-zinc-600">Image</div>
            </div>
            <div className="sm:basis-1/2">
              <div className="text-xs text-zinc-600">Title</div>
            </div>
            <div className="sm:basis-1/4">
              <div className="sm:text-right text-xs text-zinc-600">
                Ingredients
              </div>
            </div>
          </div>
          <div className="grid gap-3">
            {data &&
              data.map((recipe) => (
                <div
                  key={recipe.id}
                  className="flex cursor-pointer flex-row items-start sm:items-center gap-4 rounded-xl p-2 hover:bg-zinc-50"
                  onClick={async () => {
                    const response = await recipesGetInfo(
                      recipe.id,
                      recipe.title
                    );
                    setDetailsUI(response.recipeDetailsUI);

                    // Insert a new system message to the UI.
                    setMessages((currentMessages: any) => [
                      ...currentMessages,
                      response.newMessage,
                    ]);
                  }}
                >
                  <div className="sm:basis-1/4">
                    <div className="w-16 sm:w-16 shrink-0 rounded-lg bg-zinc-50 overflow-hidden">
                      <Image
                        src={recipe.image}
                        width={100}
                        height={80}
                        alt={"Picture of the author"}
                      />
                    </div>
                  </div>

                  <div className="sm:basis-1/2">
                    <div className="col-span-2">
                      <div className="font-medium text-zinc-600">
                        {recipe.title}
                      </div>
                    </div>
                  </div>
                  <div className="sm:basis-1/4">
                    <div className="sm:text-right font-medium font-mono text-zinc-600">
                      {recipe.usedIngredientCount +
                        recipe.missedIngredientCount}
                    </div>
                    <div className="sm:text-right text-xs text-zinc-600">
                      in total
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};
