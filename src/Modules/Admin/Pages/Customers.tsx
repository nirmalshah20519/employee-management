import { DataTable } from "@/components/DataTable";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCustomers } from "@/Services/users.service";
import { customerTableColumns } from "@/types/tables.data";
import { Customer } from "@/types/users.type";
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form";

export default function Customers() {
    const [flag, setFlag] = useState(true);
    const [uniLoader, setUniLoader] = useState(true);
    const [totalRecords, settotalRecords] = useState(0);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const { control, setValue, getValues, watch } = useForm<{ page: number, limit: number }>({
        defaultValues: {
            page: 1,
            limit: 25
        }
    })

    useEffect(() => {
        setUniLoader(true)
        const { page, limit } = getValues();
        getCustomers(page, limit).then(resp => {
            setCustomers(resp.data);
            settotalRecords(resp?.pagination?.count ?? 0);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            // console.log('finally');
            setUniLoader(false)
        })
    }, [flag])

    return (
        <>
            {uniLoader && <Loader />}
            <div className="p-6 bg-neutral-200 min-h-screen text-white ">
                {/* Table Section */}
                <Card>
                    <CardContent>
                        <div className=" flex justify-between border-b-2 mb-4 py-3">

                            <p className=" text-2xl font-semibold mb-3">All Customers Data</p>
                            {/* <Button
                            className="bg-neutral-800 text-white hover:bg-neutral-900"
                        // onClick={handleExcelDownload}
                        // disabled={totalRecords <= 0}
                        >
                            {downloadLoading ? <CircularProgress size={24} thickness={3} /> : 'Download Excel'}
                        </Button> */}
                        </div>
                        <form onSubmit={() => { }} className="flex flex-wrap gap-2 items-stretch">


                            <DataTable data={customers} columns={customerTableColumns} isPaginationRequired={false} />


                            {totalRecords > 0 && <div className="flex justify-between py-4 w-full">
                                <div className="flex flex-col items-center space-x-2">
                                    <span className="text-sm w-full">Rows per page:</span>
                                    <Controller
                                        name="limit"
                                        control={control}
                                        defaultValue={5}
                                        render={({ field }) => (
                                            <Select onValueChange={(value) => {
                                                field.onChange(value);
                                                // handleSubmit(onSubmit)(); // Trigger form submission after value change
                                                setFlag(f => !f)
                                            }}
                                                defaultValue={field.value?.toString()}>
                                                <SelectTrigger aria-label="Rows per page">
                                                    <SelectValue placeholder="Select page size" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {[25, 50, 100].map((key) => (
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
                                        name="page"
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
                                                        value={Math.ceil((totalRecords / watch('limit'))).toString()}
                                                        className="input w-14 text-center"  // Add your class for styling if needed
                                                    />
                                                </div>
                                                <p>
                                                    Total Records : <strong>{totalRecords}</strong>
                                                </p>
                                            </div>
                                        )}
                                    />
                                </div>

                                <div className="flex items-center justify-between py-4">
                                    <div className="flex items-center space-x-2">
                                        <Controller
                                            name="page"
                                            control={control}
                                            defaultValue={1}
                                            render={({ field }) => (
                                                <div className=" flex gap-2 items-center">
                                                    <Button
                                                        // type="submit"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => {
                                                            setValue('page', watch('page') - 1);
                                                            // onSubmit(getValues());
                                                            setFlag(f => !f)
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
                                                            setValue('page', watch('page') + 1);
                                                            // onSubmit(getValues());
                                                            setFlag(f => !f)
                                                        }

                                                        }
                                                        disabled={field.value >= totalRecords / watch('limit')}
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
        </>
    )
}
