import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AuthFormProps {
    title: string;
    description: string;
    fields: { id: string; label: string; input_type: string }[];
    buttonText: string;
    onSubmit: (data: Record<string, string>) => void;
}

export function AuthForm({ title, description, fields, buttonText, onSubmit }: AuthFormProps) {
    const [formData, setFormData] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card className="bg-black border-[#27272A]">
                {/* Card Header */}
                <CardHeader>
                    <CardTitle className="text-white">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>

                {/* Card Content */}
                <CardContent>
                    {fields.map((field) => (
                        <div key={field.id} className="space-y-1 mb-2">
                            <Label htmlFor={field.id} className="text-white">{field.label}</Label>
                            <Input
                                id={field.id}
                                type={field.input_type}
                                value={formData[field.id] || ""}
                                onChange={handleChange}
                                className="text-white"
                                required
                            />
                        </div>
                    ))}
                </CardContent>

                {/* Card Footer */}
                <CardFooter>
                    <Button type="submit">{buttonText}</Button>
                </CardFooter>
            </Card>
        </form>
    );
}
