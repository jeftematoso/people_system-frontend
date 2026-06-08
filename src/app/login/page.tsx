"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { authService } from "@/services/auth.service";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleLogin(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");

      const response =
        await authService.login(
          email,
          password
        );

      /*
      |---------------------------------------
      | BACKEND RESPONSE
      |---------------------------------------
      */

      const {
        token,
        user,
      } = response;

      /*
      |---------------------------------------
      | SAVE SESSION
      |---------------------------------------
      */

      localStorage.setItem(
        "@token",
        token
      );

      localStorage.setItem(
        "@user",
        JSON.stringify(user)
      );

      /*
      |---------------------------------------
      | MULTI TENANT
      |---------------------------------------
      */

      if (user.tenantId) {

        localStorage.setItem(
          "@tenantId",
          user.tenantId
        );

      }

      /*
      |---------------------------------------
      | REDIRECT
      |---------------------------------------
      */

      router.push("/dashboard");

    } catch (err: any) {

      console.log(err);

      setError(
        err?.response?.data?.error
        || "Erro ao realizar login"
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-100
    ">

      <form
        onSubmit={handleLogin}
        className="
          bg-white
          p-8
          rounded-xl
          shadow-md
          w-full
          max-w-md
        "
      >

        <h1 className="
          text-2xl
          font-bold
          mb-6
          text-center
        ">
          Login
        </h1>

        {
          error && (
            <div className="
              bg-red-100
              text-red-700
              p-3
              rounded-md
              mb-4
            ">
              {error}
            </div>
          )
        }

        <div className="mb-4">

          <label className="
            block
            mb-1
            font-medium
          ">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="
              w-full
              border
              rounded-lg
              px-4
              py-2
            "
            required
          />

        </div>

        <div className="mb-6">

          <label className="
            block
            mb-1
            font-medium
          ">
            Senha
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
              w-full
              border
              rounded-lg
              px-4
              py-2
            "
            required
          />

        </div>

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-2
            rounded-lg
            transition
          "
        >

          {
            loading
              ? "Entrando..."
              : "Entrar"
          }

        </button>

      </form>

    </div>

  );

}
