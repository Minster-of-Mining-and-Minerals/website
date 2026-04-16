import MiningApplicationProcessForm from "@/features/sectors/mining/MiningApplicationProcessForm";
import React, { Suspense } from "react";

const CreateMiningApplicationProcessPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MiningApplicationProcessForm />
        </Suspense>
    );
};

export default CreateMiningApplicationProcessPage;
