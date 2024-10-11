export interface AgentProps {
  id: string;
  fullName?: string;
  agentCode: string;
  projectCodes?: CodeProjectProps[];
}
export interface DBAgentProps {
  fullName?: string;
  agentCode: string;
  projectCodes?: string[];
}
export interface AgentPropsFromDB {
  id: string;
  fullName?: string;
  agentCode: string;
  projectCodes?: string[];
}

export interface MultipleFormAgentProps {
  id: string;
  accountNumber: number;
  projectCodes?: CodeProjectProps[];
}

export interface CodeProjectProps {
  id: number;
  value: string;
}
