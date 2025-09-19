import { ResourceNavigatorClient } from "@/components/resources/resource-navigator-client";

export default function ResourcesPage() {
  return (
    <div className="container mx-auto max-w-4xl py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline tracking-tight">Resource Navigator</h1>
        <p className="text-muted-foreground mt-2">
          Tell us what's on your mind, and our AI will suggest relevant support resources in India.
        </p>
      </header>
      <ResourceNavigatorClient />
    </div>
  );
}
