import { callExternalApi } from "./external-api";

const apiServerUrl = import.meta.env.VITE_API_SERVER_URL;

export const getPublicResource = async () => {
  const config = {
    url: `${apiServerUrl}/api/messages/public`,
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};

export const getCompany = async(accessToken) => {
  const config = {
    url: `${apiServerUrl}/company`,
    method: "GET",
    body: "",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return data
};

export const getCompanyById = async(accessToken, id) => {
  const config = {
    url: `${apiServerUrl}/company/${id}`,
    method: "GET",
    body: "",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data,
    error: error
  }
  }

export const addNewCompany = async(company) => {
  const config = {
    url: `${apiServerUrl}/company`,
    method: "POST",
    body: company,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return data
}
