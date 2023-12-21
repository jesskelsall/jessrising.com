import { orderBy } from "lodash/fp";
import { GetStaticProps, NextPage } from "next";
import { Newsletter } from "../../components/Newsletter";
import { TripPreview } from "../../components/Preview";
import { CONFIG } from "../../consts/config";
import { allTripsList } from "../../data/trips";
import { Trip } from "../../types/trip";

type PageProps = {
  trips: Trip[];
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const sortedTrips = orderBy(["dates.from"], ["desc"], allTripsList);

  return {
    props: {
      trips: sortedTrips,
    },
  };
};

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
