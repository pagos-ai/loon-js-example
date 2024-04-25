export interface RtauCard {
  accountNumber: string;
  expiryYear: string;
  expiryMonth: string;
  metadata: string | null;
}

export interface RtauCardUpdated extends RtauCard {
  newAccountNumber: string | null;
  newExpiryYear: string | null;
  newExpiryMonth: string | null;
  responseCode: string | null;
  errorCode: string | null;
}

export interface RtauPayload {
  network: string;
  requestId: string;
  accountEncrypted: string;
  subMerchantId: string | null;
}

export interface RtauResponse {
  requestId: string;
  accountEncrypted: string;
}
