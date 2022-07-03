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
  return (
    <div className="border shadow-lg p-4 rounded-xl flex flex-col justify-center sm:justify-start">
      <span className="text-lg font-bold inline-block">{name}</span>
      <span className="text-gray-500 text-sm inline-block">{id}</span>
      <br />
      <div className="mt-auto flex flex-row justify-between gap-6">
        <span className="text-sm inline-block font-mono">ID: {serverId}</span>
        <span className="text-sm inline-block">Size: {size}</span>
      </div>
    </div>
  );
}
