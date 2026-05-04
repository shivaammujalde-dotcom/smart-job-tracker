import { Inbox } from "lucide-react";

export default function EmptyState({
    title = "No Data Found",
    description = "Try adding new data.",
}){
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">

            {/* Icon */}
            <div className="bg-gray-200 dark:bg-gray-800 p-5 rounded-b-full mb-5">
                <Inbox size={40}
                className="text-gray-500"/>
            </div>

{/* title */}
<h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
    {title}
</h2>

{/* Description */}
<p className="text-gray-500 mt-2 max-w-md">
    {description}
</p>
        </div>
    )
}