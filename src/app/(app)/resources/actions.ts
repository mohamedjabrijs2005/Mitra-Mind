"use server";

import { z } from "zod";
import { aiDrivenResourceNavigator } from "@/ai/flows/ai-driven-resource-navigator";

const schema = z.object({
  userInput: z.string().min(10, "Please describe your concern in a bit more detail."),
  userLocation: z.string().optional(),
});

export async function getResourcesAction(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    userInput: formData.get('userInput'),
    userLocation: formData.get('userLocation'),
  });

  if (!validatedFields.success) {
    return {
      message: "Validation failed.",
      errors: validatedFields.error.flatten().fieldErrors,
      resources: [],
    };
  }
  
  try {
    const { suggestedResources } = await aiDrivenResourceNavigator(validatedFields.data);
    return {
      message: "Success",
      resources: suggestedResources,
      errors: null,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "An error occurred while fetching resources. Please try again.",
      resources: [],
      errors: null,
    }
  }
}
