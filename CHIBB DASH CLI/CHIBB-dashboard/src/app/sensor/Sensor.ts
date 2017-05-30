export interface Sensor {
    sid: string
    hid: string
    location: string
    type: string
    attributes: string[]

    //
    status: string
    batteryLevel: string
}