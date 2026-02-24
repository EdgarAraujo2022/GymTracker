import { useEffect, useState } from "react";
import * as service from "../services/bodyMeasurementsService";
import type { BodyMeasurement } from "../types/bodyMeasurement";

export function useBodyMeasurements() {
    const [data, setData] = useState<BodyMeasurement[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const measurements = await service.getBodyMeasurements();
                setData(measurements);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return { data, loading, error };
}
