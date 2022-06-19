import { inferQueryResponse } from "pages/api/trpc/[trpc]";

export type Pokemon = inferQueryResponse<"get-pokemon-by-id">;
