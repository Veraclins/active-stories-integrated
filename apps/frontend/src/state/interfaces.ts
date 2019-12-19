export interface User {
  id: number;
  userRole: string;
  email: string;
  firstName?: string;
  lastName?: string;
}
export interface Story {
  id: number;
  summary: string;
  description: string;
  type: string;
  cost: number;
  complexity: string;
  estimatedHrs: number;
  status: string;
  createdBy: User;
}
