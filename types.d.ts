type Message = {
    message:string;
    type: "HUMAN" | "AI";
}

// Define TableData interface to match the data structure returned from the API
interface TableData {
    work_year: string;
    experience_level: string;
    employment_type: string;
    job_title: string;
    salary: string;
    salary_currency: string;
    salary_in_usd: string;
    employee_residence: string;
    remote_ratio: string;
    company_location: string;
    company_size: string;
  }