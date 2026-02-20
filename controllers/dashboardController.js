import Job from '../models/Job.js';

export const getDashboard = async (req, res) => {
  try {
    const stats = await Job.aggregate([
      {
        $match: { user: req.user._id },
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const formattedStats = {
      total: 0,
      applied: 0,
      interviewing: 0,
      offered: 0,
      rejected: 0,
    };

    stats.forEach((item) => {
      formattedStats.total += item.count;
      const key = item._id.toLowerCase();
      formattedStats[key] = item.count;
    });

    return res.json(formattedStats);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const getMonthlyApplications = async (req, res) => {
  try {
    const monthlyApplications = await Job.aggregate([
      {
        $match: { user: req.user._id },
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
    ]);

    const formatted = monthlyApplications.map((item) => {
      const date = new Date(item._id.year, item._id.month - 1);
      const month = date.toLocaleDateString('default', {
        month: 'short',
        year: 'numeric',
      });
      return { month, count: item.count };
    });

    return res.json(formatted);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getConversionStats = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user._id });

    const total = jobs.length;
    const interview = jobs.filter((job) => job.status === 'Interviewing').length;
    const offer = jobs.filter((job) => job.status === 'Offered').length;

    const interviewRate = total > 0 ? ((interview / total) * 100).toFixed(2) : 0;
    const offerRate = total > 0 ? ((offer / total) * 100).toFixed(2) : 0;

    return res.json({
      totalApplications: total,
      interviewRate: `${interviewRate}%`,
      offerRate: `${offerRate}%`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
