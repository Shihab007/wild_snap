import { RequestHeader } from "src/app/login/shared/model/keycloak-user-info/Header/request-header";
import { AdminDashboard } from "../../model/dashboard/admin-dashboard";

export class AdminDashboardResponse {
    header: RequestHeader;
    body: AdminDashboard;
}
