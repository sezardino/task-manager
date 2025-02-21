import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ORGANIZATION_ROLES_COPY } from "@/const/organization-roles-copy";
import { OrganizationRole } from "@/types/enums";
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

const ROLES = [OrganizationRole.ADMIN, OrganizationRole.MEMBER].map((r) => ({
  value: r,
  label: ORGANIZATION_ROLES_COPY[r],
}));

export const OrganizationInviteFormSchema = z.object({
  name: z.string({ required_error: "Name is required field" }),
  role: z.nativeEnum(OrganizationRole, {
    message: "Role is required field",
    required_error: "Role is required field",
  }),
});

export type OrganizationInviteFormValues = z.infer<
  typeof OrganizationInviteFormSchema
>;

type OmittedProps = Omit<ComponentPropsWithoutRef<"form">, "onSubmit">;
export type OrganizationInviteFormProps = OmittedProps & {
  onSubmit: (values: OrganizationInviteFormValues) => Promise<void>;
  initialValues?: Partial<OrganizationInviteFormValues>;
  error?: string;
};

export const OrganizationInviteForm = (props: OrganizationInviteFormProps) => {
  const { error, initialValues, onSubmit, className, ...rest } = props;

  const form = useForm<OrganizationInviteFormValues>({
    resolver: zodResolver(OrganizationInviteFormSchema),
    mode: "all",
    defaultValues: initialValues,
  });

  const submitHandler = (values: OrganizationInviteFormValues) => {
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
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ROLES.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

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
