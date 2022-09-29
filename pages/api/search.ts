import { searchLocation } from "lib/weather";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const query = req.query.query;
    if (typeof query != "string") return res.status(406).json({});

    const locations = await searchLocation(query);
    res.json(locations);
};
