
import LinkTable from "@/components/links/LinkTable";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Dashboard = () => {
    return (
        <main className="gap-4 flex flex-col px-4">
            <h1 className="text-4xl font-bold">Welcome to URL Analytics</h1>
            <p className="mt-4 text-lg">This is a simple URL redirection and analytics service.</p>

            <Button className="my-4 w-fit" variant="default">
                <Link href={"dashboard/create-link"}>Create Link</Link>
            </Button>
            <LinkTable />
        </main>
    )
}

export default Dashboard;