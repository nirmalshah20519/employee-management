import { DataTable } from "@/components/DataTable";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { getDeviceUsage } from "@/Services/device.service";
import { DeviceUsageTableColumns } from "@/types/tables.data";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export interface PaginationFilter {
    pageNo: number;
    pageSize: number;
}
export default function EmployeeDashboard() {
    const { control, watch, handleSubmit, getValues, setValue } = useForm<PaginationFilter>({
        defaultValues: {
            pageNo: 1,
            pageSize: 5,
        }
    });
    const [deviceUsage, setDeviceUsage] = useState([]);
    const [totalRecords, settotalRecords] = useState(0);
    const [flag, setFlag] = useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useToast()

    const { user } = useAuth();

    useEffect(() => {
        const pagination = getValues();
        setLoading(true);
        getDeviceUsage(pagination, user?.managerId ?? -1).then((resp) => {
            console.log(resp);
            setDeviceUsage(resp.res);
            settotalRecords(resp.totalCount);
        }).catch((error) => {
            toast.showToast('Failed to load services', error?.response?.data?.error ?? 'something went wrong', 'error');
        }).finally(() => {
            setLoading(false);
            setFlag(f => !f)
        });

    }, [flag])

    const onSubmit = (data: PaginationFilter) => {
        setLoading(true)
        // console.log(getValues());
        getDeviceUsage(data, user?.managerId ?? -1).then(resp => {
            setDeviceUsage(resp.res);
            settotalRecords(resp.totalCount);
        }).catch(err => {
            //   if (err?.response?.status === 401) {
            //     unauthorize();
            //     navigate('/')
            //   }
            console.log(err);
        }).finally(() => {
            setLoading(false);
            setFlag(f => !f)
        })
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="p-6 bg-neutral-200 min-h-screen">
            <Card>
                <CardHeader>
                    <h2 className="text-2xl font-bold mb-3">My Usage</h2>
                    <p>Hello {user?.email.split('@')[0]}</p>
                    <hr />
                </CardHeader>
                <CardContent>
                    <DataTable columns={DeviceUsageTableColumns} data={deviceUsage} isPaginationRequired={false} />
                    <form >
                        {totalRecords > 0 && <div className="flex justify-between py-4 w-full">
                            {/* Rows Per Page Selector */}
                            <div className="flex flex-col items-center space-x-2">
                                <span className="text-sm w-full">Rows per page:</span>
                                <Controller
                                    name="pageSize"
                                    control={control}
                                    defaultValue={5}
                                    render={({ field }) => (
                                        <Select onValueChange={(value) => {
                                            field.onChange(value);
                                            handleSubmit(onSubmit)(); // Trigger form submission after value change
                                        }}
                                            defaultValue={field.value?.toString()}>
                                            <SelectTrigger aria-label="Rows per page">
                                                <SelectValue placeholder="Select page size" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {[5, 10, 15].map((key) => (
                                                        <SelectItem key={key} value={key.toString()}>
                                                            {key}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />

                            </div>

                            <div className="text-sm text-center">
                                <Controller
                                    name="pageNo"
                                    control={control}
                                    defaultValue={1}
                                    render={({ field }) => (
                                        <div className=" flex flex-col gap-2">

                                            <div className=" flex gap-2 items-center">
                                                <p>Page</p>
                                                <Input
                                                    {...field}
                                                    type="text"
                                                    readOnly
                                                    value={field.value}
                                                    className="input w-10"  // Add your class for styling if needed
                                                />
                                                <p>of</p>
                                                <Input
                                                    {...field}
                                                    type="text"
                                                    readOnly
                                                    // value={Math.ceil((totalRecords / watch('pageSize'))).toString()}
                                                    value={Math.ceil((totalRecords / watch('pageSize')))}

                                                    className={
                                                        `text-center w-14 }`
                                                    }
                                                />
                                            </div>
                                            <p>
                                                Total Records : <strong>{totalRecords}</strong>
                                            </p>
                                        </div>
                                    )}
                                />
                                {/* <p>Total Records: <strong>{1500}</strong> </p> */}
                            </div>
                            {/* Pagination Controls */}

                            <div className="flex items-center justify-between py-4">
                                <div className="flex items-center space-x-2">
                                    <Controller
                                        name="pageNo"
                                        control={control}
                                        defaultValue={1}
                                        render={({ field }) => (
                                            <div className=" flex gap-2 items-center">
                                                <Button
                                                    // type="submit"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                        setValue('pageNo', watch('pageNo') - 1);
                                                        onSubmit(getValues());
                                                    }}
                                                    disabled={field.value <= 1}
                                                >
                                                    {'< Previous'}
                                                </Button>
                                                <Button
                                                    // type="submit"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                        setValue('pageNo', watch('pageNo') + 1);
                                                        onSubmit(getValues());
                                                    }

                                                    }
                                                    disabled={field.value >= totalRecords / watch('pageSize')}
                                                >
                                                    {'Next >'}
                                                </Button>
                                            </div>
                                        )}
                                    />

                                </div>
                            </div>
                        </div>
                        }
                    </form>

                </CardContent>
            </Card>
        </div>
    )
}
