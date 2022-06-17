import * as helpers from "../utils/helpers.js";

export const canUserModify = (
  token: string,
  entityToModifyId: number
): Boolean => {
  const userId = helpers.getJsonFromJWT(token).id;
  return userId === entityToModifyId;
};
