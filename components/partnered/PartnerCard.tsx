import { PartneredServer } from "@prisma/client";
import Image from "next/image";

export default function PartnerCard({
  name,
  invite,
  partnered,
  description,
  createdAt,
  updatedAt,
  image,
}: PartneredServer) {
  return (
    <div className="card w-72 md:w-96 h-96 bg-base-100 shadow-xl border md:flex-1">
      {image ? (
        <figure>
          <a href={invite} rel="noreferrer" target={"_blank"}>
            <Image
              src={image}
              alt={`Server banner for ${name}`}
              layout="intrinsic"
              width={500}
              height={200}
            />
          </a>
        </figure>
      ) : null}

      <div className="card-body">
        <h2 className="card-title leading-tight text-lg">{name}</h2>
        <p className="leading-tight text-sm">{description}</p>
        <a
          href={invite}
          rel="noreferrer"
          target={"_blank"}
          className="link link-primary text-center"
        >
          Click to join
        </a>
        <div className="card-actions justify-end">
          <span className="badge badge-info">Safe Server</span>
          {partnered ? (
            <span className="badge badge-success">Partnered</span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
