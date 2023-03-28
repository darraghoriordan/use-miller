import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // Get data submitted in request's body.
    const body = req.body as unknown as { ghUsername: string };

    // Optional logging to see the responses
    // in the command line where next.js app is running.
    console.log("body: ", body);

    // Guard clause checks for first and last name,
    // and returns early if they are not found
    if (!body.ghUsername) {
        return res.status(400).json({ data: "First or last name not found" });
    }

    // Found the name.
    // Sends a HTTP success code
    res.status(200).json({ data: `${body.ghUsername}` });
}
