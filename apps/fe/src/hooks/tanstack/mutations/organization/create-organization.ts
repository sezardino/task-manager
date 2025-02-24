import { OrganizationApiService } from "@/api/organization";
import { CreateOrganizationInput } from "@/api/organization/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateOrganizationMutation = () =>
  useMutation({
    mutationFn: (input: CreateOrganizationInput) =>
      OrganizationApiService.create(input),
    onSuccess: (_, input) =>
      toast.success(`Organization ${input.name} successfully created.`),
  });
