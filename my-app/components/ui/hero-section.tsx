import Link from "next/link";
import Image from "next/image";
import { BASE_URL } from "@/lib/strapi";

type HeroData = {
  heading: string;
  subHeading: string;
  link: {
    href: string;
    label: string;
  };
  image: {
    url: string;
    alternativeText: string;
  };
};

const styles = {
    header: "bg-blue-600 text-white p-8 text-center",
    backgroundImage: "absolute inset-0 w-full h-full object-cover opacity-20",
    overlay: "absolute inset-0 bg-black opacity-50",
    heading: "text-4xl font-bold mb-4",
    subheading: "text-lg mb-6",
    button: "bg-white text-blue-600 px-4 py-2 rounded",
}

export function HeroSection({ data }: { readonly data: HeroData }) {
  if (!data) {
    return null;
  }

  const { heading, subHeading, link } = data;
  const imageUrl = data.image?.url.startsWith('http') ? data.image.url : `${BASE_URL}${data.image?.url}`;

  return (
    <header className={styles.header}>
      <div className="relative">
        <img
          src={imageUrl}
          height={1080}
          className={styles.backgroundImage}
          style={{aspectRatio: "1920/1080", objectFit: "cover"}}
        />
        <div className={styles.overlay}></div>
        <div className="relative z-10">
          <h1 className={styles.heading}>{heading}</h1>
          <p className={styles.subheading}>{subHeading}</p>
          <Link href={link.href} className={styles.button}>
            {link.label}
          </Link>
        </div>
      </div>
    </header>
  );
}