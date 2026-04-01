import ChildComp from "./ChildComp";
import reactLogo from "../assets/react.svg";
import viteLogo from "../assets/vite.svg";

export default function ParentComp() {
  return (
    <>
      <ChildComp
        imageInfo={{
          src: reactLogo,
          alt: "React",
        }}
      />

      <ChildComp
        imageInfo={{
          src: reactLogo,
          alt: "React",
        }}
        width={125}
        height={125}
      />

      <ChildComp
        imageInfo={{
          src: viteLogo,
          alt: "vite",
        }}
        width={200}
        height={200}
      />
    </>
  );
}