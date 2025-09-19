'use server';
/**
 * @fileOverview An AI-driven resource navigator flow.
 *
 * - aiDrivenResourceNavigator - A function that suggests appropriate resources based on user input.
 * - AIDrivenResourceNavigatorInput - The input type for the aiDrivenResourceNavigator function.
 * - AIDrivenResourceNavigatorOutput - The return type for the aiDrivenResourceNavigator function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIDrivenResourceNavigatorInputSchema = z.object({
  userInput: z
    .string()
    .describe('The user input describing their mental health concerns.'),
  userLocation: z
    .string()
    .optional()
    .describe('The user location in India to filter resources.'),
});
export type AIDrivenResourceNavigatorInput = z.infer<typeof AIDrivenResourceNavigatorInputSchema>;

const AIDrivenResourceNavigatorOutputSchema = z.object({
  suggestedResources: z
    .array(z.string())
    .describe('A list of resources suggested based on user input and location.'),
});
export type AIDrivenResourceNavigatorOutput = z.infer<typeof AIDrivenResourceNavigatorOutputSchema>;

export async function aiDrivenResourceNavigator(
  input: AIDrivenResourceNavigatorInput
): Promise<AIDrivenResourceNavigatorOutput> {
  return aiDrivenResourceNavigatorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiDrivenResourceNavigatorPrompt',
  input: {schema: AIDrivenResourceNavigatorInputSchema},
  output: {schema: AIDrivenResourceNavigatorOutputSchema},
  prompt: `You are a mental health resource navigator for Indian youth. Based on the user's input, suggest relevant resources like helplines, support groups, and online materials. Consider the user's location in India if provided.

User Input: {{{userInput}}}
User Location: {{{userLocation}}}

Available Resources:
- Helplines: ["AASRA: +91-9820466726", "Vandrevala Foundation: 1860-2662-345, 1800-2333-330", "iCALL: 022-25521111"]
- Support Groups: ["Manas Foundation", "The MINDS Foundation"]
- Online Materials: ["NCERT Mental Wellbeing Handbook", "WHO Mental Health Resources"]

Suggest resources that best suit the user's needs and location.  List each resource on a newline.
`,
});

const aiDrivenResourceNavigatorFlow = ai.defineFlow(
  {
    name: 'aiDrivenResourceNavigatorFlow',
    inputSchema: AIDrivenResourceNavigatorInputSchema,
    outputSchema: AIDrivenResourceNavigatorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
