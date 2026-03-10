import { useEffect, useState } from "react";
import { Divider, Spin, Alert } from "antd";
import HeroSection from "../components/home/HeroSection";
import RecentPages from "../components/home/RecentPages";
import AllPages from "../components/home/AllPages";
import { getPages } from "../api/pages";
import Header from "../components/common/Header";
export default function HomePage() {
  const [pages, setPages] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPages()
      .then(setPages)
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
      <RecentPages pages={pages} />
      <Divider />
      <AllPages pages={pages} />
    </div>
  );
}
