export interface ChatProps {
  id: number;
  name: string;
  profile: string | null;
  lastMessage: string;
  lastMessageDate: string;
  members: Array<{
    id: number;
    name: string;
  }>;
  is_private: boolean;
}
