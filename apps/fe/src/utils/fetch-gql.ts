import { axiosInstance } from "@/libs/axios";
import { AxiosRequestConfig, AxiosResponse } from "axios";

type Params<Variables = object> = Omit<
  AxiosRequestConfig,
  "method" | "url" | "data"
> & {
  query: string;
  variables?: Variables;
};

export const fetchGQL = async <Payload, Variables = object>(
  params: Params<Variables>
): Promise<AxiosResponse<Payload>> => {
  const { query, variables, ...rest } = params;
  const data = { query, variables };

  try {
    const response = await axiosInstance({
      method: "POST",
      url: "/graphql",
      data,
      ...rest,
    });

    if (response.data.errors) throw new Error(response.data.errors[0].message);

    return response;
  } catch (error) {
    console.error("GraphQL request failed:", error);
    throw error;
  }
};
