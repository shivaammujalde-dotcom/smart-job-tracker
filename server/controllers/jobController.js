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
    const { status, search, sort, page = 1, limit = 10 } = req.query;
    const queryObject = { user: req.user._id };

    if (status && status !== 'All') {
      queryObject.status = status;
    }

    if (search) {
      queryObject.$or = [
        { company: { $regex: search, $options: 'i' } },
        { role: { $regex: search, $options: 'i' } },
      ];
    }

    let result = Job.find(queryObject);

    if (sort === 'latest') {
      result = result.sort('-createdAt');
    } else if (sort === 'oldest') {
      result = result.sort('createdAt');
    } else if (sort === 'a-z') {
      result = result.sort('company');
    } else if (sort === 'z-a') {
      result = result.sort('-company');
    } else {
      result = result.sort('-createdAt');
    }

    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    result = result.skip(skip).limit(limitNumber);

    const jobs = await result;
    const totalJobs = await Job.countDocuments(queryObject);
    const totalPages = Math.ceil(totalJobs / limitNumber);

    return res.status(200).json({
      totalJobs,
      totalPages,
      page: pageNumber,
      jobs,
    });
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
      runValidators: true,
    });

    return res.status(200).json(updatedJob);
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
    return res.status(200).json({ message: 'Job removed' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};
