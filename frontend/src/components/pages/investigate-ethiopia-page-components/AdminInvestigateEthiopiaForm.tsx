"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
    useGetInvestigateEthiopiasQuery,
    useCreateInvestigateEthiopiaMutation,
    useUpdateInvestigateEthiopiaMutation
} from "@/redux/api/investigateEthiopiaApi";
import { InvestigationStrategy, InvestigationAction, CreateInvestigateEthiopiaPayload } from "@/redux/types/investigateEthiopia";

import { AdminInvestigationStrategyPanel } from "./AdminInvestigationStrategyPanel";
import { AdminInvestigationActionPanel } from "./AdminInvestigationActionPanel";

export default function AdminInvestigateEthiopiaForm() {
    const { data: records, isLoading: isFetching } = useGetInvestigateEthiopiasQuery();
    const [createData, { isLoading: isCreating }] = useCreateInvestigateEthiopiaMutation();
    const [updateData, { isLoading: isUpdating }] = useUpdateInvestigateEthiopiaMutation();

    const [id, setId] = useState<string | null>(null);

    const [headlines, setHeadlines] = useState<InvestigationStrategy[]>([]);
    const [strategicMinerals, setStrategicMinerals] = useState<InvestigationStrategy[]>([]);
    const [autonomy, setAutonomy] = useState<InvestigationStrategy[]>([]);
    const [autonomousInstitutions, setAutonomousInstitutions] = useState<InvestigationStrategy[]>([]);
    const [strategicPillars, setStrategicPillars] = useState<InvestigationStrategy[]>([]);
    const [ambition, setAmbition] = useState<InvestigationStrategy[]>([]);
    const [globalProclamation, setGlobalProclamation] = useState<InvestigationStrategy[]>([]);
    const [investigationAction, setInvestigationAction] = useState<InvestigationAction[]>([]);

    useEffect(() => {
        if (records && records.length > 0) {
            const data = records[0];
            setId(data.investigate_ethiopia_id);
            setHeadlines(data.headlines || []);
            setStrategicMinerals(data.strategic_minerals || []);
            setAutonomy(data.autonomy || []);
            setAutonomousInstitutions(data.autonomous_institutions || []);
            setStrategicPillars(data.strategic_pillars || []);
            setAmbition(data.ambition || []);
            setGlobalProclamation(data.global_proclamation || []);
            setInvestigationAction(data.investigation_action || []);
        } else {
            setId(null);
            setHeadlines([]);
            setStrategicMinerals([]);
            setAutonomy([]);
            setAutonomousInstitutions([]);
            setStrategicPillars([]);
            setAmbition([]);
            setGlobalProclamation([]);
            setInvestigationAction([]);
        }
    }, [records]);

    const handleSave = async () => {
        const payload: CreateInvestigateEthiopiaPayload = {
            headlines,
            strategic_minerals: strategicMinerals,
            autonomy,
            autonomous_institutions: autonomousInstitutions,
            strategic_pillars: strategicPillars,
            ambition,
            global_proclamation: globalProclamation,
            investigation_action: investigationAction,
        };

        try {
            if (id) {
                await updateData({ id: id, data: payload }).unwrap();
                toast.success("Investigate Ethiopia updated successfully");
            } else {
                await createData(payload).unwrap();
                toast.success("Investigate Ethiopia created successfully");
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to save content");
        }
    };

    const isLoading = isFetching || isCreating || isUpdating;

    if (isFetching) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-golden-dark" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold text-[#073954]">Investigate Ethiopia CMS</h1>
                    <p className="text-gray-500 text-lg">
                        Manage all contents for the Investigate Ethiopia public page.
                    </p>
                </div>
                <Button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="bg-golden-dark hover:bg-golden-darkHover px-6"
                >
                    {isLoading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                        <Save className="w-4 h-4 mr-2" />
                    )}
                    {id ? "Update Content" : "Save Content"}
                </Button>
            </div>

            <Card className="border-none shadow-sm">
                <CardContent className="p-0 pt-2">
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent justify-start mb-6 border-b border-gray-200 pb-2">
                            {[
                                { value: "overview", label: "Headlines" },
                                { value: "minerals", label: "Strategic Minerals" },
                                { value: "autonomy", label: "Autonomy" },
                                { value: "pillars", label: "Strategic Pillars" },
                                { value: "ambition", label: "Ambition" },
                                { value: "proclamation", label: "Global Proclamation" },
                                { value: "actions", label: "Actions" },
                            ].map((tab) => (
                                <TabsTrigger
                                    key={tab.value}
                                    value={tab.value}
                                    className="data-[state=active]:bg-golden-dark data-[state=active]:text-white bg-slate-100 rounded-md transition px-4 py-2"
                                >
                                    {tab.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        <div className="px-2">
                            <TabsContent value="overview">
                                <AdminInvestigationStrategyPanel
                                    title="Headlines"
                                    strategies={headlines}
                                    onChange={setHeadlines}
                                    maxItems={1}
                                    hideColors
                                    hideIcon
                                />
                            </TabsContent>

                            <TabsContent value="minerals">
                                <AdminInvestigationStrategyPanel
                                    title="Strategic Minerals"
                                    strategies={strategicMinerals}
                                    onChange={setStrategicMinerals}
                                    hideColors
                                    hideContent
                                    showTags
                                />
                            </TabsContent>

                            <TabsContent value="autonomy" className="space-y-12">
                                <AdminInvestigationStrategyPanel
                                    title="Autonomy Headline"
                                    strategies={autonomy}
                                    onChange={setAutonomy}
                                    maxItems={1}
                                    hideColors
                                    hideIcon
                                    hideDescription
                                    hideContent
                                />
                                
                                <div className="border-t border-gray-100 pt-8">
                                    <AdminInvestigationStrategyPanel
                                        title="Autonomous Institutions"
                                        strategies={autonomousInstitutions}
                                        onChange={setAutonomousInstitutions}
                                        hideColors
                                        hideContent
                                        showLink
                                    />
                                </div>
                            </TabsContent>

                            <TabsContent value="pillars">
                                <AdminInvestigationStrategyPanel
                                    title="Strategic Pillars"
                                    strategies={strategicPillars}
                                    onChange={setStrategicPillars}
                                    hideContent
                                />
                            </TabsContent>
                            
                            <TabsContent value="ambition">
                                <AdminInvestigationStrategyPanel
                                    title="Ambition"
                                    strategies={ambition}
                                    onChange={setAmbition}
                                    maxItems={1}
                                    hideColors
                                    hideContent
                                />
                            </TabsContent>

                            <TabsContent value="proclamation">
                                <AdminInvestigationStrategyPanel
                                    title="Global Proclamation"
                                    strategies={globalProclamation}
                                    onChange={setGlobalProclamation}
                                    hideIcon
                                    hideContent
                                    hideColors
                                    showAttachment
                                />
                            </TabsContent>

                            <TabsContent value="actions">
                                <AdminInvestigationActionPanel
                                    actions={investigationAction}
                                    onChange={setInvestigationAction}
                                />
                            </TabsContent>
                        </div>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
