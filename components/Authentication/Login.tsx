"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Eye, EyeOff, X } from "lucide-react";
import Link from "next/link";

function MigrationModal({ email, onClose }: { email: string; onClose: () => void }) {
  const handleResetPassword = () => {
    localStorage.setItem(`gs_migration_seen_${email}`, "1");
    onClose();
    window.location.href = "/forgot-password";
  };
  const handleDismiss = () => {
    localStorage.setItem(`gs_migration_seen_${email}`, "1");
    onClose();
  };
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
      <div style={{ background: "#fff", borderRadius: "16px", padding: "32px", maxWidth: "420px", width: "100%", position: "relative", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
        <button onClick={handleDismiss} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", color: "#9ca3af" }}>
          <X size={20} />
        </button>
        <div style={{ fontSize: "32px", marginBottom: "12px" }}>🔄</div>
        <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px", color: "#111" }}>
          We&apos;ve moved to a new platform
        </h2>
        <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.6, marginBottom: "24px" }}>
          We recently upgraded GetSmoke to a new platform. We apologize for the inconvenience - your old password no longer works.
          <br /><br />
          Please set a new password using your email address. It only takes 30 seconds.
        </p>
        <button
          onClick={handleResetPassword}
          style={{ width: "100%", padding: "12px", borderRadius: "9999px", background: "linear-gradient(90deg,#7c3aed 0%,#fe3500 100%)", color: "#fff", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer", marginBottom: "10px" }}
        >
          Reset My Password
        </button>
        <button
          onClick={handleDismiss}
          style={{ width: "100%", padding: "10px", borderRadius: "9999px", background: "transparent", color: "#9ca3af", fontSize: "12px", border: "1px solid #e5e7eb", cursor: "pointer" }}
        >
          I already reset my password, try again
        </button>
      </div>
    </div>
  );
}

// Zod validation schema
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof formSchema>;

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showMigrationModal, setShowMigrationModal] = useState(false);
  const [lastEmail, setLastEmail] = useState("");
  const router = useRouter();
  const [callbackUrl, setCallbackUrl] = useState("/my-account");
  useEffect(() => {
    // This runs ONLY in the browser (after hydration)
    const searchParams = new URLSearchParams(window.location.search);
    setCallbackUrl(searchParams.get("callbackUrl") || "/my-account");
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (formData: FormData) => {
    setIsSubmitting(true);

    try {
      const loginResponse = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (loginResponse?.error) {
        throw new Error(loginResponse.error);
      }

      toast.success("Login successful!");
      router.push(callbackUrl || "/my-account");
    } catch (error) {
      console.error("Login error:", error);
      // Show migration modal on first invalid credentials attempt per email
      const migrationKey = `gs_migration_seen_${formData.email}`;
      const alreadySeen = typeof window !== "undefined" && localStorage.getItem(migrationKey);
      if (!alreadySeen) {
        setLastEmail(formData.email);
        setShowMigrationModal(true);
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {showMigrationModal && (
        <MigrationModal
          email={lastEmail}
          onClose={() => setShowMigrationModal(false)}
        />
      )}
    <div className="min-h-[82vh] w-11/12 mx-auto flex items- justify-center bg-white text-black font-unbounded pt-[2rem] pb-[4rem]">
      <div className="w-full max-w-md">

        <h1 className="text-2xl font-semibold mb-6 text-center flex items-center gap-2 justify-center mr-4 hover:underline cursor-pointer"
          onClick={() => router.back()}
        >
          <Image src={"/images/left-arrow.png"} width={25} height={25} alt="arrow" />
          Login
        </h1>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-medium">Email Address</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="example@email.com"
                error={errors.email?.message}
              />
            </div>

            <div className="space-y-2 relative">
              <Label htmlFor="password" className="font-medium">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="••••••••"
                  error={errors.password?.message}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center"
                >
                  {!showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          <div className="font-light hover:underline text-[#090808]">
            <Link href="/forgot-password">
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Log In"}
          </Button>
        </form>

        <div>
          <div className="mt-6 flex items-center gap-3 px-1">
            <hr className="flex-grow border-t border-[#999999]" />
            <div className="text-[#999999]">Or</div>
            <hr className="flex-grow border-t border-[#999999]" />
          </div>
        </div>

        <div>
          <div
            className="my-5 p-2.5 rounded-full bg-gray-100 text-[#1A1A1A] font-medium cursor-pointer flex gap-3 items-center justify-center border-none transition-all duration-300 ease-in-out"
            onClick={() => signIn("google", { callbackUrl })}
          >
            <Image src={"/images/google.png"} width={25} height={25} alt="google" />
            Login with Google
          </div>
        </div>
        <div className="text-center group text-sm text-[#666666]">
          <Link href={"/signup"}>
            Not a member?{" "}
            <span className="text-black group-hover:underline font-medium">
              Sign up
            </span>
          </Link>
        </div>

      </div>
    </div>
    </>
  );
};

export default Login;
