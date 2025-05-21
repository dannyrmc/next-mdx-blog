import Splash from "@/components/sections/splash";
import Blogs from "@/components/sections/blogs";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="flex flex-col px-0 pt-20">
      <Splash />
      <Blogs />
      <Contact />
    </div>
  );
}
