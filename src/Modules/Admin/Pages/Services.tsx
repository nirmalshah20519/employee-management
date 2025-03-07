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
import { serviceTableColumns } from "@/types/tables.data";
import { File } from "buffer";


export default function ServiceManagement() {
    const {
        // register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
        setValue,
        watch,
        clearErrors,
    } = useForm<Service>({
        defaultValues: {} as Service,
        resolver: joiResolver(serviceSchema)
    });

    const [services, setServices] = useState<Service[]>([]);
    // console.log(services);
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [flag, setflag] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [currentService, setCurrentService] = useState<Service | null>(null);
    const [currImg, setCurrImg] = useState<string | null>(null);
    const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);

    const toast = useToast();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            // console.log(file);
            setValue('Image', file)
        } else {
            setValue("Image", null); // Ensure the state is updated when there is no file
        }
    };

    useEffect(() => {
        setLoading(true);
        getServices().then((resp) => {
            setServices(resp.data);
            // console.log(resp);
        }).catch((error) => {
            toast.showToast('Failed to load services', error?.response?.data?.error ?? 'something went wrong', 'error');
        }).finally(() => {
            setLoading(false);
        });
    }, [flag]);

    useEffect(() => {
        if (currentService) {
            // console.log('ccc', currentService);
            // const {PerKgPrice} = currentService;
            reset(currentService)
        } else {
            reset();
        }
    }, [currentService, setValue, reset]);

    useEffect(() => {
        console.log(errors);
    }, [errors]);

    const onSubmit: SubmitHandler<Service> = (data) => {
        // console.log('hello');
        // console.log(data);
        const service = currentService?.Id ? updateService : createService;
        setLoading(true);
        console.log(data);

        service({ ...currentService, ...data }).then(() => {
            setDialogOpen(false);
            reset();
            toast.showToast(`Service ${currentService ? 'updated' : 'added'} successfully`, '', 'success');
            setCurrentService(null);

        }).catch((error) => {
            toast.showToast('Operation failed', error.message, 'error');
        }).finally(async () => {
            setLoading(false);
            setflag(f => !f);
            reset({});
        });
    };

    const handleEdit = (shift: Service) => {
        setCurrentService(shift);
        setDialogOpen(true);
    };

    const handleDelete = (shift: Service) => {
        setServiceToDelete(shift);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (serviceToDelete?.Id) {
            setLoading(true);
            deleteService(serviceToDelete).then(() => {
                toast.showToast('Service deleted successfully', '', 'success');
                setServices(services.filter(s => s.Id !== serviceToDelete.Id));
                setDeleteDialogOpen(false);
            }).catch((error) => {
                toast.showToast('Failed to delete shift', error.message, 'error');
            }).finally(async () => {
                setLoading(false);
                setflag(f => !f);
            });
        }
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setCurrentService(null);
        reset({});
        clearErrors();
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setServiceToDelete(null);
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
                            setValue('ServiceType', 'Taxi')
                            setDialogOpen(true);
                            setCurrentService(null);
                            clearErrors();
                        }}>Add Service</Button>

                    <Dialog open={dialogOpen} onOpenChange={handleCloseDialog}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className=" text-2xl">{currentService !== null ? 'Edit Service' : 'Add Service'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                <div className=" mb-3">
                                    <Label htmlFor="ServiceType">Service Type</Label>
                                    <Controller
                                        name="ServiceType"
                                        control={control}
                                        defaultValue={currentService?.ServiceType ?? 'Taxi'}

                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                disabled={currentService !== null}
                                            >
                                                <SelectTrigger aria-label="Rows per page">
                                                    <SelectValue placeholder="Select page size" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {['Taxi', 'Parcel'].map((key) => (
                                                            <SelectItem key={key} value={key.toString()}>
                                                                {key}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    {errors.ServiceType && <p className="text-red-500">{errors.ServiceType.message}</p>}
                                </div>

                                <div className=" mb-3">
                                    <Label htmlFor="SubType">Service Sub Type</Label>
                                    <Controller
                                        name="SubType"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                id="SubType"
                                                type="text"
                                                placeholder="Enter Sub Type"
                                                className={`input input-bordered`}
                                                {...field}
                                                value={field.value ?? ''}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    {errors.SubType && <p className="text-red-500">{errors.SubType.message}</p>}
                                </div>

                                <div className=" mb-3">
                                    <Label htmlFor="PerKmPrice">Per KM Price ($)</Label>
                                    <Controller
                                        name="PerKmPrice"
                                        control={control}

                                        render={({ field }) => (
                                            <div className=" relative">
                                                <Input
                                                    id="PerKmPrice"
                                                    type="text"
                                                    placeholder="Per KM Price"
                                                    className={`input input-bordered`}
                                                    {...field}
                                                    value={field.value ?? ''}
                                                    onChange={field.onChange}
                                                />
                                                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">$</span>
                                            </div>
                                        )}
                                    />
                                    {errors.PerKmPrice && <p className="text-red-500">{errors.PerKmPrice.message}</p>}
                                </div>

                                {watch('ServiceType') === 'Parcel' && <div className="mb-3">
                                    <Label htmlFor="PerKgPrice">Per KG Price ($)</Label>
                                    <Controller
                                        name="PerKgPrice"
                                        control={control}
                                        render={({ field }) => (
                                            <div className="relative">
                                                <Input
                                                    id="PerKgPrice"
                                                    type="text"
                                                    placeholder="Per KG Price"
                                                    className="input input-bordered"
                                                    {...field}
                                                    value={field.value ?? ''}
                                                    onChange={field.onChange}
                                                />
                                                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">$</span>
                                            </div>
                                        )}
                                    />
                                    {errors.PerKgPrice && <p className="text-red-500">{errors.PerKgPrice.message}</p>}
                                </div>}

                                {watch('ServiceType') === 'Taxi' && <div className="mb-3">
                                    <Label htmlFor="PerMinPrice">Per Minute Price ($)</Label>
                                    <Controller
                                        name="PerMinPrice"
                                        control={control}
                                        render={({ field }) => (
                                            <div className="relative">
                                                <Input
                                                    id="PerMinPrice"
                                                    type="text"
                                                    placeholder="Per Minute Price"
                                                    className="input input-bordered"
                                                    {...field}
                                                    value={field.value ?? ''}
                                                    onChange={field.onChange}
                                                />
                                                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">$</span>
                                            </div>
                                        )}
                                    />
                                    {errors.PerMinPrice && <p className="text-red-500">{errors.PerMinPrice.message}</p>}
                                </div>}

                                <div className="mb-3">
                                    <Label htmlFor="Description">Description</Label>
                                    <Controller
                                        name="Description"
                                        control={control}
                                        render={({ field }) => (
                                            <Textarea
                                                id="Description"
                                                placeholder="Enter Description"
                                                className="textarea textarea-bordered h-24" // Adjust height as needed
                                                {...field}
                                                value={field.value ?? ''}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    {errors.Description && <p className="text-red-500">{errors.Description.message}</p>}
                                </div>

                                <div className="mb-3">
                                    <Label htmlFor="Image">Image</Label>
                                    <Controller
                                        name="Image"
                                        control={control}
                                        render={({ field, fieldState }) => {
                                            const { value, ...fieldProps } = field;
                                            return (
                                                <Input
                                                    id="Image"
                                                    type="file"
                                                    accept="Image/*" // Accepts all Image types
                                                    className={`input input-bordered ${fieldState.error ? 'input-error' : ''}`}
                                                    {...fieldProps}
                                                    onChange={handleFileChange} // Use the custom file change handler
                                                    onBlur={field.onBlur} // Maintain form control management
                                                />

                                            )
                                        }}
                                    />
                                    {errors.Image && <p className="text-red-500">{String(errors.Image.message)}</p>}
                                </div>


                                <Button type="submit" className="bg-neutral-800 hover:bg-neutral-700 w-full">
                                    {loading ? <CircularProgress size={25} color="white" /> : <>
                                        {currentService !== null ? 'Update' : 'Add'} Service
                                    </>}
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                    <Dialog open={deleteDialogOpen} onOpenChange={handleCloseDeleteDialog}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Service</DialogTitle>
                            </DialogHeader>
                            <p>Are you sure you want to delete this service? This action cannot be undone.</p>
                            <div className="flex justify-end space-x-4 mt-4">
                                <Button onClick={() => setDeleteDialogOpen(false)} className="bg-gray-500">Cancel</Button>
                                <Button onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">Delete</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Dialog open={currImg !== null} onOpenChange={() => {
                        if (currImg) setCurrImg(null)
                    }}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className=" text-2xl">Service Image</DialogTitle>
                            </DialogHeader>
                            {currImg && <div className=" p-8">
                                <img src={currImg} alt={'service'} />
                            </div>}

                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={[...serviceTableColumns,
                        {
                            id: "image",
                            header: "Image",
                            cell: ({ row }) => <>{
                                row.original.Image ? <Button variant={'outline'} onClick={() => { setCurrImg(row.original.Image) }}>
                                    View Image
                                </Button> : <p>Image Unavailable</p>
                            }</>
                            ,
                        },
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
                        data={services} />
                </CardContent>
            </Card>



        </div>
    );
}
