import Job from '../models/Job.js';

export const createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      user: req.user._id,
    });
    return res.status(201).json(job);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user._id });
    return res.json(jobs);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job || job.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.json(updatedJob);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job || job.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Job not found' });
    }

    await job.deleteOne();
    return res.json({ message: 'Job removed' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};
