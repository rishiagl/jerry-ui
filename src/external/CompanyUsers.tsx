import { CompanyUsersType } from "../components/Company";

export async function getCompanyByUserEmail(user_email: string): Promise<CompanyUsersType[]> {
  let companyUsersList: CompanyUsersType[] = [];
  const companyUsers_api_url: string = import.meta.env.VITE_REST_API_SERVER_URL + "/company-users/byEmail?user_email=" + user_email;
  await fetch(companyUsers_api_url)
    .then((res) => res.json())
    .then((json) => {
      companyUsersList = json;
    });
  return companyUsersList;
}

export function addNewCompanyUsers(CompanyUsers: CompanyUsersType) {
  const CompanyUsers_api_url = import.meta.env.VITE_REST_API_SERVER_URL + "/CompanyUsers";
  fetch(CompanyUsers_api_url, {
    method: "POST",
    body: JSON.stringify(CompanyUsers),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
}
