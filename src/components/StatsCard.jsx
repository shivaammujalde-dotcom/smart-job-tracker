import CountUp from "react-countup";
import { motion } from "framer-motion";

export default function StatsCard({ title, value, icon, color }) {
  const MotionDiv = motion.div;

  return (
    <MotionDiv
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex items-center justify-between"
    >
      <div>
        <h4 className="text-gray-500 dark:text-gray-300 text-sm">{title}</h4>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
          <CountUp end={value} duration={1.5} />
        </h2>
      </div>

      <div className={`p-4 rounded-full ${color}`}>{icon}</div>
    </MotionDiv>
  );
}
