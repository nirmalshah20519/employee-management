import Loader from "@/components/Loader";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import Verified from "./DriverComponents/Verified";
import Unverified from "./DriverComponents/Unverified";

export default function Drivers() {


    const [anythingLoading, setAnythingLoading] = useState(false)
    const tabData = [
        {
            id: 1,
            title: 'Unverified Drivers',
            content: <Unverified setAnythingLoading={setAnythingLoading} /> // Ensure this component is defined to display the table
        },
        {
            id: 2,
            title: 'Verified Drivers',
            content: <Verified setAnythingLoading={setAnythingLoading} /> // Ensure this component is defined to handle notifications
        },
    ];

    return (
        <>
            {anythingLoading && <Loader />}
            <div className="p-6 bg-neutral-200 min-h-screen text-white ">
                <div className="">
                    <Tabs defaultValue="1">
                        <TabsList aria-label="Manage Reports" className='mb-3'>
                            {tabData.map(tab => (
                                <TabsTrigger key={tab.id} value={tab.id.toString()} disabled={anythingLoading} className=' p-2'>
                                    {tab.title}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        <Card className='w-full'>
                            <CardContent>
                                {tabData.map(tab => (
                                    <TabsContent key={tab.id} value={tab.id.toString()}>
                                        {tab.content}
                                    </TabsContent>
                                ))}
                            </CardContent>
                        </Card>
                    </Tabs>
                </div>
            </div>
        </>
    )
}
