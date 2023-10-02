import { CompanyType } from "../components/Company";

export async function getCompany(): Promise<CompanyType[]> {
  let companyList: CompanyType[] = [];
  const company_api_url: string = import.meta.env.VITE_REST_API_SERVER_URL + "/company";
  await fetch(company_api_url)
    .then((res) => res.json())
    .then((json) => {
      companyList = json;
    });
  return companyList;
}

export async function getCompanyById(id: number): Promise<CompanyType[]> {
    let companyList: CompanyType[] = [];
    const company_api_url: string = import.meta.env.VITE_REST_API_SERVER_URL + "/company/" + id;
    await fetch(company_api_url)
      .then((res) => res.json())
      .then((json) => {
        companyList = json;
      });
    return companyList;
  }

export function addNewCompany(company: CompanyType) {
  const company_api_url = import.meta.env.VITE_REST_API_SERVER_URL + "/company";
  fetch(company_api_url, {
    method: "POST",
    body: JSON.stringify(company),
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
