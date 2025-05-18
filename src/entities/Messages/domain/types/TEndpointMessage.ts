export type TEndpointMessage = {
  id: number;
  sender_id: number;
  recipient_id: number;
  content: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};
