import JobModel from "../model/jobs.model.js";
export default class JobController{

    getLandingPage(req, res){
        const user = req.session.user;
        res.render('landing-page', { user })
    }
    getPostJob(req, res){
        const user = req.session.user;
        res.render('post-newjob', { errors : null, user})
    }
    postPostJob(req, res) {
        JobModel.setJob(req.body,req.session.user);
        res.redirect("/jobs")
    }
    

    getAllJobs(req, res){
        const jobs = JobModel.getJob();
        const user = req.session.user;
        if(!jobs)return res.status(404).render('404',{ user });
        res.render('jobs', { jobs, user })
    }
    getSingleJob(req, res) {
        const id = req.params.id;
        const jobById = JobModel.getJobById(id);
        //console.log(jobById);
        const user = req.session.user;
        if (!jobById) return res.status(404).send("Job not Found");
        res.render('job-details', { jobById, user });
    }
    getAddApplicants(req, res){
        const id = req.params.id;
        const jobById = JobModel.getJobById(id);
        res.render('job-apply',{ jobById })
    }
    getUpdateJob(req, res){
        const id = req.params.id;
        const jobById = JobModel.getJobById(id);
        const user = req.session.user;
        if(!jobById) return res.status(404).send("Job not Found to update");
        res.render('update-job',{ job: jobById, errors: null, user});
    }
    postUpdatejob(req, res){
        const id = req.params.id;
        const data = req.body;
        JobModel.updateJob(id,data);
        res.redirect("/jobs")
    }
    deletejob(req, res){
        const id = req.params.id;
        const jobById = JobModel.getJobById(id);

        const user = req.session.user;
        if(!jobById) return res.status(404).send("Job not found to delete");
        const jobs = JobModel.getJob();
        JobModel.deleteJob(id);
        res.render('jobs', { jobs, user })
    }
    getApplicants(req, res){

    }
    postApplicants(req, res){

    }
    getRecruiterDashboard(req, res){

    }
}