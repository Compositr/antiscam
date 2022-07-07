import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { LegacyRef, MutableRefObject, useEffect, useState } from "react";
import Image from "next/image";
import { themeChange } from "theme-change";
import { findDOMNode } from "react-dom";

export default function Nav() {
  const { data, status } = useSession();

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/invite/check"}>Check Invite</Link>
            </li>
            <li>
              <Link href={"/servers/partners"}>Partners</Link>
            </li>
          </ul>
        </div>
        <Link passHref href={"/"}>
          <span className="btn btn-ghost normal-case text-xl">Scam DB</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-1">
          <li className="mx-1">
            <Link href={"/"}>Home</Link>
          </li>
          <li className="mx-1">
            <Link href={"/invite/check"}>Check Invite</Link>
          </li>
          <li className="mx-1">
            <Link href={"/servers/partners"}>Partners</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {!data || status !== "authenticated" ? (
          <Link href={"/api/auth/signin"} passHref>
            <span className="btn btn-secondary ml-2">Login</span>
          </Link>
        ) : (
          <Image
            src={data.user?.image!}
            alt="Your profile picture"
            width={50}
            height={50}
            layout="fixed"
            className="mask mask-circle"
          />
        )}
      </div>
    </div>
  );
}
