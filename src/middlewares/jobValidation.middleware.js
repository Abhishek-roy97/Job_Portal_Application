import { body, validationResult } from "express-validator";
import JobModel from "../model/jobs.model.js";

export const jobValidation = async (req, res, next) => {
    const rules = [
        body('companyName').notEmpty().withMessage("Company Name is required"),
        body('jobLocation').notEmpty().withMessage("Job Location is required"),
        body('category').notEmpty().withMessage("Category field cannot be empty"),
        body('designation').notEmpty().withMessage("Designation field cannot be empty"),
        body('salary').notEmpty().withMessage("Salary is required"),
        body('openings').notEmpty().withMessage("Number of opening cannot be empty"),
        body('lastDate').notEmpty().withMessage("Last date to appy is required"),
        body('lastDate').isDate().withMessage("Last date format is not correct"),
    ]

    await Promise.all(rules.map(rule=> rule.run(req)));
    var errors = validationResult(req);

    if(!errors.isEmpty()){
        if(req.url === '/postjob'){
            return res.render('post-newjob',{ errors: errors.array()[0].msg });
        }
        if(req.path.startsWith('/update')){
            const id = req.params.id;
            const jobById = JobModel.getJobById(id);
            if(!jobById) return res.status(404).send('job not found to update');
            return res.render("update-job",{ job: jobById, errors: errors.array()[0].msg })

        }
    }
    next();
}