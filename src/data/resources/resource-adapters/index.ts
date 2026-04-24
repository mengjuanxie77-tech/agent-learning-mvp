import type { LearningResourceEntity } from "../../../types/content";
import type { ResourceImportCandidate } from "../resource-types";

export interface ResourceAdapter {
  provider: string;
  importCandidates: () => Promise<ResourceImportCandidate[]>;
  toResourceEntity: (candidate: ResourceImportCandidate) => LearningResourceEntity;
}

export const adapterRegistry: ResourceAdapter[] = [];
