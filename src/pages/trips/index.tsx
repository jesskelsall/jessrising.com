import { orderBy } from "lodash/fp";
import { GetStaticProps, NextPage } from "next";
import { TripPreview } from "../../components/Preview";
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
  <main className="mx-auto max-w-screen-md px-2">
    <h1>Trips</h1>
    <ul className="flex flex-col gap-8 sm:gap-14">
      {trips.map((trip) => (
        <TripPreview key={trip.slug} trip={trip} />
      ))}
    </ul>
  </main>
);

export default TripsPage;
