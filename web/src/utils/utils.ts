export function getStaticFilePath(fileName: string, ext: string): string {
  return "http://localhost:3000" + `/images/icons/${fileName}.${ext}`;
}

export function validateUserName(
  username: string
): { valid: boolean; error: string } {
  return { valid: true, error: "" };
}
