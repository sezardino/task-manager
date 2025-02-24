import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PROJECT_ROLES_COPY } from "@/const/project-roles-copy";
import { UserEntity } from "@/types/entity";
import { ProjectRole } from "@/types/enums";
import { cn } from "@/utils/shadcn";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, Trash2 } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { UserData } from "../ui/user-data";

const PROJECT_ROLES = Object.values(ProjectRole)
  .filter((r) => r !== ProjectRole.OWNER)
  .map((role) => ({
    label: PROJECT_ROLES_COPY[role],
    value: role,
  }));

const DEFAULT_USER = {
  id: undefined as unknown as string,
  role: ProjectRole.MEMBER,
};

export const AddProjectMembersFormSchema = z.object({
  users: z
    .array(
      z.object({
        id: z.string({ required_error: "Select user" }),
        role: z.nativeEnum(ProjectRole, {
          required_error: "Select needed role",
        }),
      })
    )
    .min(1, "You should select min 1 user"),
});

export type AddProjectMembersFormValues = z.infer<
  typeof AddProjectMembersFormSchema
>;

type OmittedProps = Omit<ComponentPropsWithoutRef<"form">, "onSubmit">;
export type AddProjectMembersFormProps = OmittedProps & {
  onSubmit: (values: AddProjectMembersFormValues) => Promise<void>;
  error?: string;
  users: Pick<UserEntity, "id" | "firstName" | "lastName" | "email">[];
};

export const AddProjectMembersForm = (props: AddProjectMembersFormProps) => {
  const { users, error, onSubmit, className, ...rest } = props;

  const form = useForm<AddProjectMembersFormValues>({
    resolver: zodResolver(AddProjectMembersFormSchema),
    mode: "all",
    defaultValues: {
      users: [{ id: undefined, role: ProjectRole.MANAGER }],
    },
  });

  const submitHandler = (values: AddProjectMembersFormValues) => {
    onSubmit(values);
  };

  const { fields, append, remove } = useFieldArray({
    name: "users",
    control: form.control,
  });

  return (
    <Form {...form}>
      <form
        {...rest}
        className={cn("grid gap-4", className)}
        onSubmit={form.handleSubmit(submitHandler)}
      >
        <div className="flex flex-col">
          <ul className="relative products_name_price_desc">
            {fields.map((_, index, array) => (
              <li key={index} className="grid grid-cols-[1fr_1fr_auto] gap-3">
                <FormField
                  control={form.control}
                  name={`users.${index}.id`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select users</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-14 rounded-lg">
                            <SelectValue placeholder="Select a user" />
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
                <FormField
                  control={form.control}
                  key={index}
                  name={`users.${index}.role`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-14 rounded-lg">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {PROJECT_ROLES.map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                              <Badge variant={"secondary"}>{role.value}</Badge>
                            </SelectItem>
                          ))}

                          {users.length === 0 && <p>No users found</p>}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500 capitalize" />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant={"destructive"}
                  size="icon"
                  className="mt-9"
                  disabled={array.length === 1}
                  onClick={() => remove(index)}
                >
                  <Trash2 />
                </Button>
              </li>
            ))}
          </ul>
          {fields.length < users.length && (
            <Button
              type="button"
              size="icon"
              className="mt-4 self-center"
              disabled={fields.length >= users.length}
              onClick={() => append(DEFAULT_USER)}
            >
              <PlusCircle />
            </Button>
          )}
        </div>

        {typeof error === "string" && (
          <p className="text-destructive text-sm text-center">{error}</p>
        )}
      </form>
    </Form>
  );
};
