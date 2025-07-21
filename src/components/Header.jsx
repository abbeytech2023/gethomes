import NavBox from "./NavBox";

export default function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-20 bg-red-700">
      <div>
        <NavBox />
      </div>
    </header>
  );
}
