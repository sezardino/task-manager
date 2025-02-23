import { TrafficCone } from "lucide-react";

export const PageNotReady = () => {
  return (
    <main className="text-center container flex flex-col justify-center gap-4 h-full">
      <div>
        <h1 className="text-3xl font-bold">Oops! We're not done yet...</h1>
        <p className="mt-2 text-muted-foreground">
          But something interesting is coming soon! Check back later.
        </p>
      </div>
      <TrafficCone className="size-20 mx-auto -order-1 text-muted-foreground" />
    </main>
  );
};
