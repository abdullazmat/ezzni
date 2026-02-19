export interface UserInfo {
  name: string;
  id: string;
  avatar: string;
}

export interface Review {
  id: string;
  userType: 'Driver' | 'Passenger';
  userInfo: UserInfo;
  reviewDate: string;
  visible: boolean;
  isFlagged: boolean;
  rating: number;
  comment: string;
  tags: string[];
  status: 'Completed' | 'Pending';
}
