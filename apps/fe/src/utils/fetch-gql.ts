import { axiosInstance } from "@/libs/axios";
import { AxiosRequestConfig, AxiosResponse } from "axios";

type Params<Variables = object> = Omit<AxiosRequestConfig, "method" | "url"> & {
  query: string;
  variables?: Variables;
};

export const fetchGQL = async <Payload, Variables = object>(
  params: Params<Variables>
): Promise<AxiosResponse<Payload>> => {
  const { query, variables, data, ...rest } = params;
  const body = { query, variables, ...data };

  try {
    const response = await axiosInstance({
      method: "POST",
      url: "/graphql",
      data: body,
      ...rest,
    });

    if (response.data.errors) throw new Error(response.data.errors[0].message);

    return response;
  } catch (error) {
    console.error("GraphQL request failed:", error);
    throw error;
  }
};
