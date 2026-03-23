import logo from "../assets/img/logo1.png";

export default function Logo() {
  return (
    <a href="/" className="flex items-center gap-3 group">
      <img
        src={logo}
        alt="İnkişaf Akademiyası"
        className="h-20 md:h-27 w-auto object-contain"
      />
    </a>
  );
}
