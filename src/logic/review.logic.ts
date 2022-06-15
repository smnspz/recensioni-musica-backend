import { Review } from "../models/_index";
import * as helpers from "../utils/helpers";

export const canUserModifyReview = (
  token: string,
  authorId: number
): Boolean => {
  const userId = helpers.getJsonFromJWT(token).id;
  return userId === authorId;
};
