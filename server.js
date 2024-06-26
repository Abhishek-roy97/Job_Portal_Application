import express, { urlencoded } from "express";
import path from 'path';
import ejsLayouts from "express-ejs-layouts";
import JobController from "./src/controller/job.controller.js";
import AuthController from "./src/controller/auth.controller.js";
import { userValidation } from "./src/middlewares/userValidation.middleware.js";
import { jobValidation } from "./src/middlewares/jobValidation.middleware.js";
import { setLastVisit } from "./src/middlewares/lastVisit.middleware.js"
import resumeUpload from "./src/middlewares/resumeUpload.middleware.js";

import session from "express-session";
import cookieParser from "cookie-parser";

const server = express();

server.use(cookieParser());

server.use(express.json());

server.set('view engine',"ejs");
server.set('views', path.resolve("src", "views"));
server.set("layout",path.resolve("src", "views","layout"));

server.use(express.static(path.resolve("src","public")));
server.use(urlencoded({ extended: true}));
server.use(ejsLayouts);

const authController = new AuthController();
const jobController = new JobController();


server.use(express.static('src/views'));

server.use(session({
    secret: 'Abhikey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

server.get('/register',authController.getSignUp);
server.get('/login',authController.getLogin);
server.post('/register',userValidation,authController.postSignUp);
server.post('/login',userValidation,authController.postSignIn);
server.get('/logout',authController.logout);


server.get('/',jobController.getLandingPage);
server.get('/jobs',jobController.getAllJobs);
server.get('/postjob',setLastVisit,jobController.getPostJob);
server.post('/postjob',jobValidation,jobController.postPostJob);

server.get('/jobs/:id',jobController.getSingleJob);
server.get("/dashboard",setLastVisit,jobController.getRecruiterDashboard)

server.get('/jobs/:id/apply',jobController.getAddApplicants);
server.post('/jobs/:id/apply',resumeUpload.single("applicantResume"),jobController.postApplicants)
server.get('/jobs/:id/applicants',setLastVisit,jobController.getApplicants);


server.get('/update/:id',setLastVisit,jobController.getUpdateJob);
server.post('/update/:id',jobValidation,jobController.postUpdatejob);

server.get('/deleteJob/:id',setLastVisit,jobController.deletejob);



//^ --Function to calculate remaining days for each jobs
// Assuming you have a function to calculate remaining days
function calculateRemainingDays(jobLastDate) {
    // Your implementation to calculate remaining days
    // For example:
    const lastDate = new Date(jobLastDate);
    const currentDate = new Date();
    const remainingDays = Math.ceil((lastDate - currentDate) / (1000 * 60 * 60 * 24));
    if(remainingDays<0){
        return 'ended';
    }
    return remainingDays;
}
  
  // Assuming you're using Express, make the function available to your templates
  server.locals.calculateRemainingDays = calculateRemainingDays;

server.listen(3600,()=>{
    console.log("server is running at 3600");
})