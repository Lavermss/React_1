export default function ChildComp({ imageInfo, width = 300, height }) {
  return (
    <>
      <img
        src={imageInfo.src}
        alt={imageInfo.alt}
        width={width}
        height={height}
      />
    </>
  );
}
