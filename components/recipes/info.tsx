import { RecipeInfo, RecipeStep } from "@/services/spoonacular.types";
import Image from "next/image";
interface Props {
  recipe?: RecipeInfo;
  instructions: RecipeStep[];
}

export function Info({ recipe, instructions }: Props) {
  return (
    <div className="grid gap-2 rounded-2xl border border-zinc-200 bg-white p-2 sm:p-4">
      <h1 className="mt-2 text-lg font-extrabold tracking-tight text-gray-900 sm:text-lg">
        {recipe?.title}
      </h1>
      <h2 className="text-sm font-medium text-indigo-600">Ingredients</h2>
      <ul
        role="list"
        className="mt-6 text-sm font-medium text-gray-500 border-t border-gray-200 divide-y divide-gray-200"
      >
        {recipe?.extendedIngredients?.map((ing) => (
          <li key={ing.id} className="flex py-6 space-x-6 overflow-hidden">
            <div className="w-16 sm:w-16 shrink-0 rounded-lg bg-zinc-50 overflow-hidden">
              <Image
                src={`https://img.spoonacular.com/ingredients_100x100/${ing.image}`}
                width={100}
                height={80}
                className="rounded-lg"
                alt={ing.name}
              />
            </div>

            <div className="flex-auto space-y-1">
              <h3 className="text-indigo-900">{ing.aisle}</h3>
              <p className="font-medium text-gray-900">{ing.original}</p>
            </div>
          </li>
        ))}
      </ul>

      {instructions?.[0]?.steps && (
        <>
          <h2 className="text-sm font-medium text-indigo-600">Preparation</h2>

          <div className="flow-root">
            <ul role="list" className="-mb-8">
              {instructions?.[0]?.steps?.map((inst, key) => (
                <li key={key}>
                  <div className="relative pb-8">
                    {key !== instructions?.[0].steps.length - 1 ? (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span
                          className={
                            "bg-blue-500 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                          }
                        >
                          {inst.number}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">{inst.step}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
