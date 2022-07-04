import { PartneredServer } from "@prisma/client";
import { GetServerSideProps } from "next";
import PartnerCard from "../../components/partnered/PartnerCard";
import { prisma } from "../../lib/db";

export default function Partners(props: { partners: PartneredServer[] }) {
  const { partners } = props;
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">Partners</h1>

      <div className="flex flex-row flex-wrap justify-center items-center gap-4">
        {partners.map((p) => (
          <PartnerCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const query = await prisma.partneredServer.findMany({});
  return {
    props: {
      partners: query.map((e) => ({
        ...e,
        createdAt: e.createdAt.getTime(),
        updatedAt: e.updatedAt.getTime(),
      })),
    },
  };
};
