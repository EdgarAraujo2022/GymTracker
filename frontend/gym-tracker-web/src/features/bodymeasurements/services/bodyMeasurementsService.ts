import apiGymTracker from "@/shared/services/apiGymTracker";
import type { BodyMeasurement } from "../types/bodyMeasurement";

export async function getBodyMeasurements(): Promise<BodyMeasurement[]> {
    const response = await apiGymTracker.get<BodyMeasurement[]>("/me/bodymeasurements");
    return response.data;
}

export async function createBodyMeasurement(data: BodyMeasurement): Promise<BodyMeasurement> {
    const response = await apiGymTracker.post<BodyMeasurement>("/body-measurements", data);
    return response.data;
}
