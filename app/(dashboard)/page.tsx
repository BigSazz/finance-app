"use client";
import { UserButton } from "@clerk/nextjs";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { onOpen } = useNewAccount();
  return (
    <div>
      <Button onClick={onOpen}>Open New Account</Button>
      <h1>Dashboard Page</h1>
      <p>This a protected page.</p>
    </div>
  );
}
