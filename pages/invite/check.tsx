import { ScamServer } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import StandardResponse from "../../typings/api/StandardResponse";
import {
  DiscordInviteType,
  UnknownInvite,
} from "../../typings/discord/DiscordInviteType";

export default function Check() {
  const [invite, setInvite] = useState<string>("");
  const [isValid, setIsValid] = useState(false);

  const regex = useMemo(
    () =>
      /(?<=(https?:\/\/)?(www.)?(discord.(gg|io|me|li)|discordapp.com\/invite)\/)[^\s\/]+?(?=\b)/,
    []
  );
  const text = useMemo(() => regex.exec(invite), [invite, regex]);

  const fetchCheck = (
    invite: string
  ): Promise<DiscordInviteType | UnknownInvite> =>
    fetch(`https://discord.com/api/v9/invites/${invite}`).then((res) =>
      res.json()
    );

  const fetchDatabase = (
    invite: string
  ): Promise<
    StandardResponse<{
      query: ScamServer[];
      cursor?: ScamServer;
    }>
  > =>
    fetch(`/api/v1/servers/query?invites=${invite}`).then((res) => res.json());

  const { isLoading, isError, error, data } = useQuery(
    ["check", text?.[0] ?? ""],
    () => fetchCheck(text?.[0] ?? "")
  );

  const dbQuery = useQuery(["database", text?.[0] ?? ""], () =>
    fetchDatabase(text?.[0] ?? "")
  );

  useEffect(() => {
    if (regex.test(invite ?? "")) return setIsValid(true);
    return setIsValid(false);
  }, [invite, regex]);

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="w-full max-w-sm">
        <input
          type="text"
          className="text-center min-w-full mx-2 sm:mx-0 invalid:ring-1 invalid:ring-red-500 peer"
          placeholder="Invite"
          onChange={(e) => setInvite(e.target.value)}
          value={invite}
        />
        <p
          className={`${
            isValid ? "invisible" : "visible"
          } peer-invalid:visible text-red-500`}
        >
          Invalid invite. Discord invites begin with{" "}
          <span className="font-mono">discord.gg/</span>
        </p>
      </div>
      {isLoading || (data?.code as any) === 0 ? (
        <div>Loading...</div>
      ) : isError || data?.code === 10006 ? (
        <div>Error! Please double check your invite link</div>
      ) : (
        <div className="w-full max-w-sm mt-4">
          <span className="text-lg font-bold inline-block text-center">
            {data?.guild?.name}
          </span>
          <span className="text-sm text-gray-500 block">{data?.guild?.id}</span>
          <div className="mt-4 flex flex-col gap-2 flex-wrap text-center justify-center">
            {data?.guild?.features
              .sort((a, b) => a.localeCompare(b))
              .map((f) => (
                <div
                  key={f}
                  className="p-1 bg-emerald-500 text-white font-semibold"
                >
                  {f.replaceAll("_", " ")}
                </div>
              ))}
          </div>
          <div className="flex flex-col mt-4">
            <span className="font-semibold text-lg mb-2">Link Creater</span>
            <span>
              {data?.inviter?.username ?? "SYSTEM"}
              <span className="font-mono">
                #{data?.inviter?.discriminator ?? "0000"}
              </span>
            </span>
            <span className="text-gray-500">
              {data?.inviter?.id ?? "this-is-a-vanity-url"}
            </span>
          </div>
          <div className="flex flex-col mt-4">
            <span className="font-semibold text-lg mb-2">Database Check</span>
            {dbQuery.isLoading ? (
              <div>Checking Scam Server Database...</div>
            ) : dbQuery.isError ? (
              <div>
                There was an error getting to the database. Try again later
              </div>
            ) : (
              <div>
                {dbQuery.data?.data.query.length === 0 ? (
                  <span>This server is not in our Scam Servers Database</span>
                ) : (
                  <div>
                    <span className="text-lg font-semibold block">
                      {dbQuery.data?.data.query[0].name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {dbQuery.data?.data.query[0].id}
                    </span>
                    <span className="mt-2 block">
                      Added to DB on{" "}
                      {new Date(
                        dbQuery.data?.data.query[0]?.createdAt as unknown as string
                      ).toUTCString()}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
