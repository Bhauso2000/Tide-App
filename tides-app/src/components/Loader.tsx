import ClipLoader from "react-spinners/ClipLoader";

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-40">
      <ClipLoader color="#2563eb" size={40} />
    </div>
  );
}
