import { PartneredServer } from "@prisma/client";

export default function PartnerCard({
  name,
  invite,
  partnered,
  description,
  createdAt,
  updatedAt,
}: PartneredServer) {
  return (
    <div className="card w-96 h-96 bg-base-100 shadow-xl border flex-1">
      <div className="card-body">
        <h2 className="card-title leading-tight text-lg">{name}</h2>
        <p className="leading-tight text-sm">{description}</p>
        <div className="flex flex-row flex-wrap gap-2 justify-evenly">
          <span className="badge badge-info ">Safe Server</span>
          {partnered ? (
            <span className="badge badge-success ">Partnered</span>
          ) : null}
        </div>
      </div>
      <div className="card-actions justify-center mb-2">
        <a
          href={invite}
          className="btn btn-wide btn-success"
          target={"_blank"}
          rel="noreferrer"
        >
          Join
        </a>
      </div>
    </div>
  );
}
