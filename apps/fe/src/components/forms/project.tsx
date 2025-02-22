import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/shadcn";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentPropsWithoutRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "../ui/textarea";

export const ProjectFormSchema = z.object({
  name: z.string({ required_error: "Project name is required field" }),
  description: z.string().optional(),
});

export type ProjectFormValues = z.infer<typeof ProjectFormSchema>;

type OmittedProps = Omit<ComponentPropsWithoutRef<"form">, "onSubmit">;
export type ProjectFormProps = OmittedProps & {
  onSubmit: (values: ProjectFormValues) => Promise<void>;
  error?: string;
};

export const ProjectForm = (props: ProjectFormProps) => {
  const { error, onSubmit, className, ...rest } = props;

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(ProjectFormSchema),
    mode: "all",
  });

  const submitHandler = (values: ProjectFormValues) => {
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
              <FormLabel>Project name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  name="name"
                  placeholder="Enter project name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  name="description"
                  placeholder="Describe the project"
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
