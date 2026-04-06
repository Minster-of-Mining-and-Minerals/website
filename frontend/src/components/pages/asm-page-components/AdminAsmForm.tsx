"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useGetASMsQuery, useCreateASMMutation, useUpdateASMMutation } from "@/redux/api/asmApi";
import { AdminAsmObjectivesPanel } from "./AdminAsmObjectivesPanel";
import { AdminAsmAttachmentsPanel } from "./AdminAsmAttachmentsPanel";
import { AdminAsmPreviewsPanel } from "./AdminAsmPreviewsPanel";
import { ASMObjective, ASMAttachment, ASMPreview, CreateASMPayload } from "@/redux/types/asm";

export default function AdminAsmForm() {
    const { data: asmRecords, isLoading: isFetching } = useGetASMsQuery();
    const [createASM, { isLoading: isCreating }] = useCreateASMMutation();
    const [updateASM, { isLoading: isUpdating }] = useUpdateASMMutation();

    const [asmId, setAsmId] = useState<string | null>(null);

    const [attachments, setAttachments] = useState<ASMAttachment[]>([]);
    const [headlines, setHeadlines] = useState<ASMObjective[]>([]);
    const [strategicObjective, setStrategicObjective] = useState<ASMObjective[]>([]);
    const [economicImpact, setEconomicImpact] = useState<ASMObjective[]>([]);
    const [impactContribution, setImpactContribution] = useState<ASMObjective[]>([]);
    const [strategicPillars, setStrategicPillars] = useState<ASMObjective[]>([]);
    const [keyInitiatives, setKeyInitiatives] = useState<ASMObjective[]>([]);
    const [objectives, setObjectives] = useState<ASMObjective[]>([]);
    const [previews, setPreviews] = useState<ASMPreview[]>([]);

    useEffect(() => {
        if (asmRecords && asmRecords.length > 0) {
            const asm = asmRecords[0];
            setAsmId(asm.asm_id);
            setAttachments(
                (asm.attachments || []).map((a: any) => ({
                    attachment_id: a.attachment_id || a.attachment?.attachment_id,
                    label: a.label || "Document",
                }))
            );
            setHeadlines(asm.headlines || []);
            setStrategicObjective(asm.strategic_objective || []);
            setEconomicImpact(asm.economic_impact || []);
            setImpactContribution(asm.impact_contribution || []);
            setStrategicPillars(asm.strategic_pillars || []);
            setKeyInitiatives(asm.key_initiatives || []);
            setObjectives(asm.objectives || []);
            setPreviews(
                (asm.previews || []).map((p: any) => ({
                    preview_id: p.preview_id,
                    icon: p.icon || "",
                    title: p.title || "",
                    description: p.description || "",
                    attachment_id: p.attachment_id || p.attachment?.attachment_id || "",
                }))
            );
        } else {
            setAsmId(null);
            setAttachments([]);
            setHeadlines([]);
            setStrategicObjective([]);
            setEconomicImpact([]);
            setImpactContribution([]);
            setStrategicPillars([]);
            setKeyInitiatives([]);
            setObjectives([]);
            setPreviews([]);
        }
    }, [asmRecords]);

    const handleSave = async () => {
        const validAttachments = attachments.filter(a => a.attachment_id && a.label);
        const validPreviews = previews.filter(p => p.title);

        const payload: CreateASMPayload = {
            attachments: validAttachments,
            headlines,
            strategic_objective: strategicObjective,
            economic_impact: economicImpact,
            impact_contribution: impactContribution,
            strategic_pillars: strategicPillars,
            key_initiatives: keyInitiatives,
            objectives,
            previews: validPreviews,
        };

        try {
            if (asmId) {
                await updateASM({ id: asmId, data: payload }).unwrap();
                toast.success("ASM updated successfully");
            } else {
                await createASM(payload).unwrap();
                toast.success("ASM created successfully");
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to save ASM");
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
                    <h1 className="text-2xl font-bold text-[#073954]">Artisanal Mining CMS</h1>
                    <p className="text-gray-500 text-lg">
                        Manage all contents for the Artisanal and Small-scale Mining public page.
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
                    {asmId ? "Update Content" : "Save Content"}
                </Button>
            </div>

            <Card className="border-none shadow-sm">
                <CardContent className="p-0 pt-2">
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent justify-start mb-6 border-b border-gray-200 pb-2">
                            {[
                                { value: "overview", label: "Headlines" },
                                { value: "economic", label: "Economic Impact" },
                                { value: "strategy", label: "Strategic Objectives" },
                                { value: "initiatives", label: "Key Initiatives" },
                                { value: "objectives", label: "Objectives" },
                                { value: "previews", label: "Previews" },
                                { value: "links", label: "Attachments" }
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
                                <AdminAsmObjectivesPanel
                                    title="Headlines"
                                    objectives={headlines}
                                    onChange={setHeadlines}
                                    maxItems={1}
                                    hideFootnote
                                />
                            </TabsContent>

                            <TabsContent value="economic">
                                <div className="space-y-12">
                                    <AdminAsmObjectivesPanel
                                        title="Economic Impact Data"
                                        objectives={economicImpact}
                                        onChange={setEconomicImpact}
                                        maxItems={1}
                                        hideDescription
                                        hideContent
                                    />
                                    <div className="border-t border-slate-200 pt-6">
                                        <AdminAsmObjectivesPanel
                                            title="Impact Contribution"
                                            objectives={impactContribution}
                                            onChange={setImpactContribution}
                                            hideContent
                                            hideFootnote
                                        />
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="strategy">
                                <div className="space-y-12">
                                    <AdminAsmObjectivesPanel
                                        title="Strategic Objective"
                                        objectives={strategicObjective}
                                        onChange={setStrategicObjective}
                                        maxItems={1}
                                        hideIcon
                                        hideContent
                                        hideFootnote
                                    />
                                    <div className="border-t border-slate-200 pt-6">
                                        <AdminAsmObjectivesPanel
                                            title="Strategic Pillars"
                                            objectives={strategicPillars}
                                            onChange={setStrategicPillars}
                                            hideContent
                                            hideFootnote
                                        />
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="initiatives">
                                <AdminAsmObjectivesPanel
                                    title="Key Initiatives"
                                    objectives={keyInitiatives}
                                    onChange={setKeyInitiatives}
                                    hideContent
                                    hideFootnote
                                />
                            </TabsContent>

                            <TabsContent value="objectives">
                                <AdminAsmObjectivesPanel
                                    title="General Objectives"
                                    objectives={objectives}
                                    onChange={setObjectives}
                                    hideContent
                                    hideFootnote
                                />
                            </TabsContent>

                            <TabsContent value="previews">
                                <AdminAsmPreviewsPanel
                                    previews={previews}
                                    onChange={setPreviews}
                                />
                            </TabsContent>

                            <TabsContent value="links">
                                <AdminAsmAttachmentsPanel
                                    attachments={attachments}
                                    onChange={setAttachments}
                                />
                            </TabsContent>
                        </div>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
