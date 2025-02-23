import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserEntity } from "@/types/entity";
import { cn } from "@/utils/shadcn";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentPropsWithoutRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { UserData } from "../ui/user-data";

export const TaskFormSchema = z.object({
  title: z.string({ required_error: "Title is required field" }),
  description: z.string().optional(),
  assigneeId: z.string({
    required_error: "You should assign user to this task",
  }),
});

export type TaskFormValues = z.infer<typeof TaskFormSchema>;

type OmittedProps = Omit<ComponentPropsWithoutRef<"form">, "onSubmit">;
export type TaskFormProps = OmittedProps & {
  onSubmit: (values: TaskFormValues) => Promise<void>;
  initialValues?: Partial<TaskFormValues>;
  users: Pick<UserEntity, "email" | "firstName" | "lastName" | "id">[];
  error?: string;
};

export const TaskForm = (props: TaskFormProps) => {
  const { users, error, initialValues, onSubmit, className, ...rest } = props;

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(TaskFormSchema),
    mode: "all",
    defaultValues: initialValues,
  });

  const submitHandler = (values: TaskFormValues) => {
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  name="title"
                  placeholder="Enter task title"
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
                <Textarea {...field} placeholder="Enter task description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"assigneeId"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select users</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-14 rounded-lg">
                    <SelectValue placeholder="Select a user to assign" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      <UserData
                        email={user.email}
                        firstName={user.firstName}
                        lastName={user.lastName}
                      />
                    </SelectItem>
                  ))}

                  {users.length === 0 && <p>No users found</p>}
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500 capitalize" />
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
