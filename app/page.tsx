"use client"
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function Home() {
  const route=useRouter();
  const logoutHander=async()=>{

    try {
       const res=await axios.get("/api/users/logout");
       console.log(res.data);
       toast.success(res.data.message);
       route.push("/login");
    } catch (error:any) {
      toast.success(error.data.message);
    }
  }
  return (
  <div>
    <h1>I am Home</h1>
    <button onClick={logoutHander} className="bg-zinc-500 px-2 py-1 rounded-lg">Logout</button>
  </div>
  );
}
