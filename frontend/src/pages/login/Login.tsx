import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "@/components/auth-form/AuthForm";
import { useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

import logoLight from '@/assets/img/logo/Logo-light.png';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { toast } = useToast();
    const [tab, setTab] = useState("login");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tabParam = params.get("tab");
        if (tabParam === "signin") setTab("signin");
    }, [location.search]);

    // 🔐 Handle login form submission
    const handleLogin = async (data: Record<string, string>) => {
        try {
            const response = await fetch("http://localhost:8000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                }),
            });
    
            if (!response.ok) {
                const err = await response.json();
                toast({
                    title: "Login failed",
                    description: err.detail,
                    variant: "destructive"
                });
                return;
            }
    
            const user = await response.json();
            console.log("Logged in user:", user);
    
            // Store user (optional)
            localStorage.setItem("user", JSON.stringify(user));
    
            // ✅ Navigate to dashboard
            navigate("/dashboard");
    
            toast({
                title: "Welcome!",
                description: "You have successfully logged in.",
            });

        } catch (error) {
            console.error("Login error:", error);
        }
    };

    // 🧾 Handle registration form submission
    const handleRegister = async (data: Record<string, string>) => {
        if (data.password !== data["repeat-password"]) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                }),
            });

            if (!response.ok) {
                const err = await response.json();
                toast({
                    title: "Registration failed",
                    description: err.detail,
                    variant: "destructive"
                });
                return;
            }

            const user = await response.json();
            console.log("Registered user:", user);
            // You can redirect or switch to login tab:
            setTab("login");

        } catch (error) {
            console.error("Register error:", error);
        }
    };

    return (
        <div className="login-content">
            {/* Brand container */}
            <div className="brand-container">
                <img src={logoLight} alt="logo-light" />
                <p>Your market’s bestfriend.</p>
            </div>

            {/* Form container */}
            <div className="form-container">
                <Tabs value={tab} onValueChange={setTab} className="w-[400px]">
                    {/* Tabs */}
                    <TabsList className="grid w-full grid-cols-2 bg-[#27272A]">
                        <TabsTrigger
                            className="bg-[#27272A] data-[state=active]:bg-black data-[state=active]:text-white focus:ring-0 focus:outline-none"
                            value="login"
                        >
                            Login
                        </TabsTrigger>

                        <TabsTrigger
                            className="bg-[#27272A] data-[state=active]:bg-black data-[state=active]:text-white focus:ring-0 focus:outline-none"
                            value="signin"
                        >
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
                            onSubmit={handleLogin}
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
                            onSubmit={handleRegister}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

export default Login;
