"use server";

import { z } from "zod";
import { empatheticResponseToUserConcern } from "@/ai/flows/empathetic-response-to-user-concern";
import { detectUserDistress } from "@/ai/flows/detect-user-distress";

const schema = z.object({
  userConcern: z.string().min(1, "Message cannot be empty."),
});

export async function getEmpatheticResponseAction(prompt: string) {
  const validatedFields = schema.safeParse({ userConcern: prompt });

  if (!validatedFields.success) {
    return {
      aiResponse: "I'm sorry, I encountered an issue. Please ensure your message is not empty.",
      inDistress: false,
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const [{ empatheticResponse }, { inDistress }] = await Promise.all([
      empatheticResponseToUserConcern({ userConcern: validatedFields.data.userConcern }),
      detectUserDistress({ userMessage: validatedFields.data.userConcern }),
    ]);
    
    return {
      aiResponse: empatheticResponse,
      inDistress: inDistress,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      aiResponse: "I'm having trouble connecting right now. Please try again in a moment.",
      inDistress: false,
      error: "AI service failed",
    };
  }
}
