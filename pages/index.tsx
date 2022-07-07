import { useInfiniteQuery } from "react-query";
import ScamServerComponent from "../components/scam/ScamServer";

export default function Home() {
  const fetchServers = ({ pageParam = undefined }) =>
    fetch(
      `/api/v1/servers/query${pageParam ? `?cursor=${pageParam}` : ""}`
    ).then((r) => r.json());

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("servers", fetchServers, {
    getNextPageParam: (lastPage, pages) => lastPage?.data?.cursor?.id,
  });

  if (status === "loading")
    return (
      <div className="text-center">
        <span>Loading...</span>
      </div>
    );

  if (status === "error")
    return (
      <div>
        <span>
          Oops! There was an error. Refresh and try again, or open a ticket
        </span>
      </div>
    );

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row flex-wrap gap-4 mx-4 justify-evenly">
        {data?.pages.map(({ data }) =>
          data.query.map((server: any) => (
            <ScamServerComponent key={server.id} {...server} />
          ))
        )}
      </div>
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
        className={`btn btn-primary btn-wide ${isFetching ? "loading" : ""} mt-4`}
      >
        {isFetchingNextPage
          ? "Loading..."
          : hasNextPage
          ? "Load More"
          : "You've reached the end!"}
      </button>
    </div>
  );
}
