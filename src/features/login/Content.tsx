import Link from "next/link";
import { usePublicArticles } from "@/hooks/usePublicArticle";
import Button from "@/components/Button";

export default function Content() {
  const { articles } = usePublicArticles(12, undefined, undefined);

  return (
    <div className="w-full relative">
      <div className="mx-auto max-w-6xl px-4 md:px-10 relative py-0 md:py-32 md:flex gap-6 mt-10 items-center">
        <div className="md:w-2/3 leading-7 h-screen md:h-auto flex items-center">
          <div className="w-full">
            <div className="font-medium text-[32px] md:text-[48px] flex w-fit gap-3 items-center mb-6 pb-3 font-pathway-extreme text-primary-light">
              Masuk Akun
            </div>
            <div className="space-y-4">
              <input
                type="text"
                className="w-full bg-surface-secondary-light px-4 py-3 rounded-lg"
                placeholder="Email"
              ></input>

              <input
                type="password"
                className="w-full bg-surface-secondary-light px-4 py-3 rounded-lg"
                placeholder="Password"
              ></input>
            </div>
            <Button title="Masuk" customClass="mt-6" />
            <div className="font-semibold text-action-hover mt-10 font-pathway-extreme">
              Lupa Password
            </div>
          </div>
        </div>
        <div className="md:w-1/3 md:border-l-2 border-l-none md:pl-6 pl-0">
          <div className="text-2xl font-medium">Postingan Terakhir</div>
          <div className="mt-6">
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
        </div>
      </div>
    </div>
  );
}
