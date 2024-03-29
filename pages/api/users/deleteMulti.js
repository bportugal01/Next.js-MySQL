import { prisma } from "@/config/db";

export default async function handler(req, res) {
    switch (req.method) {
        case "DELETE":
            return await deleteMultiUser(req, res);
    }
}

const deleteMultiUser = async (req, res) => {

    try {
        const { ids } = req.body;
        await prisma.user.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }

        })
        return res.status(200).json({ success: "Delete multi", ids: ids });

    } catch (error) {
        return res.status(500).json(error.message);
    }
}