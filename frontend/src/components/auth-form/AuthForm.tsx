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
  

interface AuthFormProps {
    title: string;
    description: string;
    fields: { id: string; label: string, input_type: string, }[];
    buttonText: string;
}
  
export function AuthForm({ title, description, fields, buttonText }: AuthFormProps) {

    return (

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
                    <Input id={field.id} type={field.input_type} defaultValue="" className="text-white"/>
                </div>
                ))}
            </CardContent>
        
            {/* Card Footer */}
            <CardFooter>
                <Button>{buttonText}</Button>
            </CardFooter>
        
        </Card>
    
    );

}