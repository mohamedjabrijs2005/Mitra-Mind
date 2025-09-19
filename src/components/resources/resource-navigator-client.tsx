"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { getResourcesAction } from "@/app/(app)/resources/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, BookOpenCheck, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const initialState = {
  message: "",
  resources: [] as string[],
  errors: null,
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
            {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BookOpenCheck className="mr-2 h-4 w-4" />}
            Find Resources
        </Button>
    )
}

export function ResourceNavigatorClient() {
  const [state, formAction] = useActionState(getResourcesAction, initialState);

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="pt-6">
            <form action={formAction} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="userInput">Describe your concern</Label>
                    <Textarea
                    id="userInput"
                    name="userInput"
                    placeholder="e.g., 'I'm feeling very stressed about my exams and can't sleep.'"
                    rows={4}
                    required
                    />
                    {state.errors?.userInput && <p className="text-sm font-medium text-destructive">{state.errors.userInput[0]}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="userLocation">Your Location (Optional)</Label>
                    <Input
                    id="userLocation"
                    name="userLocation"
                    placeholder="e.g., 'Mumbai', 'Delhi'"
                    />
                    <p className="text-xs text-muted-foreground">Providing a location helps us find local resources for you.</p>
                </div>

                <div className="flex justify-end">
                    <SubmitButton />
                </div>
            </form>
        </CardContent>
      </Card>

      {state.message && state.message !== "Success" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      {state.resources && state.resources.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Suggested Resources</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {state.resources.map((resource, index) => (
                <Card key={index} className="flex items-center p-4 hover:bg-muted/50 transition-colors">
                    <BookOpenCheck className="h-6 w-6 mr-4 text-primary shrink-0" />
                    <p className="font-medium">{resource}</p>
                </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
