export type TEndpointMessage = {
  id: number;
  sender_id: string;
  recipient_id: string;
  content: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};
