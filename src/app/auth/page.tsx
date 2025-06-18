
"use client";

import type React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { auth } from '@/lib/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  type FirebaseError
} from 'firebase/auth';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { LoginSchema, SignUpSchema, PasswordResetSchema, type LoginFormData, type SignUpFormData, type PasswordResetFormData } from '@/types';
import { Zap, LogIn, UserPlus, Mail, KeyRound, Loader2, ShieldAlert } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";


export default function AuthPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordResetLoading, setIsPasswordResetLoading] = useState(false);
  const [passwordResetEmail, setPasswordResetEmail] = useState("");


  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast({ title: "Login Successful", description: "Welcome back!" });
      router.push("/home");
    } catch (error) {
      const firebaseError = error as FirebaseError;
      console.error("Login error:", firebaseError.message);
      toast({ variant: "destructive", title: "Login Failed", description: firebaseError.message || "Invalid credentials." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (data: SignUpFormData) => {
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      toast({ title: "Sign Up Successful", description: "Welcome! Please login." });
      setActiveTab("login"); 
      loginForm.reset({ email: data.email, password: "" }); 
      signUpForm.reset();
    } catch (error) {
      const firebaseError = error as FirebaseError;
      console.error("Sign up error:", firebaseError.message);
      toast({ variant: "destructive", title: "Sign Up Failed", description: firebaseError.message || "Could not create account." });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!passwordResetEmail) {
        toast({ variant: "destructive", title: "Error", description: "Please enter your email address." });
        return;
    }
    const { success } = PasswordResetSchema.safeParse({ email: passwordResetEmail });
    if (!success) {
        toast({ variant: "destructive", title: "Invalid Email", description: "Please enter a valid email address." });
        return;
    }

    setIsPasswordResetLoading(true);
    try {
      await sendPasswordResetEmail(auth, passwordResetEmail);
      toast({ title: "Password Reset Email Sent", description: "Check your inbox for instructions." });
    } catch (error) {
      const firebaseError = error as FirebaseError;
      console.error("Password reset error:", firebaseError.message);
      toast({ variant: "destructive", title: "Password Reset Failed", description: firebaseError.message });
    } finally {
      setIsPasswordResetLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 animate-fadeIn">
      <div className="absolute top-8 left-8">
        <Link href="/" className="flex items-center space-x-2 group">
          <Zap className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
          <span className="font-bold text-2xl text-foreground group-hover:text-primary transition-colors">Promptly</span>
        </Link>
      </div>

      <Card className="w-full max-w-md shadow-2xl rounded-xl overflow-hidden relative">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted p-1 rounded-none border-b">
            <TabsTrigger value="login" className="py-3 text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-md rounded-t-md">
              <LogIn className="mr-2 h-4 w-4" /> Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="py-3 text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-md rounded-t-md">
              <UserPlus className="mr-2 h-4 w-4" /> Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground">Welcome Back!</CardTitle>
              <CardDescription className="text-muted-foreground">Sign in to access your prompts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input type="email" placeholder="you@example.com" {...field} className="pl-10 bg-input border-border focus:border-primary" />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Password</FormLabel>
                        <FormControl>
                           <div className="relative">
                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input type="password" placeholder="••••••••" {...field} className="pl-10 bg-input border-border focus:border-primary" />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <div className="text-right text-sm">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button type="button" variant="link" className="text-primary hover:underline p-0 h-auto font-medium">Forgot Password?</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Reset Your Password</AlertDialogTitle>
                            <AlertDialogDescription>
                                Enter your email address below and we'll send you a link to reset your password.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <div className="space-y-2">
                                <Label htmlFor="reset-email" className="text-sm font-medium">Email Address</Label>
                                <Input 
                                    id="reset-email" 
                                    type="email" 
                                    placeholder="you@example.com" 
                                    value={passwordResetEmail}
                                    onChange={(e) => setPasswordResetEmail(e.target.value)}
                                    className="bg-input border-border focus:border-primary"
                                />
                            </div>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                                onClick={handlePasswordReset} 
                                disabled={isPasswordResetLoading}
                                className="bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                                {isPasswordResetLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Send Reset Link
                            </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-base py-3" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Login
                  </Button>
                </form>
              </Form>
            </CardContent>
          </TabsContent>

          <TabsContent value="signup">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground">Create an Account</CardTitle>
              <CardDescription className="text-muted-foreground">Join Promptly to start creating and saving prompts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Form {...signUpForm}>
                <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
                  <FormField
                    control={signUpForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Email</FormLabel>
                         <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input type="email" placeholder="you@example.com" {...field} className="pl-10 bg-input border-border focus:border-primary" />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signUpForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Password</FormLabel>
                        <FormControl>
                           <div className="relative">
                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input type="password" placeholder="Choose a strong password" {...field} className="pl-10 bg-input border-border focus:border-primary" />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signUpForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Confirm Password</FormLabel>
                         <FormControl>
                           <div className="relative">
                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input type="password" placeholder="Confirm your password" {...field} className="pl-10 bg-input border-border focus:border-primary" />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-base py-3" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign Up
                  </Button>
                </form>
              </Form>
            </CardContent>
          </TabsContent>
        </Tabs>
        
        <CardFooter className="flex flex-col items-center text-center text-xs text-muted-foreground pt-2 pb-6 border-t mt-4">
          <div>
            By continuing, you agree to Promptly's <Link href="/terms" className="underline hover:text-primary">Terms of Service</Link> and <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
          </div>
          <div className="absolute bottom-2 right-2 opacity-50 hover:opacity-100 transition-opacity">
            <Link href="/workspace" className="text-xs text-muted-foreground hover:text-primary flex items-center">
              <ShieldAlert className="h-3 w-3 mr-1" />
              Admin
            </Link>
          </div>
        </CardFooter>
      </Card>

      <footer className="py-8 text-center text-muted-foreground text-sm absolute bottom-0">
          <p>&copy; {new Date().getFullYear()} Promptly. All rights reserved.</p>
      </footer>
    </div>
  );
}

    