import Image from "next/image";

export default function Contact() {
  return (
    <div className="w-full relative bg-contact">
      <div className="absolute inset-0 bg-overlay-contact"></div>
      <div className="container mx-auto px-4 md:px-44 py-10 md:py-16 relative">
        <div className="text-[32px] md:text-[40px] font-medium font-pathway-extreme text-white mb-10">
          Kontak
        </div>
        <div className="md:flex gap-16 text-primary-dark">
          <div className="flex-1">
            <div className="mb-4 text-lg font-medium font-pathway-extreme">
              Kantor Sekretariat InSWA{" "}
            </div>
            <div className="text-base leading-normal font-light mb-10">
              Gedung Plaza Mutiara, Lt 8.
              <br /> Jl. Lingkar Mega Kuningan, Kuningan Timur, <br /> Kec.
              Setiabudi, Kota Jakarta Selatan, <br />
              DKI Jakarta 12950
            </div>
            <div className="rounded-lg overflow-hidden w-full md:w-[350px] mb-10 md:mb-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.593226740475!2d106.87123597453065!3d-6.185156660601135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f4f081aa2f13%3A0xfb28f8aebf988ac5!2sTPS%203R%20Rawasari!5e0!3m2!1sen!2sid!4v1753196806207!5m2!1sen!2sid"
                width="100%"
                height="250"
                style={{ border: 0, borderRadius: "8px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <div className="flex-1 text-xl font-medium font-pathway-extreme">
            <div className="bg-form-contact rounded-tl-[30px] rounded-tr-lg rounded-br-[30px] rounded-bl-lg py-6 md:py-10 px-4 md:px-8 space-y-4">
              <input
                type="text"
                placeholder="Nama"
                className="py-3 px-4 text-tertiary-dark rounded-lg text-sm font-medium w-full"
              />
              <input
                type="text"
                placeholder="Email"
                className="py-3 px-4 text-tertiary-dark rounded-lg text-sm font-medium w-full"
              />
              <textarea
                placeholder="Tulis pesanmu disini"
                className="py-3 px-4 text-tertiary-dark rounded-lg text-sm font-medium w-full"
                rows={5}
              ></textarea>
              <button className="h-10 px-8 text-base bg-green-gradient font-semibold flex items-center justify-center rounded-tl-[32px] rounded-br-[32px] rounded-bl rounded-tr text-primary-light flex gap-2">
                Kirim
                <Image
                  src="/assets/icons/arrow-right.svg"
                  alt="Logo"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
