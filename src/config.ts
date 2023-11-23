export interface WorkflowConfig {
  steps: StepConfig[];
}

export interface StepConfig {
  function: FunctionConfig;
}

export interface FunctionConfig {
  provider: ProviderConfig;
}

export interface ProviderConfig {}
