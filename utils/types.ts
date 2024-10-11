export interface Story {
  id: string;
  title: string;
  url: string;
  score: number;
  summaryAudioDuration: number;
  summaryAudio: string;
  readableTime: string; // Added this field
}

export enum ResultCode {
  Success = "SUCCESS",
  UnknownError = "UNKNOWN_ERROR",
}

export interface Result {
  code: ResultCode;
  data: Story[];
}
