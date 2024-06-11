import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.categories)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.categories)[":id"]["$patch"]
>["json"];

export const useEditCategory = (id?: string) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.categories[":id"]["$patch"]({
        param: { id },
        json,
      });
      return response.json();
    },
    onSuccess: () => {
      toast.success("Account updated successfully");
      queryClient.invalidateQueries({ queryKey: ["category", { id }] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      // TODO: Invalidate summary and transactions queries
    },
    onError: () => {
      toast.error("Failed to edit category");
    },
  });
};
