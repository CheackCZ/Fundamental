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
        
            {/* Card Header */}
            <CardHeader className="card-header">
                <img src={image} alt={title}/>
                <CardTitle className="card-title">{title}</CardTitle>
            </CardHeader>
        
            {/* Card Content */}
            <CardContent>
                <CardDescription className="card-content">{content}</CardDescription>
            </CardContent>
        
        </Card>
    
    );

}

export default InfoCard;