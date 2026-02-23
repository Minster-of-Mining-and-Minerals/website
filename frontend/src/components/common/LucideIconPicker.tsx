"use client";

import * as LucideIcons from "lucide-react";
import { useMemo, useState } from "react";
import { Command, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

interface IconPickerProps {
    value?: string;
    onChange: (iconName: string) => void;
}

export function LucideIconPicker({ value, onChange }: IconPickerProps) {
    const [search, setSearch] = useState("");

    const icons = useMemo(() => {
        return Object.keys(LucideIcons)
            .filter(
                (name) =>
                    name !== "default" &&
                    name.toLowerCase().includes(search.toLowerCase())
            )
            .slice(0, 100); // limit for performance
    }, [search]);

    const SelectedIcon =
        value && (LucideIcons as any)[value]
            ? (LucideIcons as any)[value]
            : null;

    return (
        <div className="space-y-2">
            {SelectedIcon && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <SelectedIcon className="w-5 h-5" />
                    <span>{value}</span>
                </div>
            )}

            <Command>
                <CommandInput
                    placeholder="Search icon (e.g. file, map, shield...)"
                    value={search}
                    onValueChange={setSearch}
                />
                <div className="h-[200px] overflow-y-auto">
                    <CommandList>
                        {icons.map((iconName) => {
                            const Icon = (LucideIcons as any)[iconName];
                            return (
                                <CommandItem
                                    key={iconName}
                                    value={iconName}
                                    onSelect={() => onChange(iconName)}
                                >
                                    <div className="flex items-center gap-2">
                                        <Icon className="w-4 h-4" />
                                        <span>{iconName}</span>
                                    </div>
                                </CommandItem>
                            );
                        })}
                    </CommandList>
                </div>
            </Command>
        </div>
    );
}