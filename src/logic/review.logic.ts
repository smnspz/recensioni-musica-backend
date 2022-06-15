import * as helpers from "../utils/helpers.js";

export const canUserModifyReview = (
  token: string,
  authorId: number
): Boolean => {
  const userId = helpers.getJsonFromJWT(token).id;
  return userId === authorId;
};
