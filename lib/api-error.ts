import axios from "axios";

//nest js shape
export interface ApiError {
  message: string;
  error: string;
  statusCode: number;
}

export const getApiErrorMessage = (
  error: unknown,
): string => {
  if (axios.isAxiosError<ApiError>(error)) {
    return (
      error.response?.data?.message ??
      "Something went wrong."
    );
  }

  return "Something went wrong.";
};