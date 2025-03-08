import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import CircularProgress from "./CircularProgress";
import { LoginRequest } from "@/types/auth.type";
import { loginService } from "@/Services/auth.service";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { useNavigate } from "react-router-dom";

export default function Login({ type }: { type: string }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginRequest>(); // Provide the form data type here

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
    const { authorize, user } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            if(user.role==='manager')
            navigate(`/${user.role}/employees`);
            else
            navigate(`/${user.role}/dashboard`)
        }
    }, [user])


    const onSubmit: SubmitHandler<LoginRequest> = (data: LoginRequest) => {
        setLoading(true)
        loginService(data, type).then((res) => {
            const token = res || '' as string;
            const user = authorize(token, type);
            console.log(user);
            type === 'manager' ? navigate(`/${type}/employees`) : navigate(`/${type}/dashboard`)

        }).catch((err) => {

            console.log(err)
            toast?.showToast("Login Failed", err.response.data.detail, "error")
        }).finally(() => {
            setLoading(false)
        })
    };

    return (

        <Card className="w-[22rem] relative z-10">
            <CardHeader>
                <CardTitle className=" text-3xl font-bold font-mono text-gray-800">Sign In</CardTitle>
                {/* <Separator/> */}
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <Label htmlFor="email" className="block text-gray-700 mb-2">
                            Email Address
                        </Label>
                        <div className="relative">
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                autoComplete="current-email"
                                {...register("email", {
                                    required: "Email is requiblue",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Invalid email address",
                                    },
                                })}
                                className="pr-10"
                            />
                            <FaEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>
                        {errors.email && (
                            <p className="text-sm text-blue-500 mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <Label htmlFor="password" className="block text-gray-700 mb-2">
                            Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                {...register("password", {
                                    required: "Password is requiblue",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                })}
                                className="pr-10"
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" onClick={togglePasswordVisibility}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                        {errors.password && (
                            <p className="text-sm text-blue-500 mt-1">{errors.password.message}</p>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                        {loading ? <CircularProgress size={25} color="white" /> : 'Sign In'}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
