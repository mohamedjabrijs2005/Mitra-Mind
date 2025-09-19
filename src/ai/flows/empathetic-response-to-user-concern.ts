'use server';
/**
 * @fileOverview A flow that provides an empathetic and supportive response to user concerns.
 *
 * - empatheticResponseToUserConcern - A function that handles the generation of empathetic responses.
 * - EmpatheticResponseToUserConcernInput - The input type for the empatheticResponseToUserConcern function.
 * - EmpatheticResponseToUserConcernOutput - The return type for the empatheticResponseToUserConcern function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EmpatheticResponseToUserConcernInputSchema = z.object({
  userConcern: z
    .string()
    .describe('The user\u2019s concern that requires an empathetic response.'),
});
export type EmpatheticResponseToUserConcernInput = z.infer<
  typeof EmpatheticResponseToUserConcernInputSchema
>;

const EmpatheticResponseToUserConcernOutputSchema = z.object({
  empatheticResponse: z
    .string()
    .describe('The empathetic and supportive response to the user\u2019s concern.'),
});
export type EmpatheticResponseToUserConcernOutput = z.infer<
  typeof EmpatheticResponseToUserConcernOutputSchema
>;

export async function empatheticResponseToUserConcern(
  input: EmpatheticResponseToUserConcernInput
): Promise<EmpatheticResponseToUserConcernOutput> {
  return empatheticResponseToUserConcernFlow(input);
}

const empatheticResponseToUserConcernPrompt = ai.definePrompt({
  name: 'empatheticResponseToUserConcernPrompt',
  input: {schema: EmpatheticResponseToUserConcernInputSchema},
  output: {schema: EmpatheticResponseToUserConcernOutputSchema},
  prompt: `You are an AI assistant designed to provide empathetic and supportive responses to user concerns, offering initial guidance and reassurance.

  User Concern: {{{userConcern}}}

  Empathetic Response:`,
});

const empatheticResponseToUserConcernFlow = ai.defineFlow(
  {
    name: 'empatheticResponseToUserConcernFlow',
    inputSchema: EmpatheticResponseToUserConcernInputSchema,
    outputSchema: EmpatheticResponseToUserConcernOutputSchema,
  },
  async input => {
    const {output} = await empatheticResponseToUserConcernPrompt(input);
    return output!;
  }
);
