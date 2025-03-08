import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import fs from 'fs'
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/context/ToastContext";
import Loader from "@/components/Loader";
import { DataTable } from "@/components/DataTable"; import CircularProgress from "@/components/CircularProgress";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MdDelete } from "react-icons/md";
import { EmployeeTableColumns } from "@/types/tables.data";
import { Employee, employeeSchema } from "@/types/employee.type";
import { Checkbox } from "@/components/ui/checkbox";
import { createEmployee, deleteEmployee, getEmployees, updateEmployee } from "@/Services/employee.service";
import { joiResolver } from "@hookform/resolvers/joi";
import { useAuth } from "@/context/AuthContext";
import { Device } from "@/types/device.type";
import { getDevices } from "@/Services/device.service";
import { FaEdit } from "react-icons/fa";


export default function EmployeesManagement() {
    const {
        // register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm<Employee>({
        defaultValues: { name: '', email: '', verified: false, managerId: -1, deviceIds: [] } as Employee,
        resolver: joiResolver(employeeSchema)
    });
    // Inside your component:
    const selectedDeviceIds = useWatch({ control, name: "deviceIds", defaultValue: [] });
    const { user } = useAuth();
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [devices, setDevices] = useState<Device[]>([]);
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [flag, setflag] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
    const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);

    const toast = useToast();
    useEffect(() => {
        setLoading(true);
        getEmployees().then((resp) => {
            setEmployees(resp);
        }).catch((error) => {
            toast.showToast('Failed to load services', error?.response?.data?.error ?? 'something went wrong', 'error');
        }).finally(() => {
            setLoading(false);
        });
    }, [flag]);

    useEffect(() => {
        setLoading(true);
        getDevices().then((resp) => {
            setDevices(resp);
        }).catch((error) => {
            toast.showToast('Failed to load devices', error?.response?.data?.error ?? 'Something went wrong', 'error');
        }).finally(() => {
            setLoading(false);
        });
    }, [flag]);

    useEffect(() => {
        if (currentEmployee) {
            reset(currentEmployee)
        } else {
            reset();
        }
    }, [currentEmployee, setValue, reset]);

    useEffect(() => {
        console.log(errors);
    }, [errors]);

    const onSubmit: SubmitHandler<Employee> = (data) => {
        const service = currentEmployee?.id ? updateEmployee : createEmployee;
        setLoading(true);
        console.log(data);

        service({ ...currentEmployee, ...data, managerId: user?.managerId ?? -1 }).then(() => {
            setDialogOpen(false);
            reset();
            toast.showToast(`Service ${currentEmployee ? 'updated' : 'added'} successfully`, '', 'success');
            setCurrentEmployee(null);

        }).catch((error) => {
            toast.showToast('Operation failed', error.message, 'error');
        }).finally(async () => {
            setLoading(false);
            setflag(f => !f);
            reset({});
        });
    };

    const handleEdit = (employee: Employee) => {
        setCurrentEmployee(employee);
        setDialogOpen(true);
    };

    const handleDelete = (employee: Employee) => {
        setEmployeeToDelete(employee);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (employeeToDelete?.id) {
            setLoading(true);
            deleteEmployee(employeeToDelete).then(() => {
                toast.showToast('Employee deleted successfully', '', 'success');
                setDeleteDialogOpen(false);
                setflag(f => !f);  // Trigger refresh
            }).catch((error) => {
                toast.showToast('Failed to delete employee', error.message, 'error');
            }).finally(() => {
                setLoading(false);
            });
        }
    };


    const handleCloseDialog = () => {
        setDialogOpen(false);
        setCurrentEmployee(null);
        reset({});
        clearErrors();
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setEmployeeToDelete(null);
    };

    if (loading) {
        return <Loader />;
    }
    return (
        <div className="p-6 bg-neutral-200 min-h-screen">
            <Card>
                <CardHeader>
                    <Button
                        className=" w-fit bg-green-600"
                        onClick={() => {
                            reset();
                            // setValue('ServiceType', 'Taxi')
                            setDialogOpen(true);
                            setCurrentEmployee(null);
                            clearErrors();
                        }}>Add Employee</Button>

                    <Dialog open={dialogOpen} onOpenChange={handleCloseDialog}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className=" text-2xl">{currentEmployee !== null ? 'Edit Employee' : 'Add Employee'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                <div className="mb-3">
                                    <Label htmlFor="ServiceType">Employee Name</Label>
                                    <Controller
                                        name="name"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                id="Name"
                                                type="text"
                                                placeholder="Enter Employee Name"
                                                className="mt-1"
                                            />
                                        )}
                                    />
                                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                                </div>

                                <div className="mb-3">
                                    <Label htmlFor="Email">Email</Label>
                                    <Controller
                                        name="email"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                id="Email"
                                                type="email"
                                                placeholder="Enter Employee Email"
                                                className="mt-1"
                                            />
                                        )}
                                    />
                                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                                </div>

                                <div className="mb-3">
                                    <Label>Devices</Label>
                                    <div className="border p-4 rounded-md max-h-60 overflow-auto">
                                        {(devices ?? []).map((device) => (
                                            <div key={device.id} className="flex items-center space-x-2 mb-2">
                                                <Checkbox
                                                    id={`device-${device.id}`}
                                                    checked={selectedDeviceIds.includes(device.id)}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            setValue("deviceIds", [...selectedDeviceIds, device.id]);
                                                        } else {
                                                            setValue(
                                                                "deviceIds",
                                                                selectedDeviceIds.filter((id: number) => id !== device.id)
                                                            );
                                                        }
                                                    }}
                                                />
                                                <Label htmlFor={`device-${device.id}`} className="cursor-pointer">
                                                    {device.name} [{device.location}]
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.deviceIds && (
                                        <p className="text-red-500 text-xs">{errors.deviceIds.message}</p>
                                    )}
                                </div>

                                <div className="mb-3 flex items-center space-x-2">
                                    <Controller
                                        name="verified"
                                        control={control}
                                        render={({ field }) => (
                                            <Checkbox
                                                id="Verified"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        )}
                                    />
                                    <Label htmlFor="Verified">Is Verified</Label>
                                </div>
                                {errors.verified && <p className="text-red-500">{errors.verified.message}</p>}

                                <Button type="submit" className="bg-green-800 hover:bg-green-700 w-full">
                                    {loading ? <CircularProgress size={25} color="white" /> : <>
                                        {currentEmployee !== null ? 'Update' : 'Add'} Employee
                                    </>}
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                    <Dialog open={deleteDialogOpen} onOpenChange={handleCloseDeleteDialog}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Employee</DialogTitle>
                            </DialogHeader>
                            <p>Are you sure you want to delete this employee? This action cannot be undone.</p>
                            <div className="flex justify-end space-x-4 mt-4">
                                <Button onClick={() => setDeleteDialogOpen(false)} className="bg-gray-500">Cancel</Button>
                                <Button onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">Delete</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={[...EmployeeTableColumns,
                        {
                            id: "action",
                            header: "Action",
                            cell: ({ row }) => (
                                <>
                                    <Button variant={'outline'} onClick={() => handleEdit(row.original)} className="me-2 p-2">
                                        <FaEdit className=" text-2xl text-blue-500" />
                                    </Button>
                                    <Button variant={'outline'} onClick={() => handleDelete(row.original)} className="me-2 p-2">
                                        <MdDelete className=" text-2xl text-red-500" />
                                    </Button>
                                </>
                            ),
                        },

                        ]}
                        data={employees ?? []} />
                </CardContent>
            </Card>



        </div>
    );
}
