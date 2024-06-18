"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createSupabaseBrowserClient } from "@/lib/client/supabase";
import useHydrate from "@/hooks/useHydrate";

const AuthUI = () => {
  const supabase = createSupabaseBrowserClient();
  const [user, setUser] = useState();

  const isMount = useHydrate();
  const getUserInfo = async () => {
    console.log("getUserInfo");
    const result = await supabase.auth.getUser();
    console.log("result", result);
    if (result?.data?.user) setUser(result?.data?.user);
  };
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  if (!isMount) {
    return null;
  }
  return (
    <section className="w-full">
      <div> {user ? `로그인 됨 ${user?.email}` : "로그아웃"}</div>
      <>
        {user && (
          <button onClick={handleLogout} className=" border-2 border-black">
            로그아웃
          </button>
        )}
      </>
      <div className="mx-auto max-w-[500px]">
        <Auth
          redirectTo={process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO}
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
          }}
          onlyThirdPartyProviders
          providers={["google", "github"]}
        />
      </div>
    </section>
  );
};

export default AuthUI;