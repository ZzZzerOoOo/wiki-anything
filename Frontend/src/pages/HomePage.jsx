import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [pages, setPages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/pages")
      .then(res => res.json())
      .then(data => setPages(data))
      .catch(err => console.error(err));
  }, []);

  function HeroSection({ onCreate }) {
  return (
    <div style={styles.hero}>
      <h1>Wiki Anything</h1>
      <p>A block-based wiki for organizing knowledge, built for developers.</p>
      <button style={styles.primaryButton} onClick={onCreate}>
        Create New Page
      </button>
    </div>
  );
}

  function Section({ title, children }) {
    return (
      <div style={styles.section}>
        <h2>{title}</h2>
        {children}
      </div>
    );
  }

  function PageRow({ page, onClick }) {
    return (
      <div style={styles.pageRow} onClick={onClick}>
        <div>
          <strong>{page.title}</strong>
          <div style={styles.slug}>{page.slug}</div>
        </div>
        <div style={styles.date}>
          {new Date(page.updatedAt).toLocaleDateString()}
        </div>
      </div>
    );
  }

  function EmptyState({ onCreate }) {
    return (
      <div style={styles.empty}>
        <p>You don’t have any pages yet.</p>
        <button style={styles.secondaryButton} onClick={onCreate}>
          Create your first page
        </button>
      </div>
    );
  }


  const recentPages = [...pages]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5);

  return (
    <div style={styles.container}>
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
