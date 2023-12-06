"use client";

import { Divider } from "@/components/styled/divider";
import { signIn } from "next-auth/react";

import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import Toast from "../../toast";

export const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  
  const handleReturnBack = () => {
    router.push('/')
  }

  const searchParams = useSearchParams();
  let callbackUrl = searchParams.get("callbackUrl") || "/protected/home";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl,
      });

      setLoading(false);
      if (res?.ok) {
        if (callbackUrl === `${process.env.NEXT_PUBLIC_URL}/`) {
          callbackUrl += 'protected/home';
        }
        router.refresh();
        router.push(`${callbackUrl}`);
      } else {
        setError("invalid email or password");
      }
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const input_style =
    "w-full px-4 py-5 text-sm font-normal text-textColor bg-accentColor bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-textColor focus:bg-white focus:border-focusColor focus:outline-none";

  return (
    <form className=" flex flex-col justify-between rounded-3xl items-center bg-formColor w-1/4 h-2/3 p-5">
      <Toast closeToast={setError} text={error} type="error" />
      <div className="w-full">
        <div className="mb-6 w-full">
          <input
            required
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="Почта"
            className={`${input_style}`}
          />
        </div>
        <div className="mb-6 w-full">
          <input
            required
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Пароль"
            className={`${input_style}`}
          />
        </div>

      <button
        type="submit"
        style={{ backgroundColor: `${loading ? "#ccc" : "#3446eb"}` }}
        className="inline-block px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading ? "loading..." : "Sign In"}
      </button>
      <button className=" mt-5 px-2 py-1 rounded-md hover:bg-bodydark text-black transition-all duration-300" onClick={handleReturnBack}>Return back</button>
      </div>
      <Divider />
    </form>
  );
};