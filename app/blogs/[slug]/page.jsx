import { blogData } from "@/app/_lib/data/blogData";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MdDateRange } from "react-icons/md";

export async function generateStaticParams() {
  return blogData.map((blog) => ({ slug: String(blog.id) }));
}

export default function BlogDetails({ params }) {
  const blog = blogData.find((b) => b.id === Number(params.slug));

  if (!blog) return notFound();

  return (
    <section className={styles.blogDetails}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.left}>
            <div className={styles.meta}>
              <span className={styles.author}>{blog.author},</span>
              <span className={styles.date}>
                <MdDateRange size={18} /> {blog.date}
              </span>
            </div>
            <h1 className={styles.title}>{blog.title}</h1>
            <p className={styles.description}>{blog.description}</p>
            <p className={styles.fullContent}>{blog.content}</p>
          </div>

          <div className={styles.imageWrapper}>
            <Image src={blog.image} alt={blog.title} fill />
          </div>
        </div>
      </div>
    </section>
  );
}
