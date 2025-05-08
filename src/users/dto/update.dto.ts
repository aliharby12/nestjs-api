import { PartialType } from "@nestjs/swagger";
import { createUserDTO } from "./create.dto";

export class updateUserDTO extends PartialType(createUserDTO) { }