export const REDDIT_DATA_SOURCE = process.env.REDDIT_DATA_SOURCE || 'mock';

// As per current Reddit Developer Policy (2026), OAuth tokens require registration.
export const REDDIT_CLIENT_ID = process.env.REDDIT_CLIENT_ID;
export const REDDIT_CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;
export const REDDIT_USERNAME = process.env.REDDIT_USERNAME;
export const REDDIT_PASSWORD = process.env.REDDIT_PASSWORD;
export const REDDIT_USER_AGENT = process.env.REDDIT_USER_AGENT || 'web:secureid-identity-access:v1.0.0 (by /u/YOUR_USERNAME)';

export function isMockMode() {
  return REDDIT_DATA_SOURCE === 'mock';
}
