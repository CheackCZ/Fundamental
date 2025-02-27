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
    fields: { id: string; label: string }[];
    buttonText: string;
}
  
export function AuthForm({ title, description, fields, buttonText }: AuthFormProps) {

    return (

        <Card className="bg-black border-[#27272A]">
        
            <CardHeader>
                <CardTitle className="text-white">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
        
            <CardContent>
                {fields.map((field) => (
                <div key={field.id} className="space-y-1 mb-2">
                    <Label htmlFor={field.id} className="text-white">{field.label}</Label>
                    <Input id={field.id} defaultValue="" className="text-white"/>
                </div>
                ))}
            </CardContent>
        
            <CardFooter>
                <Button>{buttonText}</Button>
            </CardFooter>
        
        </Card>
    
    );

}