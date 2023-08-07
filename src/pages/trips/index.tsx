import { GetStaticProps, NextPage } from "next";
import { Newsletter } from "../../components/Newsletter/Newsletter";
import { TripPreview } from "../../components/Preview/Preview";
import { CONFIG } from "../../consts/config";
import { allTripsList } from "../../data/trips";
import { Trip } from "../../types/trip";

type PageProps = {
  trips: Trip[];
};

export const getStaticProps: GetStaticProps<PageProps> = async () => ({
  props: {
    trips: allTripsList,
  },
});

const TripsPage: NextPage<PageProps> = ({ trips }) => (
  <>
    <main className="content-area blog">
      <h1>Trips</h1>
      <ul className="blog-list">
        {trips.map((trip) => (
          <TripPreview key={trip.slug} trip={trip} />
        ))}
      </ul>
    </main>
    {CONFIG.SHOW_NEWSLETTER_SIGN_UP && <Newsletter />}
  </>
);

export default TripsPage;
