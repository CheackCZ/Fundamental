import { AuthForm } from "@/components/auth-form/AuthForm"; 

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

import logoLight from '@/assets/img/logo/Logo-light.png';

import './Login.css';


function Login() {

    return (

        <div className="login-content">

            {/* Brand container */}
            <div className="brand-container">
                <img src={logoLight} alt="logo-light" />
                <p>Your market’s bestfriend.</p>
            </div>

            {/* Form container */}
            <div className="form-container">

                <Tabs defaultValue="login" className="w-[400px]">
                    
                    {/* Tabs */}
                    <TabsList className="grid w-full grid-cols-2 bg-[#27272A]">

                        <TabsTrigger 
                            className="bg-[#27272A] data-[state=active]:bg-black data-[state=active]:text-white focus:ring-0 focus:outline-none" 
                            value="login">
                                Login
                        </TabsTrigger>
                        
                        <TabsTrigger 
                            className="bg-[#27272A] data-[state=active]:bg-black data-[state=active]:text-white focus:ring-0 focus:outline-none" 
                            value="signin">
                                Sign In
                        </TabsTrigger>
                    
                    </TabsList>

                    {/* Login Tab */}
                    <TabsContent value="login">
                        <AuthForm
                            title="Login"
                            description="Enter your email and password to login successfully."
                            fields={[
                                { id: "email", label: "Email", input_type: "email" },
                                { id: "password", label: "Password", input_type: "password" },
                            ]}
                            buttonText="Login"
                        />
                    </TabsContent>

                    {/* Sign In Tab */}
                    <TabsContent value="signin">
                        <AuthForm
                            title="Sign In"
                            description="Enter your email, password, and confirm your password to sign up."
                            fields={[
                                { id: "email", label: "Email", input_type: "email" },
                                { id: "password", label: "Password", input_type: "password" },
                                { id: "repeat-password", label: "Repeat Password", input_type: "password" },
                            ]}
                            buttonText="Sign Up"
                        />
                    </TabsContent>
                
                </Tabs>

            </div>

        </div>

    );

}

export default Login;