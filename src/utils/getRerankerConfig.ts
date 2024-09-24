import { mmr_reranker_id, normal_reranker_id, slingshot_reranker_id } from "../views/search/types";

type Reranker = {
  isEnabled: boolean;
  numResults?: number;
  names?: string;
  diversityBias?: number;
  userFunction?: string;
};
type NoneReranker = { type: "none" };

type CustomerSpecificReranker = {
  type: "customer_reranker";
  rerankerId: string;
};

type MmrReranker = {
  type: "mmr";
  diversityBias: number;
};

type UserFunctionReranker = {
  type: "userfn";
  userFunction: string;
};

export type ChainReranker = {
  type: "chain";
  rerankers: (NoneReranker | CustomerSpecificReranker | MmrReranker | UserFunctionReranker)[];
};

const getSingleReranker = (name: string, reranker: Reranker) => {
  switch (name) {
    case "slingshot":
      return {
        type: "customer_reranker",
        rerankerId: `rnk_${slingshot_reranker_id}`
      };

    case "normal":
      return {
        type: "customer_reranker",
        rerankerId: `rnk_${normal_reranker_id}`
      };

    case "mmr":
      return {
        type: name,
        diversityBias: reranker.diversityBias
      };

    case "userfn":
      return reranker.userFunction
        ? { type: name, userFunction: reranker.userFunction }
        : undefined;

    default:
      return {
        type: "none"
      }
  }
}
export const getRerankerConfigForApiV2 = (reranker: Reranker) : NoneReranker | CustomerSpecificReranker |
  MmrReranker | UserFunctionReranker | ChainReranker => {
  const rerankers = reranker.names?.split(",") || []
  if (rerankers?.length > 1) {
    return {
      type: "chain",
      rerankers: reranker?.names?.split(",").map((name: string) => {
        return getSingleReranker(name, reranker)
      })
    } as ChainReranker
  }

  else if (rerankers.length === 1) {
    const name = rerankers[0]
    return getSingleReranker(name, reranker) as NoneReranker | CustomerSpecificReranker | MmrReranker |
      UserFunctionReranker
  }

  else {
    return {
      type: "none"
    }
  }
}

export const getRerankerConfigForApiV1StreamQuery = (reranker: Reranker) => {
  const rerankers = reranker.names?.split(",") || []
  if (rerankers?.length > 1) {
    const name = rerankers[0]
    switch (name) {
      case "slingshot":
        return slingshot_reranker_id

      case "normal":
        return normal_reranker_id

      case "mmr":
        return mmr_reranker_id
      default:
        return normal_reranker_id
    }
  }
  else return normal_reranker_id
}