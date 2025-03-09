export interface MACHINE {
  machine_name:
    | "DS_L1_A"
    | "DS_M1_A"
    | "DS_M2_A"
    | "DS_S1_A"
    | "PHARMA_CONT_A"
    | "PHARMA_CONT_B"
    | "REF_L1_A"
    | "REF_L1_B"
    | "REF_M1_A"
    | "REF_M1_B"
    | "REF_S1_A"
    | "REF_S1_B"
    | "REF_25KG_A";

  machine_type: "DS" | "REF";
  id: string;
  machine_grade: "L1" | "M1" | "M2" | "S1";
  bagSize: "25kg" | "50kg";
}

export interface QUALITY {
  tag_name:
    | "DS_L1"
    | "DS_M1"
    | "DS_M2"
    | "DS_S1"
    | "PHARMA_CONT"
    | "PHARMA_CONT"
    | "REF_L1"
    | "REF_L1"
    | "REF_M1"
    | "REF_M1"
    | "REF_S1"
    | "REF_S1"
    | "REF_25KG";
  id: string;
  counter_reading: number;
  calculated_quantity_quintal: number;
  last_approved_quantity: string;
  qa_approved_quantity: string;
  calculated_quality_last_reading_time: string;
  qa_approved_quality_last_approved_time: string;
  approved_by: string;
  icumsa: string;
  temprature: string;
  moisture: string;
  retention: string;
  approved: boolean;
}

export interface MainQuality extends QUALITY {
  tag_name:
    | "DS_L1"
    | "DS_M1"
    | "DS_M2"
    | "DS_S1"
    | "PHARMA_CONT"
    | "PHARMA_CONT"
    | "REF_L1"
    | "REF_L1"
    | "REF_M1"
    | "REF_M1"
    | "REF_S1"
    | "REF_S1"
    | "REF_25KG";
  subQualities: SUBQUALITY[];
}
export interface SUBQUALITY extends QUALITY {
  tagName:
    | "DS_L1_A"
    | "DS_M1_A"
    | "DS_M2_A"
    | "DS_S1_A"
    | "PHARMA_CONT_A"
    | "PHARMA_CONT_B"
    | "REF_L1_A"
    | "REF_L1_B"
    | "REF_M1_A"
    | "REF_M1_B"
    | "REF_S1_A"
    | "REF_S1_B"
    | "REF_25KG_A";
}

type USER = {
  id: number;
  fullName: string | null;
  email: string;
  community: string | null;
  phone: string | null;
  profileType: string | null;
  firstLogin: boolean;
  userEmailVerified: boolean;
};
