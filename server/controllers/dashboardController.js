import Job from "../models/Job.js";

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;
    const jobs = await Job.find({ user: userId }).select("status");

    const summary = {
      total: jobs.length,
      applied: 0,
      interviewing: 0,
      offered: 0,
      rejected: 0,
    };

    jobs.forEach((job) => {
      const status = job.status;
      if (status === "Applied") summary.applied += 1;
      if (status === "Interviewing" || status === "Interview") summary.interviewing += 1;
      if (status === "Offered" || status === "Hired") summary.offered += 1;
      if (status === "Rejected") summary.rejected += 1;
    });

    return res.status(200).json(summary);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getMonthlyApplications = async (req, res) => {
  try {
    const userId = req.user._id;

    const monthly = await Job.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    return res.status(200).json({ monthly });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getConversionStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const [total, offered, interviewing] = await Promise.all([
      Job.countDocuments({ user: userId }),
      Job.countDocuments({ user: userId, $or: [{ status: "Offered" }, { status: "Hired" }] }),
      Job.countDocuments({ user: userId, $or: [{ status: "Interviewing" }, { status: "Interview" }] }),
    ]);

    const offerRate = total ? Number(((offered / total) * 100).toFixed(2)) : 0;
    const interviewRate = total
      ? Number(((interviewing / total) * 100).toFixed(2))
      : 0;

    return res.status(200).json({
      total,
      offered,
      interviewing,
      offerRate,
      interviewRate,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
