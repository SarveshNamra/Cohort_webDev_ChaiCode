import type { Request, Response } from "express";

class HealthController {
    public handleHealthCheck(req: Request, res: Response){
        return res.json({
            status: 'health',
        });
    }
}

export default HealthController;