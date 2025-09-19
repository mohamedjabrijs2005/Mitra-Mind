'use server';
/**
 * @fileOverview A flow that detects if a user is in distress based on their message.
 *
 * - detectUserDistress - A function that analyzes a user's message for distress signals.
 * - DetectUserDistressInput - The input type for the detectUserDistress function.
 * - DetectUserDistressOutput - The return type for the detectUserDistress function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectUserDistressInputSchema = z.object({
  userMessage: z
    .string()
    .describe('The user’s message to be analyzed for distress signals.'),
});
export type DetectUserDistressInput = z.infer<
  typeof DetectUserDistressInputSchema
>;

const DetectUserDistressOutputSchema = z.object({
  inDistress: z
    .boolean()
    .describe('Whether the user is determined to be in immediate distress.'),
});
export type DetectUserDistressOutput = z.infer<
  typeof DetectUserDistressOutputSchema
>;

export async function detectUserDistress(
  input: DetectUserDistressInput
): Promise<DetectUserDistressOutput> {
  return detectUserDistressFlow(input);
}

const detectUserDistressPrompt = ai.definePrompt({
  name: 'detectUserDistressPrompt',
  input: {schema: DetectUserDistressInputSchema},
  output: {schema: DetectUserDistressOutputSchema},
  prompt: `You are an AI assistant trained to detect immediate psychological distress in user messages. Your task is to analyze the following message and determine if the user is in a crisis situation (e.g., expressing intent for self-harm, severe panic, or indicating immediate danger).

  User Message: {{{userMessage}}}

  Analyze the message carefully. If the message contains any indication of immediate danger, self-harm, or a severe crisis, set 'inDistress' to true. Otherwise, set it to false. Be cautious and prioritize user safety. If in doubt, err on the side of caution and flag it as distress.`,
});

const detectUserDistressFlow = ai.defineFlow(
  {
    name: 'detectUserDistressFlow',
    inputSchema: DetectUserDistressInputSchema,
    outputSchema: DetectUserDistressOutputSchema,
  },
  async input => {
    const {output} = await detectUserDistressPrompt(input);
    return output!;
  }
);
