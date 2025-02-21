import { PropsWithChildren } from "react";

export const OnboardingLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-dvh flex items-center justify-center container mx-auto py-10">
      {children}
    </div>
  );
};
