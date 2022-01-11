import {Parking} from './Parking';

export class Booking {
  id: number;
  full_name: string;
  company_name: string;
  postcode: string;
  contact: string;
  email: string;
  special_requirement: string;
  parking_id: Parking;
  other: string;
  status: number;
  deleted_at: Date;
  created_at: Date;
  upDated_at: Date;
}
