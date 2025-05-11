"use client";
import LoadingCircle from "@/components/LoadingCircle";
import { CustomInput } from "@/components/ui/InputField";
import { LanguageFile } from "@/constants/language";
import { useTranslateFile } from "@/hooks/translation/useTranslateFile";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(4, "รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร"),
  password: z.string().min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"),
});

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const route = useRouter();

  const authen = useTranslateFile(LanguageFile.AUTHEN);

  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const handleLogin = async (data: z.infer<typeof loginSchema>) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        username: data.username,
        password: data.password,
        callbackUrl: redirectUrl,
      });

      if (result?.error) {
        setError("username", {
          type: "manual",
          message: " ",
        });
        setError("password", {
          type: "manual",
          message: " ",
        });
        setError("root", {
          type: "manual",
          message: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
        });
      } else {
        route.push(result?.url || "/");
      }
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "เกิดข้อผิดพลาดของระบบ กรุณาลองใหม่อีกครั้ง",
      });
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
      {errors.root && (
        <p className="text-red-500 text-sm text-center mb-4">
          {errors.root.message}
        </p>
      )}

      <CustomInput
        label={authen?.label_username}
        name="username"
        register={register("username")}
        error={errors.username?.message}
        placeholder="Username"
      />

      <CustomInput
        label={authen?.label_password}
        name="password"
        type="password"
        register={register("password")}
        error={errors.password?.message}
        placeholder="Password"
        showPassword={showPassword}
        toggleShowPassword={() => setShowPassword(!showPassword)}
      />

      <div className="text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="submit-button py-2"
        >
          {isSubmitting ? <LoadingCircle /> : authen?.button_proceed}
        </button>
      </div>

      <div className="flex items-center justify-center space-x-4 text-center mt-6">
        <hr className="flex-grow border-t border-gray-300" />
        <span className="text-gray-600 px-2">{authen?.label_or}</span>
        <hr className="flex-grow border-t border-gray-300" />
      </div>

      <div className="flex flex-col gap-4 mt-6">
        <div className="text-text_primary">
          <p>Liên hệ với IT để lấy lại mật khẩu</p>
          <p>
            Email liên hệ:{" "}
            <a
              href="mailto:admin-fastwork@gmail.com?subject=Yêu cầu đặt lại mật khẩu&body=Chào IT, vui lòng hỗ trợ tôi đặt lại mật khẩu."
              className="text-blue-600 underline ml-1"
            >
              admin-fastwork@gmail.com
            </a>
          </p>
        </div>
      </div>
    </form>
  );
};
