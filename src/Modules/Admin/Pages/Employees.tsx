import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
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
import { DataTable } from "@/components/DataTable";
// import { addService, getAllServices, updateService, deleteService } from "@/Services/shift.service";
import CircularProgress from "@/components/CircularProgress";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { joiResolver } from '@hookform/resolvers/joi';
import { FaEdit } from "react-icons/fa";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MdDelete } from "react-icons/md";
import { Service, serviceSchema } from "@/types/services.type";
import { createService, deleteService, getServices, updateService } from "@/Services/services.service";
import { Textarea } from "@/components/ui/textarea";
import { EmployeeTableColumns, serviceTableColumns } from "@/types/tables.data";
import { Employee } from "@/types/employee.type";
import { Checkbox } from "@/components/ui/checkbox";
import { createEmployee, getEmployees } from "@/Services/employee.service";
// import { File } from "buffer";


export default function EmployeesManagement() {
    const {
        // register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
        setValue,
        watch,
        clearErrors,
    } = useForm<Employee>({
        defaultValues: {} as Employee,
        // resolver: joiResolver(serviceSchema)
    });

    const [employees, setEmployees] = useState<Employee[]>([]);
    // console.log(services);
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [flag, setflag] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
    const [currImg, setCurrImg] = useState<string | null>(null);
    const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);

    const toast = useToast();

    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files ? e.target.files[0] : null;
    //     if (file) {
    //         // console.log(file);
    //         setValue('Image', file)
    //     } else {
    //         setValue("Image", null); // Ensure the state is updated when there is no file
    //     }
    // };

    useEffect(() => {
        setLoading(true);
        getEmployees().then((resp) => {
            setEmployees(resp);
            // console.log(resp);
        }).catch((error) => {
            toast.showToast('Failed to load services', error?.response?.data?.error ?? 'something went wrong', 'error');
        }).finally(() => {
            setLoading(false);
        });
    }, [flag]);

    useEffect(() => {
        if (currentEmployee) {
            // console.log('ccc', currentEmployee);
            // const {PerKgPrice} = currentEmployee;
            reset(currentEmployee)
        } else {
            reset();
        }
    }, [currentEmployee, setValue, reset]);

    useEffect(() => {
        console.log(errors);
    }, [errors]);

    const onSubmit: SubmitHandler<Employee> = (data) => {
        // console.log('hello');
        // console.log(data);
        const service = currentEmployee?.Id ? createEmployee : createEmployee;
        setLoading(true);
        console.log(data);

        service({ ...currentEmployee, ...data }).then(() => {
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
        if (employeeToDelete?.Id) {
            setLoading(true);
            // deleteService(employeeToDelete).then(() => {
            //     toast.showToast('Service deleted successfully', '', 'success');
            //     setServices(services.filter(s => s.Id !== employeeToDelete.Id));
            //     setDeleteDialogOpen(false);
            // }).catch((error) => {
            //     toast.showToast('Failed to delete shift', error.message, 'error');
            // }).finally(async () => {
            //     setLoading(false);
            //     setflag(f => !f);
            // });
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
                        className=" w-fit"
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
                                <DialogTitle className=" text-2xl">{currentEmployee !== null ? 'Edit Service' : 'Add Service'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                <div className="mb-3">
                                    <Label htmlFor="ServiceType">Employee Name</Label>
                                    <Controller
                                        name="Name"
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
                                    {errors.Name && <p className="text-red-500">{errors.Name.message}</p>}
                                </div>

                                <div className="mb-3">
                                    <Label htmlFor="Email">Email</Label>
                                    <Controller
                                        name="Email"
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
                                    {errors.Email && <p className="text-red-500">{errors.Email.message}</p>}
                                </div>

                                <div className="mb-3 flex items-center space-x-2">
                                    <Controller
                                        name="Verified"
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
                                {errors.Verified && <p className="text-red-500">{errors.Verified.message}</p>}

                                <Button type="submit" className="bg-neutral-800 hover:bg-neutral-700 w-full">
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
                                    {/* <Button variant={'outline'} onClick={() => handleEdit(row.original)} className="me-2 p-2">
                                        <FaEdit className=" text-2xl text-blue-500" />
                                    </Button> */}
                                    <Button variant={'outline'} onClick={() => handleDelete(row.original)} className="me-2 p-2">
                                        <MdDelete className=" text-2xl text-red-500" />
                                    </Button>
                                </>
                            ),
                        },

                        ]}
                        data={employees??[]} />
                </CardContent>
            </Card>



        </div>
    );
}
