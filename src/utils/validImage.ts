export const isValidImageUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return !parsed.hostname.includes("google.com"); 
  } catch {
    return false;
  }
};