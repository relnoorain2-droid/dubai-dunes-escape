import logoSvg from "@/assets/logo.svg";
import clsx from "clsx";

type Props = {
  className?: string;
  alt?: string;
};

const BrandLogo = ({ className, alt = "Premium Desert Safari" }: Props) => {
  return (
    <img
      src="/premium-logo.png"
      onError={(e) => {
        // If PNG is missing or fails, fall back to bundled SVG
        e.currentTarget.src = logoSvg;
      }}
      alt={alt}
      className={clsx("object-contain w-auto", className)}
      loading="eager"
      decoding="async"
      style={{ display: "block" }}
    />
  );
};

export default BrandLogo;