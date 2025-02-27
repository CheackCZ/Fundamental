import { Separator } from "@/components/ui/separator"

import './Footer.css'

function Footer () {

    return (
        <div className="footer-container">

            <div className="info-container">
                
                {/* Container with Contacts */}
                <div className="contact-container">
                    <h3>CONTACT</h3>
                    
                    {/* Contact information */}
                    <div className="contact-info">

                        <div className='contact-titles'>
                            <p>Email: </p>
                            <p>Social media: </p>
                        </div>

                        <div className="contact-values">
                            <a href="mailto: fundamental@ondrejfaltin.cz" target="_blank">fundamental@ondrejfaltin.cz</a>
                        
                            <ul>
                                <li><a href="https://www.linkedin.com/in/ond%C5%99ej-faltin-0522a1300/" target="_blank">Linkedin</a></li>
                                <li><a href="https://www.ondrejfaltin.cz/">Personal website</a></li>
                            </ul>
                        </div>
                            
                    </div>
                    

                </div>

                {/* Container with Support */}
                <div className="support-container">
                    <h3>SUPPORT</h3>

                    {/* Support information */}
                    <div className="support-info">
                        <p><a href="https://github.com/CheackCZ" target="_blank">GitHub</a></p>
                        <p><a href="https://github.com/CheackCZ/Fundamental/blob/main/README.md" target="_blank">Documentation</a></p>
                    </div>
                    
                </div>

            </div>
            
            {/* Copyright container  */}
            <div className="copyright-container">

                <Separator style={{ backgroundColor: "#1B1B1B" }}/>
                    <p>© 2025 Fundamental. All rights reserved.</p>
                <Separator style={{ backgroundColor: "#1B1B1B" }}/>
            
            </div>

        </div>
    );

}

export default Footer;