import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import "./InfoCard.css"; 


interface InfoCardProps {
    image: string;
    title: string;
    content: string;
}


const InfoCard: React.FC<InfoCardProps> = ({ image, title, content }) => {

    return (    

        <Card className="info-card">
        
            <CardHeader className="card-header">
                <img src={image} alt={title} className="card-icon" />
                <CardTitle className="card-title">{title}</CardTitle>
            </CardHeader>
        
            <CardContent>
                <CardDescription className="card-content">{content}</CardDescription>
            </CardContent>
        
        </Card>
    
    );

}

export default InfoCard;