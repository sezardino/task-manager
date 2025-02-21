import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/shadcn";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentPropsWithoutRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const OnboardingFormSchema = z.object({
  name: z.string({ required_error: "Organization name is required field" }),
});

export type OnboardingFormValues = z.infer<typeof OnboardingFormSchema>;

type OmittedProps = Omit<ComponentPropsWithoutRef<"form">, "onSubmit">;
export type OnboardingFormProps = OmittedProps & {
  onSubmit: (values: OnboardingFormValues) => Promise<void>;
  error?: string;
};

export const OnboardingForm = (props: OnboardingFormProps) => {
  const { error, onSubmit, className, ...rest } = props;

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(OnboardingFormSchema),
    mode: "all",
  });

  const submitHandler = (values: OnboardingFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form
        {...rest}
        className={cn("grid gap-4", className)}
        onSubmit={form.handleSubmit(submitHandler)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  name="name"
                  placeholder="Enter organization name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {typeof error === "string" && (
          <p className="text-destructive text-sm text-center">{error}</p>
        )}

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="mt-2 w-full"
        >
          Create organization
        </Button>
      </form>
    </Form>
  );
};
