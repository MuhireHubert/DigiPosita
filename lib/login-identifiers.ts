export function normalizeLoginAlias(value: string): string | null {
  const compact = value
    .trim()
    .toLowerCase()
    .replace(/[\s()-]/g, "");
  if (/^0[0-9]{9}$/.test(compact)) return `+250${compact.slice(1)}`;
  if (/^250[0-9]{9}$/.test(compact)) return `+${compact}`;
  if (/^\+250[0-9]{9}$/.test(compact)) return compact;
  return /^[a-z][a-z0-9._-]{2,39}$/.test(value.trim().toLowerCase())
    ? value.trim().toLowerCase()
    : null;
}
export function parseLoginAliases(source: string): Record<string, string> {
  const entries = JSON.parse(source) as unknown;
  if (!entries || typeof entries !== "object" || Array.isArray(entries))
    throw new Error("Invalid login configuration");
  const aliases: Record<string, string> = {};
  for (const [key, value] of Object.entries(entries)) {
    const alias = normalizeLoginAlias(key);
    if (!alias || typeof value !== "string" || !/^\S+@\S+\.\S+$/.test(value))
      throw new Error("Invalid login configuration");
    aliases[alias] = value.trim().toLowerCase();
  }
  return aliases;
}
export async function authenticateLoginAlias(
  identifier: string,
  password: string,
  aliases: Record<string, string>,
  apiKey: string,
  endpoint: string,
  fetcher: typeof fetch = fetch,
): Promise<{ email: string } | null> {
  const alias = normalizeLoginAlias(identifier);
  const email =
    alias && Object.prototype.hasOwnProperty.call(aliases, alias)
      ? aliases[alias]
      : null;
  if (!email) return null;
  const response = await fetcher(
    `${endpoint}/v1/accounts:signInWithPassword?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
      cache: "no-store",
    },
  );
  if (!response.ok) return null;
  const result = await response.json();
  return result.email?.toLowerCase() === email &&
    typeof result.idToken === "string"
    ? { email }
    : null;
}
