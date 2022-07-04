import { ScamServer } from "@prisma/client";

export default function ScamServerComponent({
  id,
  createdAt,
  updatedAt,
  invites,
  name,
  serverId,
  size,
}: ScamServer) {
  const sizeCheck = {
    TINY: "badge-success",
    SMALL: "badge-info",
    MEDIUM: "badge-warning",
    LARGE: "badge-error",
    OPERATION: "badge-outline badge-error",
  };
  return (
    <div className="card w-96 bg-base-100 shadow-xl border">
      <div className="card-body">
        <h2 className="card-title leading-tight">{name}</h2>
        <p className="leading-tight text-sm text-secondary">
          ID: {serverId}
          <br />
          DBID: {id}
        </p>
        <div className="flex flex-row flex-wrap gap-1">
          <span className={`badge ${sizeCheck[size]}`}>
            {size.toLowerCase()}
          </span>
          <span
            className={`badge ${
              invites.length === 0
                ? "badge-warning"
                : invites.length > 3
                ? "badge-info"
                : "badge-neutral"
            }`}
          >
            {invites.length} invites
          </span>
        </div>
        <div className="card-actions justify-end">
          {invites.map((i) => (
            <a
              href={`https://discord.gg/${i}`}
              key={i}
              className="btn btn-sm"
              target={"_blank"}
              rel="noreferrer"
            >
              Invite {i}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
