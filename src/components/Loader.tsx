import CircularProgress from "./CircularProgress";

const Loader = ({color}:{color?:string}) => {
  return (
    <div className=" h-screen w-screen fixed z-50 bg-neutral-700 opacity-25 flex justify-center items-center">
      <CircularProgress color={`${color}`}/>
    </div>
  );
};

export default Loader;
