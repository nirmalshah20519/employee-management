import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getVerifiedDrivers } from "@/Services/users.service";
import { driverTableColumns } from "@/types/tables.data";
import { Driver } from "@/types/users.type";
import { useEffect, useState } from "react";

export default function Verified({ setAnythingLoading }: { setAnythingLoading: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [flag, setFlag] = useState(true);
  const [Verifieddrivers, setVerifiedDrivers] = useState<Driver[]>([]);
  const [CurrentDriver, setCurrentDriver] = useState<Driver | null>(null);


  useEffect(() => {
    setAnythingLoading(true)
    console.log(setFlag || flag);
    getVerifiedDrivers().then(resp => {
      // console.log(resp);
      setVerifiedDrivers(resp.data);
      // settotalRecords(resp?.pagination?.count ?? 0);
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      // console.log('finally');
      setAnythingLoading(false)
    })
  }, [flag])
  return (
    <div>
      <Dialog open={CurrentDriver !== null} onOpenChange={() => {
        if (CurrentDriver)
          setCurrentDriver(null)
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Driver Details</DialogTitle>
          </DialogHeader>
          {/* {`${console.log(CurrentDriver)}`} */}
          {CurrentDriver && (
            <div className="space-y-4 p-4 flex flex-col">
              <div className=" w-1/2">
                <p className="text-sm text-gray-500">Name: <span className="text-gray-900 font-semibold">{CurrentDriver.FirstName} {CurrentDriver.LastName}</span></p>
                <p className="text-sm text-gray-500">Mobile: <span className="text-gray-900 font-semibold">{CurrentDriver.MobileNumber}</span></p>
                <p className="text-sm text-gray-500">Email: <span className="text-gray-900 font-semibold">{CurrentDriver.Email}</span></p>
                <p className="text-sm text-gray-500">Vehicle Type: <span className="text-gray-900 font-semibold">{CurrentDriver.DriverDetail.VehicleType.replace(/"/g, '')}</span></p>
              </div>
              <div className=" w-1/2">
                <p className="text-sm text-gray-500">Vehicle Image: </p>
                <img src={CurrentDriver.DriverDetail.VehicleImage} alt="Vehicle" className="w-full max-w-xs rounded-lg" />
              </div>
              <div className=" w-1/2">
                <p className="text-sm text-gray-500">Driver Licence Image: </p>
                <img src={CurrentDriver.DriverDetail.DrivingLicenseImage} alt="Vehicle" className="w-full max-w-xs rounded-lg" />
              </div>


            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setCurrentDriver(null)}>
              Cancel
            </Button>
            {/* <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <DataTable data={Verifieddrivers}
        columns={[
          ...driverTableColumns,
          {
            header: "Details",
            cell: (row) => <Button onClick={() => setCurrentDriver(row.row.original)}>View Details</Button>
          }

        ]} isPaginationRequired={true} />
    </div>
  )
}
