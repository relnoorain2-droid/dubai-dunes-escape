import logoSvg from "@/assets/logo.svg";
import clsx from "clsx";

type Props = {
  className?: string;
  alt?: string;
};

const BrandLogo = ({ className, alt = "Premium Desert Safari" }: Props) => {
  return (
    <picture>
      {/* If /premium-logo.png exists in public/, the browser will use it; otherwise falls back to SVG */}
      <source srcSet="/premium-logo.png" type="image/png" />
      <img
        src={logoSvg}
        alt={alt}
        className={clsx("object-contain w-auto", className)}
        loading="eager"
        decoding="async"
        style={{ display: "block" }}
      />
    </picture>
  );
};

export default BrandLogo;