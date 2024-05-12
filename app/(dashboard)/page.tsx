import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>This a protected page.</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
