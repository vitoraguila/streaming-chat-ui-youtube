export interface Measure {
  amount: number;
  unitLong: string;
  unitShort: string;
}

export interface ExtendedIngredient {
  aisle: string;
  amount: number;
  consitency: string;
  id: number;
  image: string;
  measures: {
    metric: Measure;
    us: Measure;
  };
  meta: string[];
  name: string;
  original: string;
  originalName: string;
  unit: string;
}

export interface WinePairingProductMatch {
  id: number;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  averageRating: number;
  ratingCount: number;
  score: number;
  link: string;
}

export interface WinePairing {
  pairedWines: string[];
  pairingText: string;
  productMatches: WinePairingProductMatch[];
}

export interface RecipeInfo {
  id: number;
  title: string;
  image: string;
  imageType: string;
  servings: number;
  readyInMinutes: number;
  license: string;
  sourceName: string;
  sourceUrl: string;
  spoonacularSourceUrl: string;
  healthScore: number;
  spoonacularScore: number;
  pricePerServing: number;
  analyzedInstructions: any[]; // This might need further definition based on the actual data structure
  cheap: boolean;
  creditsText: string;
  cuisines: string[];
  dairyFree: boolean;
  diets: string[];
  gaps: string;
  glutenFree: boolean;
  instructions: string;
  ketogenic: boolean;
  lowFodmap: boolean;
  occasions: string[];
  sustainable: boolean;
  vegan: boolean;
  vegetarian: boolean;
  veryHealthy: boolean;
  veryPopular: boolean;
  whole30: boolean;
  weightWatcherSmartPoints: number;
  dishTypes: string[];
  extendedIngredients: ExtendedIngredient[];
  summary: string;
  winePairing: WinePairing;
}

export interface Equipment {
  id: number;
  image: string;
  name: string;
  temperature?: {
    number: number;
    unit: string;
  };
}

export interface Length {
  number: number;
  unit: string;
}

export interface Step {
  equipment: Equipment[];
  ingredients: Ingredient[];
  length?: Length;
  number: number;
  step: string;
}

export interface RecipeStep {
  name: string;
  steps: Step[];
}

export interface Details {
  recipe: RecipeInfo;
  instructions: RecipeStep[];
}

export interface Ingredient {
  aisle: string;
  amount: number;
  extendedName?: string;
  id: number;
  image: string;
  meta: string[];
  name: string;
  original: string;
  originalName: string;
  unit: string;
  unitLong: string;
  unitShort: string;
}

export interface Recipe {
  id: number;
  image: string;
  imageType: string;
  likes: number;
  missedIngredientCount: number;
  missedIngredients: Ingredient[];
  title: string;
  unusedIngredients: Ingredient[];
  usedIngredientCount: number;
  usedIngredients: Ingredient[];
}
