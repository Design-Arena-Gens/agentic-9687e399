export type ToolReference = {
  name: string;
  url: string;
  description: string;
  cost: "free" | "freemium";
};

export type ModuleField = {
  label: string;
  value: string;
  notes?: string;
};

export type ModuleStep = {
  id: string;
  title: string;
  service: string;
  action: string;
  description: string;
  fields: ModuleField[];
  notes?: string;
};

export type WorkflowModule = {
  id: string;
  title: string;
  purpose: string;
  trigger: boolean;
  steps: ModuleStep[];
};

export type PostingSchedule = {
  timingLabel: string;
  timezone: string;
  recommendedSlots: string[];
  rationale: string;
};

export type WorkflowAsset = {
  type: "video" | "caption" | "schedule";
  description: string;
  format: string;
  delivery: string;
};

export type AutomationWorkflow = {
  title: string;
  narrative: string;
  goal: string;
  keyTools: ToolReference[];
  modules: WorkflowModule[];
  assets: WorkflowAsset[];
  posting: PostingSchedule;
  captionTemplate: {
    approach: string;
    prompt: string;
    structure: string[];
  };
  hashtags: {
    category: string;
    items: string[];
  }[];
};
