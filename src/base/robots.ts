/**
 * AI training crawlers that are disallowed in robots.txt.
 *
 * These scrape content to train models and send no traffic back.
 * Search / user-triggered fetchers (OAI-SearchBot, ChatGPT-User,
 * Claude-SearchBot, Claude-User, PerplexityBot) are intentionally
 * NOT listed: they cite pages and bring visitors.
 *
 * Google-Extended and Applebot-Extended have no user agent of their own,
 * so robots.txt is the only way to opt out of them.
 *
 * The same list (minus the robots-only tokens) is also enforced in
 * nginx/ournet.conf for crawlers that ignore robots.txt.
 */
export const AI_TRAINING_BOTS = [
  "GPTBot",
  "ClaudeBot",
  "anthropic-ai",
  "CCBot",
  "Google-Extended",
  "Applebot-Extended",
  "Bytespider",
  "meta-externalagent",
  "FacebookBot",
  "Amazonbot",
  "PetalBot",
  "Diffbot",
  "omgili",
  "ImagesiftBot",
  "Timpibot",
  "cohere-ai",
  "YouBot"
];

/** robots.txt block that disallows everything for AI training crawlers. */
export const AI_TRAINING_BOTS_ROBOTS = AI_TRAINING_BOTS.map(
  bot => `User-agent: ${bot}\nDisallow: /\n`
).join("\n");
