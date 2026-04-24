export type ResourceAdapterProvider = "manual" | "openai" | "anthropic" | "bilibili";

export interface ResourceImportCandidate {
  title: string;
  url: string;
  provider: ResourceAdapterProvider;
  topicTags: string[];
}
