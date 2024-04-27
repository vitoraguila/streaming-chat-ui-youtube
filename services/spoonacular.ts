import { Recipe, RecipeInfo, RecipeStep } from "./spoonacular.types";

export class Spoonacular {
  constructor(
    private readonly apiKey = process.env.SPOONACULAR_API_KEY,
    private readonly baseUrl = "https://api.spoonacular.com"
  ) {}

  async getRecipes(ingredients: string): Promise<Recipe[] | []> {
    try {
      const recipes = await fetch(
        `${this.baseUrl}/recipes/findByIngredients?apiKey=${this.apiKey}&ingredients=${ingredients}&ranking=2`
      );
      return (await recipes.json()) as Recipe[];
    } catch (error) {
      return [];
    }
  }

  async getRecipeInfo(id: number): Promise<RecipeInfo | undefined> {
    try {
      const recipe = await fetch(
        `${this.baseUrl}/recipes/${id}/information?apiKey=${this.apiKey}`
      );
      return (await recipe.json()) as RecipeInfo;
    } catch (error) {
      return undefined;
    }
  }

  async getInstructionsInfo(id: number): Promise<RecipeStep[]> {
    try {
      const instructions = await fetch(
        `${this.baseUrl}/recipes/${id}/analyzedInstructions?apiKey=${this.apiKey}`
      );
      return (await instructions.json()) as RecipeStep[];
    } catch (error) {
      return [];
    }
  }
}
