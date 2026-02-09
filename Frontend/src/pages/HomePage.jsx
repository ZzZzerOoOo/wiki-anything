 import { useEffect, useState } from "react";
import { Divider } from "antd";
import HeroSection from "../components/home/HeroSection";
import RecentPages from "../components/home/RecentPages";
import AllPages from "../components/home/AllPages";
import { getPages } from "../api/pages";
import Header from "../components/common/Header";
export default function HomePage() {
  const [pages, setPages] = useState(null);

  useEffect(() => {
    getPages()
      .then(setPages)
      .catch(err => console.error(err));
  }, []);
  
  if (pages === null) {
  return null; // or spinner later
}
  return (
    <div >
      <Header />
      <HeroSection />
      <Divider />
      <RecentPages pages={pages} />
      <Divider />
      <AllPages pages={pages} />
    </div>
  );
}
