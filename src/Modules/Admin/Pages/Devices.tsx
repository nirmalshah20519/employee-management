import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/context/ToastContext";
import Loader from "@/components/Loader";
import { DataTable } from "@/components/DataTable";
import CircularProgress from "@/components/CircularProgress";
import { Checkbox } from "@/components/ui/checkbox";
import { Device } from "@/types/device.type";
import { createDevice, deleteDevice, getDevices, updateDevice } from "@/Services/device.service";
import { useAuth } from "@/context/AuthContext";
import { DeviceTableColumns } from "@/types/tables.data";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function DevicesManagement() {
    const { user } = useAuth();
    const { handleSubmit, reset, control, formState: { errors }, setValue, clearErrors } = useForm<Device>({
        defaultValues: { managerId: user?.managerId, name: '', location: '', isActive: false } as Device,
    });

    const [devices, setDevices] = useState<Device[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentDevice, setCurrentDevice] = useState<Device | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [flag, setFlag] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const [deviceToDelete, setDeviceToDelete] = useState<Device | null>(null);
    const toast = useToast();

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
        if (currentDevice) {
            reset(currentDevice);
        } else {
            reset();
        }
    }, [currentDevice, setValue, reset]);

    const onSubmit = (data: Device) => {
        const action = currentDevice?.id ? updateDevice : createDevice;
        setLoading(true);

        action({ ...currentDevice, ...data }).then(() => {
            setDialogOpen(false);
            reset();
            toast.showToast(`Device ${currentDevice ? 'updated' : 'added'} successfully`, '', 'success');
            setCurrentDevice(null);
        }).catch((error) => {
            toast.showToast('Operation failed', error.message, 'error');
        }).finally(() => {
            setLoading(false);
            setFlag(f => !f)
        });
    };

    const handleEdit = (device: Device) => {
        setCurrentDevice(device);
        setDialogOpen(true);
    };

    const handleDelete = (device: Device) => {
        setDeviceToDelete(device);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        // console.log('gg', deviceToDelete);
        if (deviceToDelete?.id) {
            setLoading(true);
            deleteDevice(deviceToDelete).then(() => {
                toast.showToast('Device deleted successfully', '', 'success');
                setDevices(devices.filter(d => d.id !== deviceToDelete.id));
                setDeleteDialogOpen(false);
            }).catch((error) => {
                toast.showToast('Failed to delete device', error.message, 'error');
            }).finally(() => {
                setLoading(false);
            });
        }
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setCurrentDevice(null);
        reset();
        clearErrors();
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setDeviceToDelete(null);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="p-6 bg-neutral-200 min-h-screen">
            <Card>
                <CardHeader>
                    <Button className=" w-fit bg-green-600" onClick={() => {
                        reset(); // Reset the form to default values
                        setCurrentDevice(null); // Ensure no device is set as current
                        clearErrors(); // Clear any form errors
                        setDialogOpen(true); // Open the add/edit device dialog
                    }}>Add Device</Button>


                    <Dialog open={dialogOpen} onOpenChange={handleCloseDialog}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className=" text-2xl">{currentDevice !== null ? 'Edit Device' : 'Add Device'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
                                    <Label htmlFor="Name">Device Name</Label>
                                    <Controller name="name" control={control} render={({ field }) => (
                                        <Input {...field} type="text" placeholder="Enter Device Name" />
                                    )} />
                                    {errors.name && <p>{errors.name.message}</p>}

                                </div>
                                <div className="mb-3">
                                    <Label htmlFor="Location">Location</Label>
                                    <Controller name="location" control={control} render={({ field }) => (
                                        <Input {...field} type="text" placeholder="Enter Location" />
                                    )} />
                                    {errors.location && <p>{errors.location.message}</p>}
                                </div>
                                <div className="mb-3 flex gap-2">
                                    <Controller name="isActive" control={control} render={({ field }) => (
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                    )} />
                                    <Label htmlFor="IsActive">Is Active</Label>
                                    {errors.isActive && <p>{errors.isActive.message}</p>}

                                </div>

                                <Button type="submit">
                                    {loading ? <CircularProgress /> : 'Submit'}
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={deleteDialogOpen} onOpenChange={handleCloseDeleteDialog}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Device</DialogTitle>
                            </DialogHeader>
                            <p>Are you sure you want to delete this device? This action cannot be undone.</p>
                            <div className="flex justify-end space-x-4 mt-4">
                                <Button onClick={() => setDeleteDialogOpen(false)} className="bg-gray-500">Cancel</Button>
                                <Button onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">Delete</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    <DataTable columns={[...DeviceTableColumns,
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
                    ]} data={devices} />
                </CardContent>
            </Card>
        </div>
    );
}
