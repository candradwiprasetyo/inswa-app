"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { usePublicArticles } from "@/hooks/usePublicArticle";
import Button from "@/components/Button";
import NewsCard from "@/components/NewsCard";
import { useResetPassword } from "@/hooks/useResetPassword";
import { useSearchParams, useRouter } from "next/navigation";

type ResetPasswordFormValues = {
  password: string;
  confirm_password: string;
};

export default function Content() {
  const { articles } = usePublicArticles(5, undefined, undefined);
  const { resetPassword, verifyToken, loading, error, success } =
    useResetPassword();
  const [checking, setChecking] = useState(true);
  const [invalidToken, setInvalidToken] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>();

  const onSubmit = async (data: ResetPasswordFormValues) => {
    const success = await resetPassword(data.password, token);
    if (success) {
      reset();
      router.push("/login?reset-password=success");
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      const valid = await verifyToken(token);
      if (!valid) {
        setInvalidToken(true);
      }
      setChecking(false);
    };
    checkToken();
  }, [token, verifyToken, router]);

  if (checking) {
    return <p className="text-center mt-10">Memeriksa token...</p>;
  }

  return (
    <div className="w-full relative">
      <div className="mx-auto max-w-6xl px-4 md:px-10 relative py-0 md:py-32 md:flex gap-6 mt-10 items-center">
        <div className="md:w-2/3 leading-7 h-screen md:h-auto flex items-center">
          <div className="w-full">
            <div className="font-medium text-[32px] md:text-[48px] flex w-fit gap-3 items-center mb-6 pb-3 font-pathway-extreme text-primary-light">
              Ubah Password
            </div>

            {invalidToken ? (
              <p className="text-red-500 mt-10 font-bold">Token tidak valid</p>
            ) : (
              <>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <input
                      type="password"
                      {...register("password", {
                        required: "Password wajib diisi",
                      })}
                      className="w-full bg-surface-secondary-light px-4 py-3 rounded-lg"
                      placeholder="Password"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="password"
                      {...register("confirm_password", {
                        required: "Confirm Password wajib diisi",
                        validate: (value, formValues) =>
                          value === formValues.password ||
                          "Password tidak sama",
                      })}
                      className="w-full bg-surface-secondary-light px-4 py-3 rounded-lg"
                      placeholder="Confirm Password"
                    />
                    {errors.confirm_password && (
                      <p className="text-red-500 text-sm">
                        {errors.confirm_password.message}
                      </p>
                    )}
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <Button
                    title={loading ? "Loading..." : "Kirim"}
                    customClass="mt-6"
                    disabled={loading}
                    type="submit"
                  />
                </form>
              </>
            )}
          </div>
        </div>

        {/* Sidebar Artikel */}
        <div className="md:w-1/3 md:border-l-2 border-l-none md:pl-6 pl-0">
          <div className="text-2xl font-medium">Postingan Terakhir</div>
          <div className="mt-6 hidden md:inline">
            {articles.map((data, index) => (
              <Link href={`/media/${data.slug}`} key={index}>
                <div className="border-b-2 border-primary-light-border py-4 flex gap-4">
                  <div className="flex-grow">
                    <div className="text-sm font-medium mb-2 text-secondary-light">
                      {data.title}
                    </div>
                    <div className="text-xs text-tertiary-light">
                      {new Date(data.created_at!).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex md:hidden gap-8 overflow-x-auto md:overflow-none md:flex-nowrap flex-nowrap md:mt-10 md:px-0 scrollbar-hide my-8">
            {articles.map((news, index) => (
              <NewsCard
                key={index}
                title={news.title}
                description={news.content}
                images={news.images}
                date={new Date(news.created_at!).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
                slug={news.slug}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
