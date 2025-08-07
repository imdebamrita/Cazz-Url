
import LinkTable from "@/components/links/LinkTable";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

const Dashboard = async () => {
    const user = await currentUser();
    if (!user) {
        return {
            redirect: {
                destination: '/sign-in',
                permanent: false,
            },
        };
    }

    const { firstName } = user;

    return (
        <main className="gap-6 flex flex-col px-4">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Welcome {firstName}</h1>
                    <p className="text-muted-foreground text-sm">Manage your links and view analytics.</p>
                </div>
                <div className="pr-8">
                    <Button className="w-fit" variant="default">
                        <Link href={"dashboard/create-link"}>Create Link</Link>
                    </Button>
                </div>
            </div>

            {/* <h1 className="text-2xl font-bold">Welcome to URL Analytics</h1>
            <p className="text-base">This is a simple URL redirection and analytics service.</p> */}
            <LinkTable />
        </main>
    )
}

export default Dashboard;