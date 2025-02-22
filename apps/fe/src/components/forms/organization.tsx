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

export const OrganizationFormSchema = z.object({
  name: z.string({ required_error: "Organization name is required field" }),
});

export type OrganizationFormValues = z.infer<typeof OrganizationFormSchema>;

type OmittedProps = Omit<ComponentPropsWithoutRef<"form">, "onSubmit">;
export type OrganizationFormProps = OmittedProps & {
  onSubmit: (values: OrganizationFormValues) => Promise<void>;
  error?: string;
};

export const OrganizationForm = (props: OrganizationFormProps) => {
  const { error, onSubmit, className, ...rest } = props;

  const form = useForm<OrganizationFormValues>({
    resolver: zodResolver(OrganizationFormSchema),
    mode: "all",
  });

  const submitHandler = (values: OrganizationFormValues) => {
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
      </form>
    </Form>
  );
};
