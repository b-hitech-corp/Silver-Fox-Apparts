import { blogData } from "@/app/_lib/data/blogData";
import Heading from "@/app/_ui/Heading";
import { truncateText } from "@/app/utils/truncateText";
import Image from "next/image";
import Link from "next/link";
import { MdDateRange } from "react-icons/md";
import Card from "../Card/Card";
import styles from "./styles.module.css";

function Blog() {
  return (
    <section className={styles.blogSection}>
      <div className="container">
        <Heading className={styles.heading}>Latest Blogs</Heading>
        <p className={styles.subheading}>
          Stay inspired and informed with our expert tips & guides
        </p>

        <div className={styles.blogGrid}>
          {blogData.map((blog) => (
            <Card key={blog.id} className={styles.blogCard}>
              <Card.Thumbnail className={styles.thumbnail}>
                <div
                  className={styles.tagBadge}
                  style={{ backgroundColor: blog.tagColor }}
                >
                  {blog.author}
                </div>
                <Image src={blog.image} alt="blog image" fill />
              </Card.Thumbnail>
              <Card.Description className={styles.blogDescriptionContainer}>
                <div className={styles.meta}>
                  <MdDateRange size={15} /> <span>{blog.date}</span>
                </div>
                <h2 className={styles.blogHeading}>{blog.title}</h2>
                <p className={styles.blogDescription}>
                  {truncateText(blog.description, 30)}
                </p>
                <Link href={`/blogs/${blog.id}`} className={styles.readMore}>
                  Read More →
                </Link>
              </Card.Description>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blog;
