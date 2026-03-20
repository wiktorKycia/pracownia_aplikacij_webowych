import type AddressType from "./Address.ts";
import type CompanyType from "./Company.ts";

export default interface UserType {
    id: number,
    name: string,
    username: string,
    email: string,
    address: AddressType,
    phone: string,
    website: string,
    company: CompanyType
}