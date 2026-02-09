import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPages } from "../api/pages";

export default function HomePage() {
  const [pages, setPages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPages()
      .then(setPages)
      .catch(err => console.error(err));
  }, []);

  function HeroSection({ onCreate }) {
  return (
    <div className="hero">
      <h1>Wiki Anything</h1>
      <p>A block-based wiki for organizing knowledge, built for developers.</p>
      <button className="primaryButton" onClick={onCreate}>
        Create New Page
      </button>
    </div>
  );
}

  function Section({ title, children }) {
    return (
      <div className="section">
        <h2>{title}</h2>
        {children}
      </div>
    );
  }

  function PageRow({ page, onClick }) {
    return (
      <div className="pageRow" onClick={onClick}>
        <div>
          <strong>{page.title}</strong>
          <div className="slug">{page.slug}</div>
        </div>
        <div className="date">
          {new Date(page.updatedAt).toLocaleDateString()}
        </div>
      </div>
    );
  }

  function EmptyState({ onCreate }) {
    return (
      <div className="empty">
        <p>You don’t have any pages yet.</p>
        <button className="secondaryButton" onClick={onCreate}>
          Create your first page
        </button>
      </div>
    );
  }


  const recentPages = [...pages]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5);

  return (
      <div className="container">
      <HeroSection onCreate={() => navigate("/pages/new")} />

      {recentPages.length > 0 && (
        <Section title="Recent Pages">
          {recentPages.map(page => (
            <PageRow
              key={page.id}
              page={page}
              onClick={() => navigate(`/pages/${page.slug}`)}
            />
          ))}
        </Section>
      )}

      <Section title="All Pages">
        {pages.length === 0 ? (
          <EmptyState onCreate={() => navigate("/pages/new")} />
        ) : (
          pages.map(page => (
            <PageRow
              key={page.id}
              page={page}
              onClick={() => navigate(`/pages/${page.slug}`)}
            />
          ))
        )}
      </Section>
    </div>
  );
}
