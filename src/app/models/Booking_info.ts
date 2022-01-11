import {Staff} from './Staff';

export class Booking_info {
  id: number;
  booking_id: number;
  staff_id: Staff[];
  Date: Date;
  from: string;
  to: string;
  deleted_at: Date;
  created_at: Date;
  upDated_at: Date;
}
