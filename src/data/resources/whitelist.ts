import type { LearningResourceEntity, ResourceWhitelistConfig } from "../../types/content";

export const resourceWhitelistConfig: ResourceWhitelistConfig = {
  articleDocDomains: [
    "openai.com",
    "platform.openai.com",
    "developers.openai.com",
    "anthropic.com",
    "docs.anthropic.com",
    "langchain.com",
    "docs.langchain.com",
    "github.com",
    "huggingface.co",
    "learn.microsoft.com",
    "cloud.google.com",
    "docs.llamaindex.ai",
    "deeplearning.ai",
    "infoq.com",
    "martinfowler.com"
  ],
  videoDomains: ["bilibili.com"],
  blockedVideoPlatforms: ["douyin.com", "xiaohongshu.com", "kuaishou.com"]
};

function matchesDomain(domain: string, whitelist: string[]): boolean {
  return whitelist.some(
    (allowedDomain) => domain === allowedDomain || domain.endsWith(`.${allowedDomain}`)
  );
}

export function isResourceWhitelistedByDomain(resource: LearningResourceEntity): boolean {
  if (resource.contentFormat === "video") {
    return matchesDomain(resource.domain, resourceWhitelistConfig.videoDomains);
  }

  return matchesDomain(resource.domain, resourceWhitelistConfig.articleDocDomains);
}
