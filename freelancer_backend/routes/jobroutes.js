import express from 'express';
import { addJob, applyJob, getAppliedjob, getallJob, getclientjob, getjobreq } from '../controllers/jobcontrollers.js';
import { verifyfreelancer } from '../middlewares/freelancerauth.js';
import { verifyclient } from '../middlewares/clientauth.js';

const router = express.Router()
router.post('/createjob',verifyclient,addJob)
router.get('/getallclientjob',verifyclient,getclientjob)
router.get('/getalljob',getallJob)
router.post('/applyjob',verifyfreelancer,applyJob)
router.get('/getappliedjob',verifyfreelancer,getAppliedjob)
router.get('/jobrequest',verifyclient,getjobreq)


export default router;
