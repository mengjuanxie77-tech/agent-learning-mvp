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
    "developers.llamaindex.ai",
    "deeplearning.ai",
    "infoq.com",
    "martinfowler.com",
    "lilianweng.github.io",
    "huyenchip.com",
    "simonwillison.net",
    "eugeneyan.com",
    "thoughtworks.com",
    "academy.local"
  ],
  restrictedDomains: ["mp.weixin.qq.com"],
  videoDomains: ["bilibili.com"],
  blockedVideoPlatforms: ["douyin.com", "xiaohongshu.com", "kuaishou.com"],
  approvedAuthors: [
    "Lilian Weng",
    "Chip Huyen",
    "Simon Willison",
    "Eugene Yan",
    "Martin Fowler"
  ],
  approvedOrganizations: [
    "OpenAI",
    "Anthropic",
    "LangChain",
    "LlamaIndex",
    "Microsoft",
    "Thoughtworks",
    "AI Agent Academy"
  ],
  manuallyApprovedUrls: []
};

function matchesDomain(domain: string, whitelist: string[]): boolean {
  return whitelist.some(
    (allowedDomain) => domain === allowedDomain || domain.endsWith(`.${allowedDomain}`)
  );
}

export function isResourceWhitelistedByDomain(resource: LearningResourceEntity): boolean {
  if (resourceWhitelistConfig.manuallyApprovedUrls.includes(resource.url)) {
    return true;
  }

  if (matchesDomain(resource.domain, resourceWhitelistConfig.restrictedDomains)) {
    return false;
  }

  if (resource.contentFormat === "video") {
    return matchesDomain(resource.domain, resourceWhitelistConfig.videoDomains);
  }

  return matchesDomain(resource.domain, resourceWhitelistConfig.articleDocDomains);
}
