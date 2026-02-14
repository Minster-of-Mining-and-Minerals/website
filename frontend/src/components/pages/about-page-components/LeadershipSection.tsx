import { leadershipTree } from "@/datas/leadership";
import HierarchyNode from "./HierarchyNode";

export default function LeadershipSection() {
    return (
        <div className="min-h-screen bg-gray-200 py-12 md:px-4 space-y-4">
            <div className="max-w-7xl mx-auto text-center">
                <h1 className="md:text-4xl text-2xl mb-10 font-bold text-teal-900">
                    <span className="text-golden-dark">Minister</span> of Mines
                </h1>
                {/* <p className="text-gray-600 mt-2">
                    Interactive organizational hierarchy
                </p> */}
            </div>

            <HierarchyNode node={leadershipTree} />

        </div>
    );
}
