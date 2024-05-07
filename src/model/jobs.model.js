export default class JobModel{
    constructor(id,
        companyName,
        jobLocation,
        category,
        designation,
        salary,
        openings,
        lastDate,
        skills,
        jobPostedDate,
        applicants,
        recruiter,
        recruiterEmail){
            this.id = id;
            this.companyName = companyName;
            this.jobLocation = jobLocation;
            this.category = category;
            this.designation = designation;
            this.salary = salary;
            this.openings = openings;
            this.lastDate = lastDate;
            this.skills = skills;
            this.jobPostedDate = jobPostedDate;
            this.applicants = applicants;
            this.recruiter = recruiter;
            this.recruiterEmail = recruiterEmail;
        }
        static getJob(){
            return job_details;
        }
        static setJob(data, recruiterDetails) {
            const {
                companyName,
                jobLocation,
                category,
                designation,
                salary,
                openings,
                lastDate,
                skills } = data;
            const id = job_details.length + 1;
            const skillArray = skills.split(",");
            const currentDate = new Date();
            const postedDate = currentDate.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' });
            const applicants = [];
            const { userName: recruiter, userEmail: recruiterEmail } = recruiterDetails;
            const newJob = new JobModel(
                id,
                companyName,
                jobLocation,
                category,
                designation,
                salary,
                openings,
                lastDate,
                skillArray,
                postedDate,
                applicants,
                recruiter,
                recruiterEmail,
            );
    
            job_details.push(newJob);
            //console.log(newJob);
            // console.log(job_details);
        }
        static getJobById(id) {
            
            return job_details.find((job) => { return job.id == id});
            // console.log(data)
            // if (!data) {
            //     console.log("Error :: getJobById");
            //     return null;
            // }
            // return data;
        }
        static updateJob(id, {
            companyName,
        jobLocation,
        category,
        designation,
        salary,
        openings,
        lastDate,
        skills
        }){
            const skillArray = skills.split(",");
            const currentDate = new Date();
            const postedDate = currentDate.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit'});
            const jobIndex = job_details.findIndex( (job) => job.id == id);
            console.log(job_details[jobIndex])

            job_details[jobIndex] = {
                ...job_details[jobIndex],
                companyName,
                jobLocation,
                category,
                designation,
                salary,
                openings,
                lastDate,
                skills: skillArray,
                postedDate,
            }
            console.log(job_details[jobIndex])
        }

        static deleteJob(id){
            const index = job_details.findIndex((job) => { job.id == id });
            job_details.splice(index, 1);
        }
}

const job_details = [
    {
        id: '1',
        companyName: 'Google',
        jobLocation: 'Mumbai',
        category: 'Tech',
        designation: 'AI/ML',
        salary: '250000',
        openings: '4',
        lastDate: '2024-05-31',
        skills: ["LLM", "Python", "Big Data"],
        postedDate: '20/01/2024',
        applicants: [],
        companyImage: 'google.svg',
        recruiter: "Abhishek",
        recruiterEmail: "royabhishek61097@gmail.com",
    },
    {
        id: '2',
        companyName: 'Accenture',
        jobLocation: 'Pune',
        category: 'Non-Tech',
        designation: 'HR',
        salary: '100000',
        openings: '4',
        lastDate: '2024-02-11',
        skills: ["Communication", "Leadership"],
        postedDate: '20/01/2024',
        applicants: [],
        companyImage: 'accenture.svg',
        recruiter: "Abhishek",
        recruiterEmail: "royabhishek61097@gmail.com",
    },
    {
        id: '3',
        companyName: 'Microsoft',
        jobLocation: 'Hyderabad',
        category: 'Tech',
        designation: 'DevOps',
        salary: '150000',
        openings: '3',
        lastDate: '2024-02-21',
        skills: ["Docker", "Kubernetes", "GitHub"],
        postedDate: '20/01/2024',
        applicants: [],
        companyImage: 'microsoft.svg',
        recruiter: "Abhishek",
        recruiterEmail: "royabhishek61097@gmail.com",
    },
    {
        id: '4',
        companyName: 'Paytm',
        jobLocation: 'Bengaluru',
        category: 'Tech',
        designation: 'SDE-1',
        salary: '50000',
        openings: '12',
        lastDate: '2024-01-17',
        skills: ["React", "NodeJS", "MongoDB", "DevOps"],
        postedDate: '20/01/2024',
        applicants: [],
        companyImage: 'paytm.svg',
        recruiter: "Abhishek",
        recruiterEmail: "royabhishek61097@gmail.com",
    },
]