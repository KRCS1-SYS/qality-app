"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import axios from "axios";
import FormInputElement from "../shared/form-input";
import { z } from "zod";
import Loader from "../shared/loader";
import { useRouter } from "next/navigation";
import { loginAPI } from "@/lib/api";
import { useDispatch } from "react-redux";
import { logIn } from "@/redux/auth-slice";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      setLoading(true);
      const { email, password } = values;

      const res = await axios.post(loginAPI, {
        email,
        password,
      });

      if (res.status === 200) {
        dispatch(logIn({ isAuth: true, token: res.data.userToken }));
        router.push("/dashboard");
        toast.success("Welcome to Zuari Industries!");
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 404 || error.response.status === 401) {
        form.setError("email", {
          message: error.response.data.message,
          type: "manual",
        });
        form.setError("password", {
          message: error.response.data.message,
          type: "manual",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden m-0 p-0 border-0 shadow-2xl">
        <CardContent className=" p-0 flex flex-col">
          <div className=" relative">
            <div className="w-full absolute text-white z-20 font-semibold top-[50%] text-xl text-center">
              <h1 className=" ">SPE Quality Parameter App</h1>
            </div>
            <img src="/zuarione-login.jpeg" className=" brightness-50" />
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-6 md:p-8 space-y-6"
            >
              <FormInputElement
                name={"email"}
                label={"Email"}
                type={"email"}
                placeholder={"Email"}
                form={form}
              />
              <FormInputElement
                name={"password"}
                label={"Password"}
                type={"password"}
                placeholder={"Password"}
                form={form}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-[45px] rounded-[4px] shadow-2xl cursor-pointer"
              >
                {loading ? <Loader /> : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
