import type GeoType from './Geo.ts'

export default interface AddressType {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: GeoType
}