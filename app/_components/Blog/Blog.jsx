import Heading from "@/app/_ui/Heading";
import styles from "./styles.module.css";
import Card from "../Card/Card";
import Image from "next/image";
function Blog() {
  return (
    <section className={styles.blogSection}>
      <div className="container">
        <Heading className={styles.heading}>Blog</Heading>
        {/* <p className={styles.description}>
          Lorem Ipsum is available, but the majority have suffered
        </p> */}

        <div className={styles.blogGrid}>
          <Card>
            <Card.Thumbnail>
              <Image fill src="/img-20.jpg" alt="" />
            </Card.Thumbnail>
            <Card.Description className={styles.blogDescriptionContainer}>
              <h2 className={styles.blogHeading}>
                5 Reasons to Stay at Silver Fox Apartment on Your Next City
                Tripm
              </h2>
              <p className={styles.blogDescription}>
                Looking for the perfect place to stay in the city? Discover why
                Silver Fox Apartment stands out among other accommodations. From
                its central location and fully furnished interiors to seamless
                booking and top-notch service, this blog covers the top 5
                reasons why guests love staying with us — whether for business
                or leisure.
              </p>
            </Card.Description>
          </Card>
          <Card>
            <Card.Thumbnail>
              <Image fill src="/img-5.jpg" alt="" />
            </Card.Thumbnail>
            <Card.Description className={styles.blogDescriptionContainer}>
              <h2 className={styles.blogHeading}>
                Short Stay or Long Stay? Why Silver Fox Apartment is Perfect for
                Both
              </h2>
              <p className={styles.blogDescription}>
                Not sure where to stay for a short city visit or an extended
                work assignment? Silver Fox Apartment offers the best of both
                worlds. Learn how our flexible stay options, home-style
                amenities, and affordable rates make us the ideal choice for any
                length of stay — no compromises, just comfort.
              </p>
            </Card.Description>
          </Card>

          <Card>
            <Card.Thumbnail>
              <Image fill src="/img-25.jpg" alt="" />
            </Card.Thumbnail>
            <Card.Description className={styles.blogDescriptionContainer}>
              <h2 className={styles.blogHeading}>
                How to Make the Most of Your Stay in the City – A Local Guide
                from Silver Fox Apartment
              </h2>
              <p className={styles.blogDescription}>
                Make your visit unforgettable with our curated local guide. This
                blog shares insider tips on the best nearby restaurants,
                attractions, hidden gems, and nightlife — all within easy reach
                of Silver Fox Apartment. Whether you're a first-time visitor or
                a frequent guest, let us help you explore the city like a local.
              </p>
            </Card.Description>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Blog;
