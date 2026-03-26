"use client";

import * as LucideIcons from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Command,
    CommandInput,
} from "@/components/ui/command";

interface IconPickerProps {
    value?: string;
    onChange: (iconName: string) => void;
}

export function LucideIconPicker({ value, onChange }: IconPickerProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const icons = useMemo(() => {
        return Object.keys(LucideIcons)
            .filter(
                (name) =>
                    name !== "default" &&
                    name.toLowerCase().includes(search.toLowerCase())
            )
            .slice(0, 150);
    }, [search]);

    const SelectedIcon =
        value && (LucideIcons as any)[value]
            ? (LucideIcons as any)[value]
            : null;

    return (
        <>
            {/* FIELD */}
            <Button
                type="button"
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => setOpen(true)}
            >
                {SelectedIcon ? (
                    <>
                        <div className="flex items-center justify-between w-full gap-2">
                            <div className="flex items-center gap-2">
                                <SelectedIcon className="w-4 h-4" />
                                <span className="text-sm">{value}</span>
                            </div>
                            <LucideIcons.Plus className="w-4 h-4" />
                        </div>
                    </>
                ) : (
                    <span className="text-muted-foreground text-sm">
                        Select an icon
                    </span>
                )}
            </Button>

            {/* MODAL */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Select an Icon</DialogTitle>
                    </DialogHeader>

                    <Command>
                        <CommandInput
                            placeholder="Search icon (file, map, shield...)"
                            value={search}
                            onValueChange={setSearch}
                        />

                        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 max-h-[420px] overflow-y-auto hide-scrollbar mt-4">
                            {icons.map((iconName) => {
                                const Icon = (LucideIcons as any)[iconName];
                                const isSelected = iconName === value;

                                return (
                                    <button
                                        key={iconName}
                                        type="button"
                                        title={iconName}
                                        onClick={() => {
                                            onChange(iconName);
                                            setOpen(false);
                                        }}
                                        className={`
                                            flex items-center justify-center
                                            h-10 w-10 rounded-md border
                                            transition
                                            hover:bg-muted
                                            ${isSelected ? "bg-muted border-primary" : "border-border"}
                                            `}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </button>
                                );
                            })}
                        </div>
                    </Command>
                </DialogContent>
            </Dialog>
        </>
    );
}