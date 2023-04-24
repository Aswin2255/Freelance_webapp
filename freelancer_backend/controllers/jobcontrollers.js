import jobmodel from "../models/jobmodel.js";
import jobreqmodel from "../models/jobrequestmodel.js";
import usermodel from "../models/usermodel.js";

export const addJob = async (req, res) => {
  try {
    const { title, desc, budget} = req.body.data.obj;
    const newjob = new jobmodel({
      jobtitle: title,
      jobdescription: desc,
      budget: budget,
     
      client: req.user,
    });
    const savedjob = await newjob.save();
    const updatedjob = await jobmodel
      .find({ client: req.user })
      .populate("client");
    res
      .status(201)
      .json({ status: true, data: updatedjob, msg: "job added succesfull" });
  } catch (error) {
    res.status(400).json({ status: false, msg: error.message });
  }
};

export const getclientjob = async (req, res) => {
  try {
    console.log('reached')
    const jobfind = await jobmodel
      .find({ client: req.user })
      .populate("client");
    res
      .status(200)
      .json({ status: true, data: jobfind, msg: "all job fetched" });
  } catch (error) {
    console.log(error)
    res.status(400).json({ status: false, msg: "unexpected error occured" });
  }
};
export const getallJob = async (req, res) => {
  try {
    const allJobs = await jobmodel.find().populate("client");
    res
      .status(200)
      .json({ status: true, data: allJobs, msg: "all job fetched" });
  } catch (error) {
    res.status(400).json({ status: false, msg: "unexpected error occured" });
  }
};

export const applyJob = async (req, res) => {
  try {
    const { link, message, jobid } = req.body.data;
    const isapplied = await jobreqmodel.find({
      $and: [{ jobid: jobid }, { userid: req.user }],
    });

    if (!isapplied.length) {
      let jobrequest = new jobreqmodel({
        link,
        message,
        userid: req.user,
        jobid,
      });
      const savedrequest = await jobrequest.save();
      const allaplied = await jobreqmodel.find({ userid: req.user });
      res
        .status(201)
        .json({ status: true, data: allaplied, msg: "job applied" });
    } else {
      res.status(401).json({ status: false, msg: "job already applied" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ status: false, msg: "unexpected error ocured" });
  }
};

export const getAppliedjob = async (req, res) => {
  try {
    const appliedjobs = await jobreqmodel.find({ userid: req.user });

    res
      .status(200)
      .json({ status: true, data: appliedjobs, msg: "job applied" });
  } catch (error) {
    res.status(401).json({ status: false, msg: "unexpected error ocured" });
  }
};
export const getjobreq = async (req, res) => {
  try {
    const alljobrequest = await jobreqmodel
      .find()
      .populate(["jobid", "userid"]);
    const clientrequest = alljobrequest.filter(
      (e) => e.jobid.client == req.user
    );
    res.status(200).json({
      status: true,
      data: clientrequest,
      msg: "fetched all requested jobs",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ status: false, msg: "unexpected error ocured" });
  }
};
