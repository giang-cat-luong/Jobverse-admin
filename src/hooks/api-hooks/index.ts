import { axiosFileUpload, axiosPrivate, axiosPublic } from "./../../lib/axios";
import type { AxiosError } from "axios";
import useSWR, { SWRConfiguration } from "swr";
import useSWRMutation from "swr/mutation";

// Public GET
export const usePublicFetch = <T>(url: string | null) => {
  return useSWR<T, AxiosError>(
    url,
    async (url: string) => (await axiosPublic.get<T>(url)).data,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
      errorRetryCount: 3,
    }
  );
};

// Public POST
export const usePublicPost = <T, D = unknown>(url: string) => {
  return useSWRMutation<T, AxiosError, string, D>(
    url,
    async (url, { arg }) => (await axiosPublic.post<T>(url, arg)).data
  );
};

// Public PUT
export const usePublicPut = <T, D = unknown>(url: string) => {
  return useSWRMutation<T, AxiosError, string, D>(
    url,
    async (url, { arg }) => (await axiosPublic.put<T>(url, arg)).data
  );
};

// Public DELETE
export const usePublicDelete = <T>(url: string) => {
  return useSWRMutation<T, AxiosError, string>(url, async (url: string) => {
    const response = await axiosPublic.delete<T>(url);
    return response.data;
  });
};

// Private GET
export const usePrivateFetch = <T>(url: string | null) => {
  return useSWR<T, AxiosError>(
    url,
    async (url: string) => (await axiosPrivate.get<T>(url)).data,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
      keepPreviousData: true,
    }
  );
};

// Private GET with params
export const usePrivateFetchParams = <T>(
  url: string | null,
  options?: SWRConfiguration
) => {
  const fetcher = async (url: string) => {
    const response = await axiosPrivate.get<T>(url);
    return response.data;
  };

  return useSWR<T, AxiosError>(
    url,
    url ? fetcher : null,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
      keepPreviousData: true,
      ...options,
    }
  );
};


// Private POST
export const usePrivatePost = <T, D = unknown>(url: string) => {
  return useSWRMutation<T, AxiosError, string, D>(
    url,
    async (url, { arg }) => (await axiosPrivate.post<T>(url, arg)).data
  );
};
export const usePrivateImagePost = <T, D = unknown>(url: string) => {
  return useSWRMutation<T, AxiosError, string, D>(
    url,
    async (url, { arg }) =>
      (
        await axiosFileUpload.post<T>(url, arg, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      ).data
  );
};
export const usePrivatePostParams = <T, D = unknown>() => {
  return useSWRMutation<T, AxiosError, string, { url: string; data: D }>(
    "dynamic-post", 
    async (_, { arg }) => (await axiosPrivate.post<T>(arg.url, arg.data)).data
  );
};


// Private PUT
export const usePrivatePut = <T, D = unknown>(url: string) => {
  return useSWRMutation<T, AxiosError, string, D>(
    url,
    async (url, { arg }) => (await axiosPrivate.put<T>(url, arg)).data
  );
};
export const usePrivatePutParams = <T, D = unknown>() => {
  return useSWRMutation<T, AxiosError, string, { url: string; data: D }>(
    "dynamic-post", // key hợp lệ, bắt buộc
    async (_, { arg }) => (await axiosPrivate.put<T>(arg.url, arg.data)).data
  );
};

// Private DELETE
export const usePrivateDelete = <T, D = unknown>(url: string) => {
  return useSWRMutation<T, AxiosError, string, D>(
    url,
    async (url, { arg }) =>
      (await axiosPrivate.delete<T>(url, { data: arg })).data
  );
};
export const usePrivateDeleteParams = <T, D = unknown>() => {
  return useSWRMutation<T, AxiosError, string, { url: string; data: D }>(
    "dynamic-delete", 
    async (_, { arg }) => (await axiosPrivate.delete<T>(arg.url, { data: arg.data })).data
  );
};


