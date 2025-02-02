export function regTokenPublicPart(regToken: string) {
  if (regToken.length < 16) {
    throw new Error("reg tokens should be 16 chars for now");
  }
  return regToken.slice(0, 8);
}

export function regTokenSecretPart(regToken: string) {
  if (regToken.length < 16) {
    throw new Error("reg tokens should be 16 chars for now");
  }
  return regToken.slice(8);
}

export function regTokenToEmail(regToken: string, stage: string) {
  return `scorebridge8+${stage}-clubDevice-${regTokenPublicPart(
    regToken,
  )}@gmail.com`;
}
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export function randomRegToken() {
  return Array.from({ length: 16 })
    .map(() => {
      return characters.charAt(Math.floor(Math.random() * characters.length));
    })
    .join("");
}
