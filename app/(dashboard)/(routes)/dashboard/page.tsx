import { UserButton } from "@clerk/nextjs";

function DashboardPage() {
  return (
    <>
      <div>LandingPage</div>
      <div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
}

export default DashboardPage;
