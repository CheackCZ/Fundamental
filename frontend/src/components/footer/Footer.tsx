import { Separator } from "@/components/ui/separator"

import './Footer.css'

function Footer () {

    return (

        <div className="footer-container">

            <div className="footer-info-container">
                
                {/* Container with Contacts */}
                <div className="footer-contact-container">
                    <h3>CONTACT</h3>
                    
                    {/* Contact information */}
                    <div className="footer-contact-info">

                        <div className='footer-contact-titles'>
                            <p>Email: </p>
                            <p>Social media: </p>
                        </div>

                        <div className="footer-contact-values">
                            <a href="mailto: fundamental@ondrejfaltin.cz" target="_blank">fundamental@ondrejfaltin.cz</a>
                        
                            <ul>
                                <li><a href="https://www.linkedin.com/in/ond%C5%99ej-faltin-0522a1300/" target="_blank">Linkedin</a></li>
                                <li><a href="https://www.ondrejfaltin.cz/">Personal website</a></li>
                            </ul>
                        </div>
                            
                    </div>
                    
                </div>

                {/* Container with Support */}
                <div className="footer-support-container">
                    <h3>SUPPORT</h3>

                    {/* Support information */}
                    <div className="footer-support-info">
                        <p><a href="https://github.com/CheackCZ" target="_blank">GitHub</a></p>
                        <p><a href="https://github.com/CheackCZ/Fundamental/blob/main/README.md" target="_blank">Documentation</a></p>
                    </div>
                    
                </div>

            </div>
            
            {/* Copyright container  */}
            <div className="footer-copyright-container">

                <Separator style={{ backgroundColor: "#1B1B1B" }}/>
                    <p>© 2025 Fundamental. All rights reserved.</p>
                <Separator style={{ backgroundColor: "#1B1B1B" }}/>
            
            </div>

        </div>
    );

}

export default Footer;