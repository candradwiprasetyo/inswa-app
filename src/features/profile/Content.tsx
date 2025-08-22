import Image from "next/image";
import Link from "next/link";
import usePublicProfile from "@/hooks/usePublicProfile";
import { useParams } from "next/navigation";
import Loader from "./Loader";
import { cdnLoader } from "@/lib/cdnLoader";

export default function Content() {
  const params = useParams();
  const id = params.id as string;

  const { profile, loading } = usePublicProfile(id);
  const { profiles } = usePublicProfile();

  if (loading) return <Loader />;

  if (!profile) return <div>Profile tidak ditemukan</div>;

  return (
    <div className="w-full relative">
      <div className="mx-auto max-w-6xl px-4 md:px-10 flex items-center pt-20 relative">
        <div className="md:flex justify-center md:justify-between items-center py-10 px-6 md:px-16 md:px-28 bg-profile rounded-tl-[96px] rounded-bl-lg rounded-br-[96px] rounded-tr-lg relative w-full gap-8 mt-20 md:mt-32">
          <div className="flex-none md:w-60">
            <Image
              loader={cdnLoader}
              src={profile.images}
              alt={profile.name}
              width={240}
              height={320}
              className="rounded-tl-[80px] rounded-tr-lg rounded-br-[80px] rounded-bl-lg w-[180px] md:w-[240px] h-[260px] md:h-[320px] object-cover -mt-20 md:-mt-40 md:absolute border-2 border-tertiary-light mx-auto md:mx-none"
            />
          </div>
          <div className="flex-grow text-center md:text-left mt-8 md:mt-0 ">
            <div className="text-2xl md:text-[32px] font-light md:font-medium font-pathway-extreme md:leading-normal">
              {profile.name}
            </div>
            <div className="flex gap-2 mt-5 justify-center md:justify-start">
              <Link href={profile.facebook || ""} target="_blank">
                <div className="h-8 w-8 rounded-full bg-surface-green flex items-center justify-center cursor-pointer">
                  <Image
                    src="/assets/icons/footer-facebook.svg"
                    alt="Footer Facebook"
                    width={16}
                    height={16}
                  />
                </div>
              </Link>
              <Link href={profile.youtube || ""} target="_blank">
                <div className="h-8 w-8 rounded-full bg-surface-green flex items-center justify-center cursor-pointer">
                  <Image
                    src="/assets/icons/footer-youtube.svg"
                    alt="Footer Youtube"
                    width={16}
                    height={16}
                  />
                </div>
              </Link>
              <Link href={profile.instagram || ""} target="_blank">
                <div className="h-8 w-8 rounded-full bg-surface-green flex items-center justify-center cursor-pointer">
                  <Image
                    src="/assets/icons/footer-instagram.svg"
                    alt="Footer Instagram"
                    width={16}
                    height={16}
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 md:px-10 relative py-10 md:py-16 md:flex gap-10 md:mt-10">
        <div className="md:w-2/3 text-secondary-light leading-7">
          <div className="font-medium text-xl flex w-fit gap-3 items-center mb-6 border-b-2 border-action-hover pb-3">
            <Image
              src="/assets/icons/point-leaf.svg"
              alt="Point Leaf"
              width={22}
              height={22}
            />
            Tentang {profile.name}
          </div>
          <div className="mb-8 md:mb-12 leading-7">{profile.description}</div>
        </div>
        <div className="md:w-1/3">
          <div className="text-2xl font-medium">Dewan Pengurus Lainnya</div>
          <div className="mt-6">
            {profiles.map((data, index) => (
              <Link href={`/profile/${data.id}`} key={index}>
                <div className="border-t-2 border-primary-light-border py-4 flex gap-4">
                  <div className="flex-none">
                    <Image
                      loader={cdnLoader}
                      src={data.images}
                      alt="BOD 1"
                      width={240}
                      height={320}
                      className="w-20 h-20 object-cover rounded-tl-[24px] rounded-tr rounded-br-[24px] rounded-bl"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="text-sm font-medium mb-2">{data.name}</div>
                    <div className="text-xs text-tertiary-light font-medium">
                      {data.position}
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
