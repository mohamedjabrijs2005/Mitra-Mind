"use server";

import { z } from "zod";
import { empatheticResponseToUserConcern } from "@/ai/flows/empathetic-response-to-user-concern";

const schema = z.object({
  userConcern: z.string().min(1, "Message cannot be empty."),
});

export async function getEmpatheticResponseAction(prompt: string) {
  const validatedFields = schema.safeParse({ userConcern: prompt });

  if (!validatedFields.success) {
    return {
      aiResponse: "I'm sorry, I encountered an issue. Please ensure your message is not empty.",
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const { empatheticResponse } = await empatheticResponseToUserConcern(validatedFields.data);
    return {
      aiResponse: empatheticResponse,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      aiResponse: "I'm having trouble connecting right now. Please try again in a moment.",
      error: "AI service failed",
    };
  }
}
