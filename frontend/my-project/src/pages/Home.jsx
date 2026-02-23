import { useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";

const Home = () => {
  const [isRatelimited, setIsRatelimited] = useState(false);


  return (
    <div className="min-h-screen">
      <Navbar />
       {isRatelimited && <RateLimitedUI />}
    </div>
  )
}
export default Home