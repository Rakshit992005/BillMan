import Home1Left from "../components/HomeComponents/Home1Left";
import Home1Right from "../components/HomeComponents/Home1Right";
import Home2 from "../components/HomeComponents/Home2";
import Home3Left from "../components/HomeComponents/Home3Left";
import Home3Right from "../components/HomeComponents/Home3Right"; 



const Home = () => {
  return (
    <div className="flex flex-col bg-(--bg-primary) ">
      <div className="flex w-full p-60   h-[calc(100vh-80px)] border-b-2 border-(--border-primary)">
        <Home1Left />
        <Home1Right />
      </div>
      <div className=" border-b-2 border-(--border-primary)">
        <Home2 />
      </div>
      <div className=" flex pt-30 pl-50 pb-10 border-b-2 border-(--border-primary)">
        <Home3Left />
        <Home3Right />
      </div>
    </div>
  );
};

export default Home;
