import { RequestHeader } from "../../header/request-header";
import { ClassRoutine } from "../../model/class-routine/class-routine";

export class ClassRoutineRequest {
    header: RequestHeader;
    body: ClassRoutine;
}
