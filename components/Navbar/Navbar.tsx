import { UserButton } from "@clerk/nextjs";
import React from "react";
import MainNav from "./MainNav";
import StoreSwithcer from "./StoreSwitcher";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import db from "@/lib/db";

export default async function Navbar() {
  const { userId } = auth();
  if (!userId) return redirect("/sign-in");

  const stores = await db.store.findMany({ where: { userId } });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwithcer stores={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton />
        </div>
      </div>
    </div>
  );
}
