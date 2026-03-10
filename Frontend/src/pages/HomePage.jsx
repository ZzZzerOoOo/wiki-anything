import { useEffect, useState } from "react";
import { Divider, Spin, Alert } from "antd";
import HeroSection from "../components/home/HeroSection";
import RecentWiki from "../components/home/RecentWiki";
import AllWiki from "../components/home/AllWiki";
import { getWiki } from "../api/wiki";
import Header from "../components/common/Header";


export default function HomePage() {
  const [wiki, setWiki] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWiki()
      .then(setWiki)
      .catch(err => setError("Failed to load pages. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spin size="large" style={{ display: "block", marginTop: 80, color: "blue" }} />;
  if (error) return <Alert type="error" message={error} style={{ margin: 40 }} />;

  return (
    <div >
      {/* <Header /> */}
      <HeroSection />
      <Divider />
      <RecentWiki wiki={wiki} />
      <Divider />
      <AllWiki wiki={wiki} />
    </div>
  );
}
