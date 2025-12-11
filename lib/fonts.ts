import { Noto_Sans, Noto_Sans_Mono, Sahitya } from "next/font/google";

const heading = Sahitya({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const body = Noto_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const label = Noto_Sans({
  variable: "--font-label",
  subsets: ["latin"],
  weight: "500",
  display: "swap",
});

const code = Noto_Sans_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const fonts = {
  heading: heading,
  body: body,
  label: label,
  code: code,
};

export default fonts;
